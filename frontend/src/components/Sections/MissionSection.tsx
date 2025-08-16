// MissionSection.tsx
import { motion } from "framer-motion";

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

export default function MissionSection() {
  return (
    <section className="w-full bg-gray-50 py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">

          {/* Image Column */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-start"
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="/images/owen/owen-akers.jpeg"
              alt="Owen Akers"
              className="rounded-2xl shadow-lg object-cover aspect-[4/3] w-full max-w-md hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x450/e5e7eb/334155?text=Image+Not+Found";
              }}
            />
          </motion.div>

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
              My Journey
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6"
            >
              Why I Built{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">
                Market Mentor
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed mb-4"
            >
              I remember being completely overwhelmed by investing. Seeing terms
              like <span className="font-mono">P/E</span>,{" "}
              <span className="font-mono">EPS</span>, and{" "}
              <span className="font-mono">ROE</span> scared me away. I wanted to
              learn, but there wasn’t a free and simple option. I knew there had
              to be a better way.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              That’s why I built{" "}
              <span className="font-semibold text-indigo-600">
                Market Mentor
              </span>
              . It’s the tool I wish I had when I started. It's a clear, simple, and
              free guide to investing. My mission is to
              translate complex financial data into understandable insights,
              empowering you to start your investment journey with{" "}
              <span className="font-semibold text-indigo-600">
                confidence, not confusion.
              </span>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
