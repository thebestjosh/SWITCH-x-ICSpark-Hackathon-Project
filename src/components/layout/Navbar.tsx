import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-display font-bold text-primary">Mālama Health</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link 
              to="/learn" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/learn') ? 'bg-primary-light text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              Learn
            </Link>
            <Link 
              to="/forum" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/forum') ? 'bg-primary-light text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              Forum
            </Link>
            <Link 
              to="/resources" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/resources') ? 'bg-primary-light text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              Resources
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about') ? 'bg-primary-light text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              About Us
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center ml-4">
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={closeMenu}
                >
                  My Dashboard
                </Link>
                <button 
                  onClick={logout} 
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-secondary hover:bg-secondary-dark transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center ml-4">
                <Link 
                  to="/login" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-secondary hover:bg-secondary-dark transition-colors"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg 
                  className="block h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg 
                  className="block h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/learn" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/learn') ? 'bg-primary-light text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              Learn
            </Link>
            <Link 
              to="/forum" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/forum') ? 'bg-primary-light text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              Forum
            </Link>
            <Link 
              to="/resources" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/resources') ? 'bg-primary-light text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              Resources
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/about') ? 'bg-primary-light text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              About Us
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  My Dashboard
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    closeMenu();
                  }} 
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;