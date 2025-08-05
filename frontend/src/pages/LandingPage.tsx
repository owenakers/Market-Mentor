import { useState, useEffect } from 'react';
import { IndexCard } from '../components/IndexCard';
import { Footer } from '../components/Footer'; 
import { Link } from 'react-router-dom';
import { LogoCarousel } from '../components/LogoCarousel';


type IndexData = {
  symbol: string;
  price: number;
  change: number;
  percent_change: number;
};

export function LandingPage() {
  const [marketData, setMarketData] = useState<IndexData[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/market-snapshot`)
      .then(response => response.json())
      .then(data => setMarketData(data))
      .catch(error => console.error("Error fetching market data:", error));
  }, []);

  return (
    <>
      {/* --- HERO SECTION --- */}
      {/* This section now calculates its height to fit perfectly below the 4rem (h-16) navbar */}
      <div className="relative flex items-center justify-center text-center text-white px-4" style={{ height: 'calc(100vh - 4rem)' }}>
        
        {/* Video Background */}
        <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
            <source src="/market-background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>

        {/* Text Content */}
        <div className="relative z-20">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Market Intelligence for High-Stakes Decisions
            </h1>
            <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
            We track and compare the world's companies. You stay ahead of changing markets and competitors.
            </p>
            <div className="mt-10">
            <Link to="/register">
                <button className="bg-indigo-500 text-white font-semibold px-8 py-4 rounded-lg hover:bg-indigo-600 transition text-lg shadow-lg">
                Get Started for Free
                </button>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-white hover:underline">
                Log In
                </Link>
            </p>
            </div>
        </div>
      </div>

      <LogoCarousel />

      {/* --- MAIN CONTENT CONTAINER --- */}
      {/* This container adds the correct margins and padding for the rest of the page content */}
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 space-y-24">
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:block">
            <img 
              src="/owen-akers.jpeg" 
              alt="Owen Akers" 
              className="rounded-lg shadow-2xl object-cover aspect-video w-full"
            />
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-bold text-gray-900">My Mission</h2>
            <p className="mt-4 text-lg text-gray-600">
              As someone who is new to investing, I know how intimidating the financial markets can be. I built Market Mentor to provide a simple and free
              outlet to study stocks. My goal is to provide clear, understandable data that empowers beginners to make informed decisions and learn with confidence.
            </p>
          </div>
        </div>

        {/* Market Snapshot Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Today's Market Snapshot</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketData.map(index => (
              <IndexCard 
                key={index.symbol}
                name={index.symbol}
                price={index.price}
                change={index.change}
                percent_change={index.percent_change}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}