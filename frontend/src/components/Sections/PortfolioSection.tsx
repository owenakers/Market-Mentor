// PortfolioSection.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const linkStyles =
  "transition-colors text-indigo-600 font-medium text-lg hover:underline hover:text-indigo-800";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function PortfolioSection() {
  return (
    <section className="w-full py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
          
          {/* Text Column */}
          <motion.div
            className="w-full md:w-1/2 text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.p 
              variants={itemVariants} 
              className="text-sm uppercase tracking-wide text-indigo-600 font-semibold mb-3"
            >
              Your Investing Companion
            </motion.p>
            
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            >
              Powerful Tools for a{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">
                Smarter Portfolio
              </span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants} 
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              Track stocks you are interested in, analyze market trends, and dive deep into company
              fundamentals. Market Mentor provides the institutional-grade data you
              need to build your investment strategy with confidence.
            </motion.p>
            
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <Link to="/register">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(99, 102, 241, 0.4)" }}
                  className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow-md transition"
                >
                  Start Analyzing
                </motion.button>
              </Link>
              <Link 
                to="/about" 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
                className={linkStyles}
              >
                Learn More →
              </Link>
            </motion.div>

            <motion.p 
              variants={itemVariants} 
              className="text-xs text-gray-400 mt-6"
            >
              All data is provided for informational purposes only.
            </motion.p>
          </motion.div>
          
          {/* Image Column */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            whileHover={{ rotate: 1.5, scale: 1.02 }}
          >
            <img
              src="/images/phone.png"
              alt="Market Mentor Dashboard on a Phone"
              className="w-[360px] md:w-[420px] h-auto rounded-2xl"
              onError={(e) => { 
                e.currentTarget.src = 'https://placehold.co/300x600/1e293b/ffffff?text=Error'; 
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
