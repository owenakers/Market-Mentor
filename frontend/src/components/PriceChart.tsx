import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type PriceData = {
  date: string;
  close: number;
};

// This component now needs the P/E Ratio to do its analysis
interface PriceChartProps {
  chartData: PriceData[];
  symbol: string;
  peRatio: number | null;
}

export function PriceChart({ chartData, symbol, peRatio }: PriceChartProps) {
  if (!chartData || chartData.length < 2) {
    return <p className="text-center text-gray-500">Not enough data to display a chart.</p>;
  }

  // --- Calculate All Metrics ---
  const closingPrices = chartData.map(d => d.close);
  const high = Math.max(...closingPrices);
  const low = Math.min(...closingPrices);
  const latestPrice = closingPrices[closingPrices.length - 1];
  const firstPrice = closingPrices[0];
  const percentChange = (latestPrice - firstPrice) / firstPrice * 100;
  const changeColor = percentChange >= 0 ? 'text-green-600' : 'text-red-600';

  // --- Generate Profile Snapshot Analysis ---
  let profileTitle = '';
  let profileDescription = '';
  const isMomentumPositive = percentChange > 5;
  const isValueExpensive = peRatio !== null && peRatio > 25;

  if (isMomentumPositive && !isValueExpensive) {
    profileTitle = 'Growing Value';
    profileDescription = 'This stock shows positive price momentum with a reasonable valuation (P/E Ratio).';
  } else if (isMomentumPositive && isValueExpensive) {
    profileTitle = 'Expensive Momentum';
    profileDescription = 'This stock has strong price momentum but a high P/E ratio, suggesting investor expectations are very high.';
  } else if (!isMomentumPositive && !isValueExpensive) {
    profileTitle = 'Potential Bargain';
    profileDescription = 'This stock\'s price has been stable or down, but its low P/E ratio suggests it might be undervalued.';
  } else {
    profileTitle = 'Facing Challenges';
    profileDescription = 'This stock shows weak price momentum combined with a high valuation, which can be a risky combination.';
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: `${symbol} - 100 Day Price History`, font: { size: 16 } },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Price (USD)' } },
    },
  };

  const data = {
    labels: chartData.map(d => d.date),
    datasets: [{
      label: `${symbol} Closing Price`,
      data: chartData.map(d => d.close),
      borderColor: 'rgb(79, 70, 229)',
      tension: 0.1
    }]
  };

  return (
    <div>
      <Line options={chartOptions} data={data} />
      
      {/* Key Metrics Display */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Latest Close</p>
          <p className="text-xl font-bold text-indigo-600">${latestPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">100-Day Change</p>
          <p className={`text-xl font-bold ${changeColor}`}>{percentChange.toFixed(2)}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">100-Day High</p>
          <p className="text-lg font-semibold text-gray-900">${high.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">100-Day Low</p>
          <p className="text-lg font-semibold text-gray-900">${low.toFixed(2)}</p>
        </div>
      </div>
      
      {/* Profile Snapshot Section */}
      <div className="mt-6 border-t pt-4">
        <h4 className="font-semibold text-lg text-gray-800">Profile Snapshot: <span className="text-indigo-600">{profileTitle}</span></h4>
        <p className="text-sm text-gray-600 mt-1">{profileDescription}</p>
        
        <h4 className="font-semibold text-lg text-gray-800 mt-4">Educational Next Step</h4>
        <p className="text-sm text-gray-600 mt-1">
          This snapshot is a starting point. A good next step is to research **why** the stock fits this profile by looking at recent company news and earnings reports.
        </p>
      </div>
    </div>
  );
}