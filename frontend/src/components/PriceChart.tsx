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

// This MUST be in any file that renders a chart.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the shape of the data this component expects
type PriceData = {
  date: string;
  close: number;
};

interface PriceChartProps {
  chartData: PriceData[];
  symbol: string;
}

export function PriceChart({ chartData, symbol }: PriceChartProps) {
  if (!chartData || chartData.length < 2) {
    return <p className="text-center text-gray-500">Not enough data to display a chart.</p>;
  }

  // --- Calculate Key Metrics ---
  const closingPrices = chartData.map(d => d.close);
  const high = Math.max(...closingPrices);
  const low = Math.min(...closingPrices);
  const latestPrice = closingPrices[closingPrices.length - 1];
  const firstPrice = closingPrices[0];
  const change = latestPrice - firstPrice;
  const percentChange = (change / firstPrice) * 100;
  const changeColor = change >= 0 ? 'text-green-600' : 'text-red-600';

  // --- Generate Analyst Interpretation ---
  let interpretation = '';
  if (percentChange > 10) {
    interpretation = "This stock has shown strong positive momentum over this period.";
  } else if (percentChange < -10) {
    interpretation = "This stock has been in a significant downtrend over this period.";
  } else {
    interpretation = "This stock has been trading in a relatively stable range.";
  }

  // --- Chart.js Configuration with Axis Labels ---
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `${symbol} - 100 Day Price History`,
        font: { size: 16 }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date', // X-axis label
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)', // Y-axis label
        },
        ticks: { 
          callback: (value: string | number) => `$${Number(value).toFixed(2)}` 
        }
      }
    }
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
      <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">100-Day High</p>
          <p className="text-lg font-semibold text-gray-900">${high.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">100-Day Low</p>
          <p className="text-lg font-semibold text-gray-900">${low.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Latest Close</p>
          <p className="text-xl font-bold text-indigo-600">${latestPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">100-Day Change</p>
          <p className={`text-xl font-bold ${changeColor}`}>{percentChange.toFixed(2)}%</p>
        </div>
      </div>
      
      {/* Analyst Interpretation & Next Steps */}
      <div className="mt-6 border-t pt-4">
        <h4 className="font-semibold text-gray-800">Analyst Interpretation</h4>
        <p className="text-sm text-gray-600 mt-1">{interpretation}</p>
        <h4 className="font-semibold text-gray-800 mt-4">What To Do Next?</h4>
        <p className="text-sm text-gray-600 mt-1">
          A beginner should look at the company's fundamentals (like P/E Ratio) to understand *why* the price moved this way and decide if it's a good long-term investment.
        </p>
      </div>
    </div>
  );
}