// frontend/src/components/WatchlistTable.tsx

type StockProfile = {
  symbol: string;
  name: string;
};

// Define the "props" or inputs that this component expects to receive
interface WatchlistTableProps {
  watchlist: StockProfile[];
  onRowClick: (symbol: string) => void;
  onRemoveStock: (symbol: string) => void;
  isLoading: boolean;
}

export function WatchlistTable({ watchlist, onRowClick, onRemoveStock, isLoading }: WatchlistTableProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <table className="min-w-full text-left table-fixed">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase w-1/4">Symbol</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase w-2/4">Company Name</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase w-1/4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr><td colSpan={3} className="text-center p-6 text-gray-500">Loading...</td></tr>
          ) : (
            watchlist.map((stock) => (
              <tr 
                key={stock.symbol} 
                className="border-b hover:bg-indigo-50 cursor-pointer"
                onClick={() => onRowClick(stock.symbol)}
              >
                <td className="px-6 py-4 font-bold text-indigo-600 truncate">{stock.symbol}</td>
                <td className="px-6 py-4 text-gray-700 truncate">{stock.name}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onRemoveStock(stock.symbol); }}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}