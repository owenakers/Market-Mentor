// frontend/src/pages/AboutPage.tsx
import { motion } from 'framer-motion';
import { Footer } from '../components/Sections/Footer';

// --- ANIMATION VARIANTS ---

// For sections that fade and slide in on scroll
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

// For individual items within a staggered section
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// For the value cards to scale and fade in
const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
}

// Animation for the background blobs with more obvious movement
const blobVariants = {
    animate: {
        x: [0, 150, -100, 50, 0],
        y: [0, -100, 150, -50, 0],
        rotate: [0, 120, -90, 60, 0],
        scale: [1, 1.3, 0.7, 1.2, 1],
        transition: {
            duration: 20, // Faster animation loop
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
        }
    }
}


export function AboutPage() {
  return (
    <div className="bg-white">
      {/* --- Hero Section: The "Why" --- */}
      <div className="relative bg-slate-900 overflow-hidden">
        {/* Animated Background Blobs with higher opacity */}
        <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-lighten filter blur-3xl opacity-40"
            variants={blobVariants}
            animate="animate"
        />
        <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-lighten filter blur-3xl opacity-40"
            variants={blobVariants}
            animate="animate"
            transition={{...blobVariants.animate.transition, delay: -10}} // Offset animation
        />
        <motion.div
            className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-400 rounded-full mix-blend-lighten filter blur-3xl opacity-40"
            variants={blobVariants}
            animate="animate"
            transition={{...blobVariants.animate.transition, delay: -5}} // Offset animation
        />
        
        <motion.div 
            // Reduced padding and centered text
            className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
        >
          <motion.h1 
            variants={itemVariants} 
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            From Confusion to Clarity
          </motion.h1>
          <motion.p 
            variants={itemVariants} 
            // Added mx-auto to center the paragraph
            className="mt-6 max-w-3xl mx-auto text-xl text-gray-200"
          >
            Market Mentor was born from a simple realization: the world of investing is needlessly complex. I started as a beginner, overwhelmed by jargon and data. This project is my answer—a tool designed to provide the clarity I wish I had from day one.
          </motion.p>
        </motion.div>
      </div>

      {/* --- Founder Section --- */}
      <motion.div 
        className="bg-white py-16 sm:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <motion.div className="lg:col-span-1 rounded-lg overflow-hidden" variants={itemVariants}>
            <img 
              className="h-auto w-full object-cover hover:scale-105 transition-transform duration-500" 
              src="/images/owen/owen-akers.jpeg" 
              alt="Owen Akers, Founder"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x800/e2e8f0/475569?text=Founder'; }}
            />
          </motion.div>
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <h2 className="text-3xl font-extrabold text-gray-900">Meet the Founder</h2>
            <p className="mt-4 text-lg text-gray-500">
              My name is Owen Akers, and I'm a software developer with a passion for making complex topics accessible. While learning to code, I found that the best way to understand something is to build with it. I applied that same philosophy to investing. Market Mentor is the result of that journey—a practical, hands-on tool that I built to help myself and others learn with confidence.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              This project isn't just a part of my portfolio; it's a testament to the idea that with the right tools, anyone can start building their financial literacy.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* --- Our Values Section --- */}
      <motion.div 
        className="bg-gray-50 py-16 sm:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 variants={itemVariants} className="text-3xl font-extrabold text-gray-900">Our Core Principles</motion.h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div variants={cardVariants} className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-indigo-600">Clarity First</h3>
              <p className="mt-2 text-gray-500">We prioritize clear, simple presentation of data over clutter. No jargon, just insights.</p>
            </motion.div>
            <motion.div variants={cardVariants} className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-indigo-600">Education Focused</h3>
              <p className="mt-2 text-gray-500">Our goal is to empower you to learn, not just to show you numbers on a screen.</p>
            </motion.div>
            <motion.div variants={cardVariants} className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-indigo-600">Built on Trust</h3>
              <p className="mt-2 text-gray-500">We use reliable, industry-standard financial data to ensure you have information you can count on.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
