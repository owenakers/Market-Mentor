Market Mentor 📈
A full-stack web application that provides key market data and allows users to build, manage, and analyze a personal stock watchlist. This project was built with a Python/Flask backend and a React/TypeScript frontend.

Live Demo: Hosted on Vercel

Key Features
Live Market Snapshot: View real-time data for major indices like the S&P 500, NASDAQ, and Dow Jones.

Dynamic UI/UX: Smooth, professional page animations and transitions powered by Framer Motion.

User Authentication: Secure user registration and login system with hashed passwords using Bcrypt.

Personalized Watchlist: Logged-in users can create and manage a personal stock watchlist (Add/Remove stocks).

Detailed Stock View: Click on any stock to navigate to a dedicated detail page.

Data Visualization: View a stock's 100-day price history on an interactive chart.

Fundamental Analysis: See key metrics like P/E Ratio and EPS for a deeper understanding of company health.

Tech Stack
Backend
Framework: Python, Flask

Database: PostgreSQL with SQLAlchemy

Data Sources: yfinance, Finnhub

Authentication: Flask-Bcrypt

Production Server: Gunicorn

Frontend
Framework: React with TypeScript

Build Tool: Vite

Styling: Tailwind CSS

Animations: Framer Motion

Routing: React Router DOM

Charting: Chart.js

Deployment
Backend & DB: Render

Frontend: Vercel

Local Development Setup
Follow these instructions to get the project running on your local machine.

1. Clone the Repository
git clone <your-repo-url>
cd market-mentor

2. Backend Setup
The backend runs on port 5001 by default to avoid conflicts with other services.

cd backend
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

pip install -r requirements.txt

# Create a .env file in the `backend` directory and add your secret keys:
# DATABASE_URL=your_postgresql_connection_string
# FINNHUB_API_KEY=your_finnhub_api_key

# Create the database tables
flask create-db

# Run the server
flask run --port=5001

3. Frontend Setup
The frontend connects to the backend at http://localhost:5001.

cd frontend
npm install

# Create a .env file in the `frontend` directory and add the backend URL:
# VITE_API_BASE_URL=http://localhost:5001

# Run the development server
npm run dev

The application should now be running at http://localhost:5173.

Common Troubleshooting
Port Conflict (macOS): If the backend fails to start on port 5000, it's likely because Apple's AirPlay service is using it. This setup uses port 5001 to prevent this issue.

Frontend Data Not Loading: If the market snapshot isn't appearing, ensure both your frontend and backend servers are running. If you change the VITE_API_BASE_URL in your .env file, you must stop and restart the frontend server (npm run dev). If issues persist, clear the Vite cache by running rm -rf node_modules/.vite in the frontend directory and restarting.