# Market Mentor 📈

A full-stack web application that provides key market data and allows users to build, manage, and analyze a personal stock watchlist. This project was built with a Python/Flask backend and a React/TypeScript frontend.

**Live Demo:** [Hosted on Vercel](#)

---

![Market Mentor Screenshot](https://i.imgur.com/33aH44p.jpg)

## Features

* **Live Market Snapshot:** View real-time data for major indices like the S&P 500, NASDAQ, and Dow Jones.
* **User Authentication:** Secure user registration and login system with hashed passwords using Bcrypt.
* **Personalized Watchlist:** Logged-in users can create and manage a personal stock watchlist (Add/Remove stocks).
* **Detailed Stock View:** Click on any stock to navigate to a dedicated detail page.
* **Data Visualization:** View a stock's 100-day price history on an interactive chart.
* **Fundamental Analysis:** See key metrics like P/E Ratio and EPS for a deeper understanding of company health.
* **Professional UI/UX:** A multi-page application built with modern design principles, including a landing page, user dashboard, and a responsive navbar.

## Tech Stack

#### **Backend**
* **Framework:** Python, Flask
* **Database:** PostgreSQL with SQLAlchemy
* **Data Sources:** yfinance, Finnhub
* **Authentication:** Flask-Bcrypt
* **Production Server:** Gunicorn

#### **Frontend**
* **Framework:** React with TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **Charting:** Chart.js

#### **Deployment**
* **Backend & DB:** Render
* **Frontend:** Vercel

## Local Setup

1.  **Clone the repository.**
2.  **Backend Setup:**
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    # Create a .env file and add your DATABASE_URL and FINNHUB_API_KEY
    flask run
    ```
3.  **Frontend Setup:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```