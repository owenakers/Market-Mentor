import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PriceChart } from '../components/PriceChart';
import { FundamentalsCard } from '../components/FundamentalsCard';

type StockDetail = {
  name: string;
  industry: string;
  logo_url: string;
  country: string;
  market_cap: number | null;
  pe_ratio: number | null;
  eps: number | null;
  price_history: { date: string; close: number }[] | null;
};

export function StockDetailPage() {
    const { symbol } = useParams<{ symbol:string }>();
    const [stock, setStock] = useState<StockDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // This logic is correct: protect the route
        const userId = localStorage.getItem('loggedInUserId');
        if (!userId) {
            navigate('/login');
            return;
        }

        if (!symbol) return;
        setLoading(true);

        const API_URL = import.meta.env.VITE_API_BASE_URL;
        fetch(`${API_URL}/api/profile/${symbol}`)
            .then(res => res.ok ? res.json() : Promise.reject('Failed to load data'))
            .then(data => { setStock(data); })
            .catch(error => {
                console.error("Error fetching stock details:", error);
                setStock(null);
            })
            .finally(() => setLoading(false));
    }, [symbol, navigate]);

    if (loading) {
        return <div className="max-w-7xl mx-auto py-8 px-4 text-center">Loading details...</div>;
    }

    if (!stock) {
        return <div className="max-w-7xl mx-auto py-8 px-4 text-center text-red-500">Failed to load data.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
                <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    Back to Dashboard
                </Link>
            </div>
            
            <div className="flex items-center text-left gap-4 mb-8">
                {stock.logo_url && <img src={stock.logo_url} alt={`${stock.name} logo`} className="h-16 w-16 rounded-full shadow-md" />}
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">{stock.name} ({symbol?.toUpperCase()})</h1>
                    <h2 className="text-xl text-gray-500">{stock.industry}</h2>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                    {stock.price_history ? (
                        <PriceChart chartData={stock.price_history} symbol={symbol!} peRatio={stock.pe_ratio}/>
                    ) : ( <p>No price history available.</p> )}
                </div>
                
                <div className="space-y-8">
                  <FundamentalsCard peRatio={stock.pe_ratio} eps={stock.eps} />
                  
                  <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-700">Company Info</h3>
                      <div className="space-y-3">
                          <div className="flex justify-between">
                              <span className="font-medium text-gray-600">Country</span>
                              <span className="font-semibold text-gray-900">{stock.country || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="font-medium text-gray-600">Market Cap (M)</span>
                              <span className="font-semibold text-gray-900">${stock.market_cap?.toLocaleString() || 'N/A'}</span>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    );
}