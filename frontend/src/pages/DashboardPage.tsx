import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { IndexCard } from '../components/IndexCard';
import { WatchlistTable } from '../components/WatchlistTable';

// Define the data types
type StockProfile = {
  symbol: string;
  name: string;
};

type IndexData = {
  symbol: string;
  price: number;
  change: number;
  percent_change: number;
};

export function DashboardPage() {
    const [watchlist, setWatchlist] = useState<StockProfile[]>([]);
    const [marketData, setMarketData] = useState<IndexData[]>([]);
    const [symbolInput, setSymbolInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const USER_ID = localStorage.getItem('loggedInUserId');
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchData = () => {
        if (!USER_ID) {
            navigate('/login');
            return;
        }
        setLoading(true);
        const fetchWatchlist = fetch(`${API_URL}/api/watchlist/${USER_ID}`).then(res => res.json());
        const fetchMarketData = fetch(`${API_URL}/api/market-snapshot`).then(res => res.json());

        Promise.all([fetchWatchlist, fetchMarketData])
            .then(([watchlistData, marketSnapshotData]) => {
                setWatchlist(watchlistData);
                setMarketData(marketSnapshotData);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setError('Could not load dashboard data.');
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, [USER_ID, navigate]);

    const handleAddStock = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!symbolInput || !USER_ID) return;
        
        try {
            const response = await fetch(`${API_URL}/api/watchlist/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: USER_ID, symbol: symbolInput }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to add stock');
            
            setSymbolInput('');
            fetchData();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleRemoveStock = async (symbolToRemove: string) => {
        if (!USER_ID) return;
        try {
            const response = await fetch(`${API_URL}/api/watchlist/remove`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: USER_ID, symbol: symbolToRemove }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to remove stock');
            
            fetchData();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleRowClick = (symbol: string) => {
        navigate(`/stock/${symbol}`);
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Market Snapshot</h1>
                <Link to="/learn">
                    <button className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition">
                        Start Learning Path
                    </button>
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {marketData.map(index => <IndexCard key={index.symbol} name={index.symbol} price={index.price} change={index.change} percent_change={index.percent_change} />)}
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">My Watchlist</h2>
            <form onSubmit={handleAddStock} className="flex flex-col gap-2 mb-8 max-w-lg bg-white p-4 rounded-lg shadow">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={symbolInput}
                        onChange={(e) => setSymbolInput(e.target.value.toUpperCase())}
                        placeholder="Add Stock to Watchlist..."
                        className="flex-grow p-3 border border-gray-300 rounded-md"
                    />
                    <button type="submit" className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700">Add</button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
            <WatchlistTable 
                watchlist={watchlist}
                isLoading={loading}
                onRemoveStock={handleRemoveStock}
                onRowClick={handleRowClick}
            />
        </div>
    );
}