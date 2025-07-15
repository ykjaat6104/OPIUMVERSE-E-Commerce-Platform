import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ThemeContext } from '../../context/ThemeContext';
import ThemeToggle from '../ui/ThemeToggle';
import Logo from '../ui/Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user = null, logout } = useAuth();
  const { items: cartItems = [] } = useCart();
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to products page with search query
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Products', 
      href: '/products',
      dropdown: [
        { name: 'All Products', href: '/products' },
        { name: 'Electronics', href: '/category/electronics' },
        { name: 'Audio', href: '/category/audio' },
        { name: 'Gaming', href: '/category/gaming' },
        { name: 'Compare Products', href: '/compare' },
        { name: 'Wishlist', href: '/wishlist' }
      ]
    },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Support', href: '/support' },
  ];

  // Helper function to check if a navigation item is active
  const isActiveTab = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center mr-6">
            <Logo size="medium" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative rounded-lg transform ${
                  isActiveTab(item.href)
                    ? isDarkMode 
                      ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg scale-110 font-semibold'
                      : 'text-white bg-gradient-to-r from-blue-600 to-sky-400 shadow-lg scale-110 font-semibold'
                    : isDarkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-600/20 hover:scale-105 hover:shadow-md'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 hover:scale-105 hover:shadow-md'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleSearchKeyPress}
                  className={`bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-10 w-64 smooth-transition hover-scale focus:scale-105 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDarkMode
                      ? 'focus:ring-purple-500 focus:border-purple-500'
                      : 'focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
                <button
                  type="submit"
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 icon-hover transition-all duration-200 ${
                    isDarkMode
                      ? 'text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-600/30 hover:rounded'
                      : 'text-gray-500 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 hover:rounded'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Cart */}
            <Link 
              to="/cart" 
              className={`relative p-2 transition-all duration-200 hover-lift icon-hover ${
                location.pathname === '/cart'
                  ? isDarkMode
                    ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg'
                    : 'text-blue-600 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg'
                  : isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-600/20 hover:rounded-lg'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 hover:rounded-lg'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5L19 18M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
              {cartItems.length > 0 && (
                <span className={`absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                    : 'bg-gradient-to-r from-blue-600 to-sky-400'
                }`}>
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-600/20'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50'
                }`}>
                  <span>{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/auth"
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg transform ${
                    location.pathname === '/auth'
                      ? isDarkMode
                        ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg scale-110 font-semibold'
                        : 'text-white bg-gradient-to-r from-blue-600 to-sky-400 shadow-lg scale-110 font-semibold'
                      : isDarkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-600/20 hover:scale-105 hover:shadow-md'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 hover:scale-105 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Sign In / Up</span>
                  </div>
                </Link>
              </div>
            )}

            {/* Theme Toggle */}
            <div className="ml-6">
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-600/20'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-3 px-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg transform ${
                    isActiveTab(item.href)
                      ? isDarkMode
                        ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg scale-105 font-semibold'
                        : 'text-white bg-gradient-to-r from-blue-600 to-sky-400 shadow-lg scale-105 font-semibold'
                      : isDarkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-600/20 hover:scale-102'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 hover:scale-102'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              {!user && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <Link
                    to="/auth"
                    className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg transform ${
                      location.pathname === '/auth'
                        ? isDarkMode
                          ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg scale-105 font-semibold'
                          : 'text-white bg-gradient-to-r from-blue-600 to-sky-400 shadow-lg scale-105 font-semibold'
                        : isDarkMode
                          ? 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-600/20'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Sign In / Register</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
