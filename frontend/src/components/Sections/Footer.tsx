// frontend/src/components/Footer.tsx

import { Link } from 'react-router-dom';

// Simple SVG components for social icons
const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export function Footer() {
  const linkStyles = "text-gray-400 hover:text-white transition-colors duration-300";

  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Branding and Social Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Market Mentor</h3>
            <p className="text-gray-400">
              Clear insights for smarter investing.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/owen-akers/" target="_blank" className={linkStyles} aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="https://github.com/owenakers/Market-Mentor" target="_blank" className={linkStyles} aria-label="GitHub">
                <GitHubIcon />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Navegation</h4>
              <ul className="mt-4 space-y-4">
                <li><Link to="/" className={linkStyles} onClick={() => window.scrollTo({ top: 0 })}>Home Page</Link></li>
                <li><Link to="/dashboard" className={linkStyles} onClick={() => window.scrollTo({ top: 0 })}>Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Company</h4>
              <ul className="mt-4 space-y-4">
                <li><Link to="/about" className={linkStyles} onClick={() => window.scrollTo({ top: 0 })}>About</Link></li>
                <li><Link to="/contact" className={linkStyles} onClick={() => window.scrollTo({ top: 0 })}>Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Legal</h4>
              <ul className="mt-4 space-y-4">
                <li><Link to="/privacy" className={linkStyles} onClick={() => window.scrollTo({ top: 0 })}>Privacy Policy</Link></li>
                <li><Link to="/terms" className={linkStyles} onClick={() => window.scrollTo({ top: 0 })}>Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-base text-gray-500">&copy; {new Date().getFullYear()} Market Mentor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}