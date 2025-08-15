import { Link } from 'react-router-dom';

// frontend/src/components/PortfolioSection.tsx
export default function PortfolioSection() {
  return (
    // This outer section provides the background color and vertical spacing.
    <section className="w-full py-30 bg-gray-50">
      {/* This inner div contains the content to the max-width and centers it. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center">
        
        {/* Text content on the left */}
        <div className="max-w-xl text-center md:text-left md:mr-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Tools for a Smarter Portfolio
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Track your assets, analyze market trends, and dive deep into company fundamentals. Market Mentor provides the institutional-grade data you need to build your investment strategy with confidence.
          </p>
          <Link to="/register">
            <button className="bg-indigo-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-600 transition text-lg shadow-lg hover:cursor-pointer">
              Start Analyzing
            </button>
          </Link>
          <p className="text-xs text-gray-400 mt-6">
            All data is provided for informational purposes only.
          </p>
        </div>
        
        {/* Image on the right */}
        <div className="mt-12 md:mt-0 flex-shrink-0">
          <img
            src="/phone.png"
            alt="Market Mentor Dashboard on a Phone"
            className="w-[400px] h-auto"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x600/1e293b/ffffff?text=Error'; }}
          />
        </div>

      </div>
    </section>
  );
}
