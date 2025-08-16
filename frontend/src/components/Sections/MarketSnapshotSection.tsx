import { motion } from 'framer-motion';

// --- TYPE DEFINITIONS ---
interface MarketIndex {
  symbol: string;
  price: number;
  change: number;
  percent_change: string;
}

interface MarketSnapshotSectionProps {
  marketData: MarketIndex[];
}

interface IndexCardProps {
  name: string;
  price: number;
  change: number;
  percent_change: string;
}

// --- SUB-COMPONENT: IndexCard ---
const IndexCard = ({ name, price, change, percent_change }: IndexCardProps) => {
  const isPositive = change >= 0;

  const formattedPrice = price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedChange = change.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
      <h3 className="text-lg font-bold text-gray-900">{name}</h3>
      <p className="text-2xl font-semibold text-gray-800 mt-2">${formattedPrice}</p>
      <div className={`mt-2 text-md font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <span>{isPositive ? '+' : ''}{formattedChange}</span>
        <span className="ml-2">({isPositive ? '+' : ''}{percent_change})</span>
      </div>
    </div>
  );
};

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- MAIN COMPONENT ---
export default function MarketSnapshotSection({ marketData }: MarketSnapshotSectionProps) {
  const hasData = marketData && marketData.length > 0;

  return (
    <section className="w-full bg-slate-50">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20 px-6">
        
        {/* Section Heading */}
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Today's Market Snapshot
        </motion.h2>

        {/* Cards Grid */}
        {hasData ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {marketData.map(index => (
              <motion.div key={index.symbol} variants={itemVariants}>
                <IndexCard 
                  name={index.symbol}
                  price={index.price}
                  change={index.change}
                  percent_change={index.percent_change}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500">Market data is currently unavailable.</p>
        )}
      </div>
    </section>
  );
}
