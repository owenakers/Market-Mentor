import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- SVG Icon Components ---
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// --- Animation Variants ---
const mobileMenuVariants = {
    hidden: {
        x: '100%',
        opacity: 0,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
};

const navLinkVariants = {
    hover: {
        y: -2,
        color: "#4f46e5", // indigo-600
    }
}

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const userId = localStorage.getItem('loggedInUserId');
      setIsLoggedIn(!!userId);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserId');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* --- Logo and Site Name --- */}
          <Link to="/" className="flex items-center gap-3">
            <img className="h-12 w-auto" src="/Market_mentor-logo.png" alt="Market Mentor Logo" />
            <span className="font-bold text-xl text-gray-800 hidden sm:block">Market Mentor</span>
          </Link>
          
          {/* --- Desktop Navigation Links --- */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <motion.div variants={navLinkVariants} whileHover="hover">
                    <Link to="/dashboard" className="text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                </motion.div>
                <motion.div variants={navLinkVariants} whileHover="hover">
                    <button onClick={handleLogout} className="text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div variants={navLinkVariants} whileHover="hover">
                    <Link to="/login" className="text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                </motion.div>
                <Link to="/register">
                  <motion.button 
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:bg-indigo-700 transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* --- Mobile Menu Button --- */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors">
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

        </div>
      </div>

      {/* --- Animated Mobile Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-white/95 backdrop-blur-xl z-40"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="px-6 pt-8 pb-3 space-y-4">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:bg-gray-200 block px-4 py-3 rounded-lg text-lg font-medium">Dashboard</Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-gray-700 hover:bg-gray-200 w-full text-left block px-4 py-3 rounded-lg text-lg font-medium">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:bg-gray-200 block px-4 py-3 rounded-lg text-lg font-medium">Login</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="bg-indigo-600 text-white block w-full text-center px-4 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 mt-4">Sign Up</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
