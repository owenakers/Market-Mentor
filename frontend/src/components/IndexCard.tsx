// frontend/src/components/IndexCard.tsx

interface IndexCardProps {
  name: string;
  price: number;
  change: number;
  percent_change: number;
}

export function IndexCard({ name, price, change, percent_change }: IndexCardProps) {
  // Determine color based on positive or negative change
  const isPositive = change >= 0;
  const colorClass = isPositive ? 'text-green-600' : 'text-red-600';
  const sign = isPositive ? '+' : '';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderColor: isPositive ? '#16a34a' : '#dc2626' }}>
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-2">{price.toLocaleString()}</p>
      <div className={`mt-1 font-semibold text-md ${colorClass}`}>
        <span>{sign}{change.toLocaleString()}</span>
        <span className="ml-2">({sign}{percent_change.toFixed(2)}%)</span>
      </div>
    </div>
  );
}