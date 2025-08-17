import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define animation variants for the container to stagger its children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Animate each child with a 0.2s delay
      delayChildren: 0.3,   // Start the whole animation after a 0.3s delay
    },
  },
};

// Define the animation for individual text elements (slide-up and fade-in)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HeroSection() {
  return (
    // --- HERO SECTION ---
    // This section calculates its height to fit perfectly below the 4rem (h-16) navbar
    <div className="relative flex items-center justify-center text-center text-white px-4" style={{ height: 'calc(100vh - 4rem)' }}>
      
      {/* Video Background */}
      <video  
        autoPlay  
        loop  
        muted  
        playsInline  
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/market-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>

      {/* Animated Text Content */}
      <motion.div 
        className="relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible" // Animate on load, not on scroll
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          Market Intelligence for High-Stakes Decisions
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto"
        >
          We track and compare the world's companies. You stay ahead of changing markets and competitors.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-10">
          <Link to="/register">
            <button className="bg-indigo-500 text-white font-semibold px-8 py-4 rounded-lg hover:bg-indigo-600 hover:cursor-pointer transition text-lg shadow-lg">
              Get Started for Free
            </button>
          </Link>
          <p className="mt-4 text-sm text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-white hover:underline">
              Log In
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
