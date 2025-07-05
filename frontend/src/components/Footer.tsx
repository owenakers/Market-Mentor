// frontend/src/components/Footer.tsx

import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Branding Section */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white">Market Mentor</h3>
            <p className="mt-2 text-sm text-gray-400">
              Clear insights for smarter investing.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navigate</h4>
              <ul className="mt-4 space-y-2">
                <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><a href="#" className="hover:text-white">Insights</a></li>
                <li><a href="#" className="hover:text-white">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; 2025 Market Mentor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}