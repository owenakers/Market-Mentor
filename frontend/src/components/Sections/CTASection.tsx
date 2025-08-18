import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- ANIMATION VARIANTS ---

// A container to orchestrate the animations with a stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// Animation for each text block to slide up and fade in
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Animation for the background blobs, same as the AboutPage hero
const blobVariants = {
    animate: {
        x: [0, 150, -100, 50, 0],
        y: [0, -100, 150, -50, 0],
        rotate: [0, 120, -90, 60, 0],
        scale: [1, 1.3, 0.7, 1.2, 1],
        transition: {
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
        }
    }
}

// --- COMPONENT DEFINITION ---
export default function CTASection() {
  return (
    // Section with a light background to match the site's theme
    <section className="relative w-full bg-white py-28 overflow-hidden">
      
      {/* Animated Background Blobs with darker colors */}
      <motion.div
        className="absolute top-0 -left-20 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-60"
        variants={blobVariants}
        animate="animate"
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-60"
        variants={blobVariants}
        animate="animate"
        transition={{...blobVariants.animate.transition, delay: -10}}
      />

      <motion.div 
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-gray-900"
        >
          Ready to Build Your Financial Future?
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className="mt-6 max-w-2xl mx-auto text-lg text-gray-600"
        >
          Get the clarity you need to invest with confidence. Sign up for free and unlock powerful, easy-to-use tools to track and analyze your portfolio today.
        </motion.p>
        
        <motion.div variants={itemVariants} className="mt-10">
          <Link to="/register">
            <button className="bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-indigo-700 transition duration-300 text-lg shadow-lg transform hover:scale-105">
              Get Started for Free
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
