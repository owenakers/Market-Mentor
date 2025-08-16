import { motion } from 'framer-motion';

// Define animation variants for the text container to stagger its children
const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Animate each child with a 0.2s delay
      delayChildren: 0.2,   // Start the animation after a brief delay
    },
  },
};

// Define the animation for individual text elements (slide-up and fade-in)
const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Define a unique animation for the image (subtle rotation and scale)
const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -5 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            duration: 0.8,
            ease: "circOut" 
        }
    }
}

export default function MissionSection() {
    return (
        // Section container with background color and padding
        <section className="w-full bg-gray-200 py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Grid layout for the two-column design */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Reordered columns for better mobile layout */}
                
                {/* Animated Text Column with Stagger Effect */}
                <motion.div 
                    className="text-left lg:order-2" // On large screens, this column will be the 2nd item
                    variants={textContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.h2 
                    variants={textItemVariants}
                    className="text-3xl md:text-4xl font-bold text-gray-900"
                    >
                    My Story: Why Market Mentor?
                    </motion.h2>
                    <motion.p 
                    variants={textItemVariants}
                    className="mt-6 text-lg text-gray-600"
                    >
                    I remember being completely overwhelmed by investing. Seeing acronyms like P/E, EPS, and ROE scared me away. I wanted to learn about investing, but there wasn't a free and simple option. I knew there had to be a better way.
                    </motion.p>
                    <motion.p 
                    variants={textItemVariants}
                    className="mt-4 text-lg text-gray-600"
                    >
                    That's why I built Market Mentor. It's the tool I wish I had when I started. It's a clear, simple, and free platform designed to cut through the noise. My mission is to translate complex financial data into understandable insights, empowering you to start your investment journey with <span className="font-semibold text-indigo-600">confidence, not confusion.</span>
                    </motion.p>
                </motion.div>

                {/* Animated Image Column */}
                <motion.div
                    className="lg:order-1" // On large screens, this column will be the 1st item
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <img 
                    src="/images/owen/owen-akers.jpeg" 
                    alt="Owen Akers" 
                    className="rounded-lg shadow-2xl object-cover aspect-[4/3] w-full"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x450/e5e7eb/334155?text=Image+Not+Found'; }}
                    />
                </motion.div>

                </div>
            </div>
        </section>
    );
}
