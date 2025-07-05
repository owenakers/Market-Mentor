import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- NAVBAR CONTAINER: Height changed from h-18 to h-20 --- */}
        <div className="flex items-center justify-between h-20">
          
          {/* --- Logo and Site Name --- */}
          <Link to="/" className="flex items-center gap-3">
            {/* --- LOGO IMAGE: Height changed from h-8 to h-12 --- */}
            <img className="h-20 w-auto" src="/Market_mentor-logo.png" alt="Market Mentor Logo" />
            <span className="font-bold text-xl text-gray-800">Market Mentor</span>
          </Link>
          
          {/* --- Desktop Navigation Links --- */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                  <button onClick={handleLogout} className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                  <Link to="/register">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700">Sign Up</button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* --- Mobile Menu Button --- */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                <button onClick={handleLogout} className="text-gray-600 hover:bg-gray-200 w-full text-left block px-3 py-2 rounded-md text-base font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link to="/register" className="text-gray-600 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}