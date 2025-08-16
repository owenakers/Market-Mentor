import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define the animation variants for the container and its children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // This will make each child animate 0.2s after the previous one
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Start invisible and 20px lower
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }, // Animate to full opacity at original position
};

// frontend/src/components/PortfolioSection.tsx
export default function PortfolioSection() {
  return (
    <section className="w-full py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center">
        
        {/* Animated Text Container with Stagger Effect */}
        <motion.div 
          className="max-w-xl text-center md:text-left md:mr-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of the element is in view
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Powerful Tools for a Smarter Portfolio
          </motion.h2>
          <motion.p 
            variants={itemVariants} 
            className="text-lg text-gray-600 mb-8"
          >
            Track your assets, analyze market trends, and dive deep into company fundamentals. Market Mentor provides the institutional-grade data you need to build your investment strategy with confidence.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link to="/register">
              <button className="bg-indigo-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-600 transition text-lg shadow-lg hover:cursor-pointer">
                Start Analyzing
              </button>
            </Link>
          </motion.div>
          <motion.p 
            variants={itemVariants} 
            className="text-xs text-gray-400 mt-6"
          >
            All data is provided for informational purposes only.
          </motion.p>
        </motion.div>
        
        {/* Image with a simple scale & fade animation */}
        <motion.div 
          className="mt-12 md:mt-0 flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <img
            src="/images/phone.png"
            alt="Market Mentor Dashboard on a Phone"
            className="w-[400px] h-auto"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x600/1e293b/ffffff?text=Error'; }}
          />
        </motion.div>

      </div>
    </section>
  );
}