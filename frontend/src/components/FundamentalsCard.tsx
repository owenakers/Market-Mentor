// frontend/src/components/FundamentalsCard.tsx

interface FundamentalsProps {
  peRatio: number | null;
  eps: number | null;
}

export function FundamentalsCard({ peRatio, eps }: FundamentalsProps) {

  const showInfo = (term: string) => {
    if (term === 'pe') {
      alert("P/E Ratio (Price-to-Earnings):\n\nA high P/E suggests investors expect higher future earnings growth, or that the stock is overvalued. A low P/E might suggest it's undervalued or that the company is facing challenges.");
    } else if (term === 'eps') {
      alert("EPS (Earnings Per Share):\n\nThis is the company's profit divided by its number of shares. A higher EPS indicates more value because investors receive a larger portion of the company's profit.");
    }
  };

  const InfoButton = ({ term }: { term: string }) => (
    <button onClick={() => showInfo(term)} className="ml-2 text-xs bg-gray-200 text-gray-600 rounded-full h-4 w-4 flex items-center justify-center font-bold hover:bg-gray-300">?</button>
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Key Fundamentals</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-500">P/E Ratio (Trailing)</span>
            <InfoButton term="pe" />
          </div>
          <span className="font-semibold text-gray-900">{peRatio ? peRatio.toFixed(2) : 'N/A'}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-500">EPS (Trailing)</span>
            <InfoButton term="eps" />
          </div>
          <span className="font-semibold text-gray-900">{eps ? eps.toFixed(2) : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}