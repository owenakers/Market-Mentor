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

// Animation for the decorative background shapes
const shapeVariants = {
    initial: {
        scale: 1,
        y: 0,
    },
    animate: {
        y: [0, -20, 0],
        transition: {
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
        }
    }
}

// --- COMPONENT DEFINITION ---
export default function CTASection() {
  return (
    // Section with a light background to match the site's theme
    <section className="relative w-full bg-white py-28 overflow-hidden">
      
      {/* Decorative background shapes with updated light colors and reduced blur */}
      <motion.div
        className="absolute top-20 -left-20 w-72 h-72 bg-indigo-100 rounded-full blur-2xl opacity-70"
        variants={shapeVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute bottom-10 -right-20 w-80 h-80 bg-purple-100 rounded-full blur-2xl opacity-70"
        variants={shapeVariants}
        initial="initial"
        animate="animate"
        transition={{ ...shapeVariants.animate.transition, delay: 2 }} // Delay the second shape's animation
      />

      <motion.div 
        className="relative z-10 max-w-4xl mx-auto px-4 sm-px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-gray-900" // Text color changed for light background
        >
          Ready to Build Your Financial Future?
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className="mt-6 max-w-2xl mx-auto text-lg text-gray-600" // Text color changed
        >
          Get the clarity you need to invest with confidence. Sign up for free and unlock powerful, easy-to-use tools to track and analyze your portfolio today.
        </motion.p>
        
        <motion.div variants={itemVariants} className="mt-10">
          <Link to="/register">
            <button className="bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-indigo-700 transition duration-300 text-lg shadow-lg transform hover:cursor-pointer hover:scale-105">
              Get Started for Free
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
