import os
import requests
import yfinance as yf
from typing import Optional
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text, func
from flask_cors import CORS
from flask_bcrypt import Bcrypt

# --- SETUP ---
load_dotenv()
app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# --- DATABASE CONFIGURATION ---
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


# --- DATABASE MODELS ---
watchlist_table = db.Table('watchlist',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('company_profile_id', db.Integer, db.ForeignKey('company_profile.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    watchlist_items = db.relationship('CompanyProfile', secondary=watchlist_table, backref=db.backref('watchers', lazy='dynamic'))

class CompanyProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(100))
    country = db.Column(db.String(100))
    finnhub_industry = db.Column(db.String(100))
    market_capitalization = db.Column(db.Float)
    logo_url = db.Column(db.String(255))
    last_updated = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())


# --- HELPER FUNCTIONS ---
def get_api_profile_data(symbol: str) -> Optional[dict]:
    """Fetches profile data from Finnhub API."""
    api_key = os.environ.get('FINNHUB_API_KEY')
    url = f"https://finnhub.io/api/v1/stock/profile2?symbol={symbol.upper()}&token={api_key}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching Finnhub profile data: {e}")
        return None

def get_price_history(symbol: str) -> Optional[list]:
    """Fetches price history from yfinance."""
    try:
        ticker = yf.Ticker(symbol.upper())
        history = ticker.history(period="100d")
        if history.empty: return None
        processed_data = []
        for index, row in history.iterrows():
            processed_data.append({ "date": index.strftime('%Y-%m-%d'), "close": row["Close"] })
        return processed_data
    except Exception as e:
        print(f"Error fetching price history for {symbol}: {e}")
        return None

# --- API ENDPOINTS ---
@app.route("/api/market-snapshot")
def market_snapshot():
    indices = {'^GSPC': 'S&P 500', '^IXIC': 'NASDAQ Composite', '^DJI': 'Dow Jones'}
    market_data = []
    for symbol, name in indices.items():
        try:
            hist = yf.Ticker(symbol).history(period="2d")
            if len(hist) >= 2:
                prev_close, current_price = hist['Close'].iloc[-2], hist['Close'].iloc[-1]
                change, percent_change = current_price - prev_close, (current_price - prev_close) / prev_close * 100
                market_data.append({
                    "symbol": name, "price": round(current_price, 2),
                    "change": round(change, 2), "percent_change": round(percent_change, 2)
                })
        except Exception as e:
            print(f"Could not fetch data for {symbol}: {e}")
    return jsonify(market_data)

# In backend/app.py

@app.route('/api/profile/<symbol>')
def get_profile_endpoint(symbol):
    profile_from_db = CompanyProfile.query.filter_by(symbol=symbol.upper()).first()
    if not profile_from_db:
        # This logic remains the same
        profile_from_db = fetch_and_save_profile_data(symbol)
        if not profile_from_db:
            return jsonify({"error": "Could not find or fetch profile for this symbol"}), 404
        db.session.add(profile_from_db)
        db.session.commit()

    data_to_return = {
        "name": profile_from_db.name, "industry": profile_from_db.finnhub_industry,
        "logo_url": profile_from_db.logo_url, "pe_ratio": None, "eps": None,
        "price_history": get_price_history(symbol),
        "analyst_rating": None # <-- Add default value for new field
    }
    
    try:
        ticker = yf.Ticker(symbol.upper())
        info = ticker.info
        if 'trailingPE' in info: data_to_return['pe_ratio'] = info['trailingPE']
        if 'trailingEps' in info: data_to_return['eps'] = info['trailingEps']
        
        # --- NEW: Get the latest analyst recommendation ---
        recommendations = ticker.recommendations
        if not recommendations.empty:
            # Get the most recent recommendation
            latest_rec = recommendations.iloc[-1]
            data_to_return['analyst_rating'] = latest_rec['strongBuy'] + latest_rec['buy']

    except Exception as e:
        print(f"Could not fetch yfinance info for {symbol}: {e}")
        
    return jsonify(data_to_return)

@app.route('/api/watchlist/add', methods=['POST'])
def add_to_watchlist():
    data = request.get_json()
    user = User.query.get_or_404(data.get('user_id'))
    symbol = data.get('symbol').upper()
    profile = CompanyProfile.query.filter_by(symbol=symbol).first()
    if not profile:
        api_data = get_api_profile_data(symbol)
        if not api_data: return jsonify({"error": f"Could not fetch profile for {symbol}"}), 404
        profile = CompanyProfile(
            symbol=symbol, name=api_data.get('name'), country=api_data.get('country'),
            finnhub_industry=api_data.get('finnhubIndustry'),
            market_capitalization=api_data.get('marketCapitalization'), logo_url=api_data.get('logo')
        )
        db.session.add(profile)
    if profile not in user.watchlist_items:
        user.watchlist_items.append(profile)
    db.session.commit()
    return jsonify({"message": f"{symbol} added to watchlist"})

@app.route('/api/watchlist/<int:user_id>')
def get_watchlist(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify([{"symbol": item.symbol, "name": item.name} for item in user.watchlist_items])

@app.route('/api/watchlist/remove', methods=['POST'])
def remove_from_watchlist():
    data = request.get_json()
    user = User.query.get_or_404(data.get('user_id'))
    profile = CompanyProfile.query.filter_by(symbol=data.get('symbol').upper()).first()
    if profile and profile in user.watchlist_items:
        user.watchlist_items.remove(profile)
        db.session.commit()
    return jsonify({"message": "Stock removed"})

# --- NEW: USER REGISTRATION ENDPOINT ---
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Check if user already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username is already taken"}), 409

    # Hash the password and create the new user
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, password_hash=hashed_password)
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": f"User '{username}' created successfully.", "user_id": new_user.id}), 201

# In backend/app.py

# --- NEW: USER LOGIN ENDPOINT ---
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = User.query.filter_by(username=username).first()

    # Check if user exists and if the password hash matches
    if user and bcrypt.check_password_hash(user.password_hash, password):
        # In a real app, you would return a session token (JWT) here.
        # For this project, returning the user_id is enough to prove it works.
        return jsonify({
            "message": "Login successful!",
            "user_id": user.id
        }), 200
    else:
        # Generic error for security
        return jsonify({"error": "Invalid username or password"}), 401

if __name__ == "__main__":
    app.run()