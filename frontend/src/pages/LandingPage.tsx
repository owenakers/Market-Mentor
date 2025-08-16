import { useState, useEffect } from 'react';

import HeroSection from '../components/Sections/HeroSection';
import { LogoCarousel } from '../components/LogoCarousel';
import PortfolioSection from '../components/Sections/PortfolioSection';
import MissionSection from '../components/Sections/MissionSection';
import MarketSnapshotSection from '../components/MarketSnapshotSection';
import { Footer } from '../components/Sections/Footer'; 

type IndexData = {
  symbol: string;
  price: number;
  change: number;
  percent_change: string; // Changed from number to string to match the prop type
};

export function LandingPage() {
  const [marketData, setMarketData] = useState<IndexData[]>([]);

  useEffect(() => {
    // This will now correctly read from your .env file
    console.log('The value of VITE_API_BASE_URL is:', import.meta.env.VITE_API_BASE_URL);

    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
    
    fetch(`${apiUrl}/api/market-snapshot`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMarketData(data))
      .catch(error => console.error("Error fetching market data:", error));
  }, []);

  return (
    <>
      <HeroSection />
      <LogoCarousel />
      <MarketSnapshotSection marketData={marketData} />
      <PortfolioSection />
      <MissionSection />
      <Footer />
    </>
  );
}