# 📈 Market Mentor
*A full-stack stock market dashboard with real-time data and personalized watchlists*

Market Mentor is a full-stack web application that provides key market insights and allows users to **build, manage, and analyze a personal stock watchlist**.  
It’s built with a **Python/Flask backend** and a **React/TypeScript frontend**.

🔗 **Live Demo:** [Hosted on Vercel](https://market-mentor-kappa.vercel.app/)

---

## 🚀 Key Features
- **Live Market Snapshot** → Real-time data for major indices (S&P 500, NASDAQ, Dow Jones)
- **Dynamic UI/UX** → Smooth, professional animations powered by **Framer Motion**
- **User Authentication** → Secure login & registration with **hashed passwords (Bcrypt)**
- **Personalized Watchlist** → Add/remove stocks and save them to your account
- **Detailed Stock View** → Dedicated stock pages with company info & metrics
- **Data Visualization** → 100-day price history with **interactive charts**
- **Fundamental Analysis** → Key ratios & metrics (P/E, EPS, etc.) for deeper insights

---

## 🛠 Tech Stack
**Backend**
- Framework: Python, Flask
- Database: PostgreSQL + SQLAlchemy
- Data Sources: [yfinance](https://pypi.org/project/yfinance/), [Finnhub](https://finnhub.io/)
- Authentication: Flask-Bcrypt
- Server: Gunicorn  

**Frontend**
- Framework: React + TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS
- Animations: Framer Motion
- Routing: React Router DOM
- Charts: Chart.js  

---

## 🌐 Deployment
- Backend & Database → Render
- Frontend → Vercel

---

## 🖥 Local Development Setup
Follow these steps to run Market Mentor locally:

```bash
# 1️⃣ Clone the Repository
git clone <your-repo-url>
cd market-mentor

# 2️⃣ Backend Setup (runs on port 5001 by default)
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create a .env file inside backend/ with:
# DATABASE_URL=your_postgresql_connection_string
# FINNHUB_API_KEY=your_finnhub_api_key

# Initialize database
flask create-db
flask run --port=5001

# 3️⃣ Frontend Setup (connects to backend at http://localhost:5001)
cd ../frontend
npm install

# Create a .env file inside frontend/ with:
# VITE_API=http://localhost:5001

# Run the frontend
npm run dev
