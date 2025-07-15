import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [userType, setUserType] = useState('customer'); // customer or seller
  const [formData, setFormData] = useState({
    // Login fields
    email: '',
    password: '',
    businessId: '',
    // Register fields
    name: '',
    confirmPassword: '',
    businessName: '',
    phone: '',
    address: '',
    businessType: '',
    terms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isDarkMode } = useContext(ThemeContext);
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const businessTypes = [
    'Retail Store',
    'Online Business', 
    'Manufacturer',
    'Wholesaler',
    'Service Provider',
    'Restaurant',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (activeTab === 'login') {
        // Login logic
        await login({ email: formData.email, name: 'User' });
        navigate(userType === 'seller' ? '/seller-dashboard' : '/');
      } else {
        // Register logic
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (!formData.terms) {
          setError('Please accept the terms and conditions');
          setLoading(false);
          return;
        }
        await register(formData.email, formData.password, userType, formData);
        navigate(userType === 'seller' ? '/seller-dashboard' : '/');
      }
    } catch (err) {
      setError(activeTab === 'login' ? 'Invalid credentials' : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      businessId: '',
      name: '',
      confirmPassword: '',
      businessName: '',
      phone: '',
      address: '',
      businessType: '',
      terms: false
    });
    setError('');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetForm();
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    resetForm();
  };

  return (
    <div className={`min-h-screen flex transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      {/* Left Side - Clean Image Display */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Theme-Based Background Image */}
        <div className="absolute inset-0">
          <img 
            src={isDarkMode ? "/images/OP1.png" : "/images/Opium.png"}
            alt="OpiumVerse" 
            className="w-full h-full object-cover object-center"
            style={{ minHeight: '100vh', objectFit: 'cover' }}
          />
          {/* Theme-Based Gradient Overlays */}
          {isDarkMode ? (
            // Dark mode: Subtle bottom gradient with pinkish indigo tint for text readability
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-indigo-900/10 to-pink-900/5"></div>
          ) : (
            // Light mode: Beautiful blue gradient overlay
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-blue-300/25 to-blue-200/20"></div>
          )}
        </div>

        {/* Bottom Content Overlay */}
        <div className="relative z-10 flex flex-col justify-end items-start w-full p-8 pb-12">
          {/* Dynamic Content Based on User Type */}
          <div className="space-y-6 animate-fade-in-up">
            {/* User Type Specific Description */}
            <div className="space-y-3">
              <p className={`text-lg font-medium leading-relaxed max-w-md ${
                isDarkMode ? 'text-white/90' : 'text-white/95'
              }`}>
                {userType === 'customer' 
                  ? 'Experience the future of online shopping with cutting-edge technology and unparalleled service.'
                  : 'Join thousands of successful sellers and grow your business with our powerful e-commerce platform.'
                }
              </p>
            </div>

            {/* Dynamic Features */}
            <div className="space-y-3">
              {(userType === 'customer' ? [
                { icon: '🛍️', text: 'Seamless Shopping Experience' },
                { icon: '🔒', text: 'Advanced Security & Privacy' },
                { icon: '💬', text: '24/7 Premium Support' }
              ] : [
                { icon: '📈', text: 'Reach Millions of Customers' },
                { icon: '📊', text: 'Advanced Analytics & Insights' },
                { icon: '🚀', text: 'Marketing & Promotional Tools' }
              ]).map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <span className="text-lg">{feature.icon}</span>
                  <span className={`text-sm font-medium group-hover:text-white transition-colors duration-200 ${
                    isDarkMode ? 'text-white/80' : 'text-white/90'
                  }`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className={`flex items-center space-x-6 pt-4 border-t transition-colors duration-300 ${
              isDarkMode ? 'border-white/20' : 'border-white/30'
            }`}>
              <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white/70' : 'text-white/80'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs font-medium">Secure</span>
              </div>
              <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white/70' : 'text-white/80'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xs font-medium">Fast</span>
              </div>
              <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white/70' : 'text-white/80'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-xs font-medium">Trusted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Enhanced Forms */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-900/50 backdrop-blur-sm' 
          : 'bg-white/70 backdrop-blur-sm'
      }`} style={{ minHeight: '100vh' }}>
        <div className="w-full max-w-md space-y-8 flex flex-col justify-center" style={{ minHeight: '80vh' }}>
          {/* Enhanced Mobile Brand */}
          <div className="lg:hidden text-center mb-8 animate-fade-in">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg'
                : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg'
            }`}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className={`text-4xl font-bold mb-2 transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-400 via-purple-500 to-blue-300 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent'
            }`}>
              OpiumVerse
            </h1>
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Premium E-commerce Platform
            </p>
          </div>

          {/* Enhanced User Type Toggle */}
          <div className="text-center animate-fade-in delay-100">
            <div className={`inline-flex p-1.5 rounded-xl shadow-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700' 
                : 'bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md'
            }`}>
              <button
                onClick={() => handleUserTypeChange('customer')}
                className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 transform ${
                  userType === 'customer'
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105 font-semibold'
                      : 'bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg scale-105 font-semibold'
                    : isDarkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Customer</span>
                </span>
              </button>
              <button
                onClick={() => handleUserTypeChange('seller')}
                className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 transform ${
                  userType === 'seller'
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105 font-semibold'
                      : 'bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg scale-105 font-semibold'
                    : isDarkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>Seller</span>
                </span>
              </button>
            </div>
          </div>

          {/* Enhanced Form Header */}
          <div className="text-center animate-fade-in delay-200">
            <h2 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {activeTab === 'login' 
                ? `${userType === 'seller' ? 'Seller' : 'Customer'} Sign In`
                : `Create ${userType === 'seller' ? 'Seller' : 'Customer'} Account`
              }
            </h2>
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {activeTab === 'login' 
                ? userType === 'customer'
                  ? 'Welcome back! Please sign in to your account.'
                  : 'Access your seller dashboard and manage your business.'
                : userType === 'customer'
                  ? 'Join thousands of satisfied customers.'
                  : 'Join thousands of successful sellers.'
              }
            </p>
          </div>

          {/* Enhanced Error Message */}
          {error && (
            <div className={`p-4 rounded-lg text-sm transition-all duration-300 animate-shake ${
              isDarkMode
                ? 'bg-red-900/20 border border-red-500/30 text-red-400'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in delay-400" style={{ minHeight: '45vh' }}>
            {activeTab === 'login' ? (
              // Enhanced Login Form
              <div className="space-y-5" style={{ minHeight: '35vh' }}>
                {userType === 'seller' && (
                  <div>
                    <label htmlFor="businessId" className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>Business ID</span>
                      </span>
                    </label>
                    <input
                      id="businessId"
                      name="businessId"
                      type="text"
                      className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isDarkMode 
                          ? 'border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 focus:ring-offset-gray-900' 
                          : 'border-gray-300 bg-white/50 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 focus:ring-offset-white'
                      } backdrop-blur-sm hover:shadow-lg`}
                      placeholder="Enter your business ID"
                      value={formData.businessId}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="email" className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      <span>Email Address</span>
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required                  className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isDarkMode 
                      ? userType === 'customer'
                        ? 'border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-offset-gray-900'
                        : 'border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 focus:ring-offset-gray-900'
                      : userType === 'customer'
                        ? 'border-gray-300 bg-white/50 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-offset-white'
                        : 'border-gray-300 bg-white/50 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 focus:ring-offset-white'
                  } backdrop-blur-sm hover:shadow-lg`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <span className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Password</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className={`w-full px-4 py-3.5 pr-12 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isDarkMode 
                          ? userType === 'customer'
                            ? 'border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-offset-gray-900'
                            : 'border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 focus:ring-offset-gray-900'
                          : userType === 'customer'
                            ? 'border-gray-300 bg-white/50 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-offset-white'
                            : 'border-gray-300 bg-white/50 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 focus:ring-offset-white'
                      } backdrop-blur-sm hover:shadow-lg`}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-all duration-200 ${
                        isDarkMode 
                          ? userType === 'customer'
                            ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700/50'
                            : 'text-gray-400 hover:text-purple-400 hover:bg-gray-700/50'
                          : userType === 'customer'
                            ? 'text-gray-500 hover:text-blue-600 hover:bg-gray-100/50'
                            : 'text-gray-500 hover:text-purple-600 hover:bg-gray-100/50'
                      }`}
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Register Form
              <div style={{ minHeight: '35vh' }}>
                {userType === 'customer' ? (
                  // Customer Registration
                  <div style={{ minHeight: '20vh' }}>
                    <div>
                      <label htmlFor="name" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className={`w-full px-4 py-3 border rounded-lg ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                ) : (
                  // Seller Registration
                  <div style={{ minHeight: '20vh' }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="businessName" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Business Name
                        </label>
                        <input
                          id="businessName"
                          name="businessName"
                          type="text"
                          required
                          className={`w-full px-4 py-3 border rounded-lg ${
                            isDarkMode 
                              ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                          } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
                          placeholder="Your business name"
                          value={formData.businessName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="businessType" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Business Type
                        </label>
                        <select
                          id="businessType"
                          name="businessType"
                          required
                          className={`w-full px-4 py-3 border rounded-lg ${
                            isDarkMode 
                              ? 'border-gray-600 bg-gray-700 text-white' 
                              : 'border-gray-300 bg-white text-gray-900'
                          } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
                          value={formData.businessType}
                          onChange={handleChange}
                        >
                          <option value="">Select type</option>
                          {businessTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        className={`w-full px-4 py-3 border rounded-lg ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={`w-full px-4 py-3 border rounded-lg ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        className={`w-full px-4 py-3 pr-12 border rounded-lg ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
                        placeholder="Create password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} hover:text-indigo-600`}
                      >
                        {showPassword ? (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        className={`w-full px-4 py-3 pr-12 border rounded-lg ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} hover:text-indigo-600`}
                      >
                        {showConfirmPassword ? (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms for Registration */}
                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                  <label htmlFor="terms" className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    I agree to the{' '}
                    <Link to="/terms" className="text-indigo-600 hover:text-indigo-500 font-medium">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500 font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
            )}

            {/* Enhanced Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed group ${
                isDarkMode
                  ? userType === 'customer'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl focus:ring-blue-500/50 focus:ring-offset-gray-900 disabled:opacity-50'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl focus:ring-purple-500/50 focus:ring-offset-gray-900 disabled:opacity-50'
                  : userType === 'customer'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white shadow-xl hover:shadow-2xl focus:ring-blue-500/50 focus:ring-offset-white disabled:opacity-50'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-xl hover:shadow-2xl focus:ring-purple-500/50 focus:ring-offset-white disabled:opacity-50'
              } ${!loading ? 'hover:scale-105 active:scale-95' : ''}`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{activeTab === 'login' ? 'Signing you in...' : 'Creating your account...'}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>{activeTab === 'login' ? 'Sign In' : 'Create Account'}</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </button>
          </form>

          {/* Don't Have Account Section */}
          {activeTab === 'login' && (
            <div className="text-center animate-fade-in delay-450">
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Don't have an account?
              </p>
              <button
                onClick={() => setActiveTab('register')}
                className={`mt-3 px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  userType === 'customer'
                    ? isDarkMode
                      ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 border border-blue-600/30'
                      : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200'
                    : isDarkMode
                      ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 border border-purple-600/30'
                      : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50 border border-purple-200'
                }`}
              >
                Create {userType === 'customer' ? 'Customer' : 'Seller'} Account
              </button>
            </div>
          )}

          {/* Enhanced Social Login */}
          {activeTab === 'login' && (
            <div className="animate-fade-in delay-500">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t transition-colors duration-300 ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-200'
                  }`} />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-4 font-medium transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-900/50 text-gray-400' 
                      : 'bg-white/70 text-gray-500'
                  }`}>
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  {
                    name: 'Google',
                    icon: (
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    )
                  },
                  {
                    name: 'Facebook',
                    icon: (
                      <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )
                  },
                  {
                    name: 'Twitter',
                    icon: (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    )
                  }
                ].map((provider, index) => (
                  <button
                    key={provider.name}
                    type="button"
                    className={`group relative flex justify-center py-3 px-4 border rounded-xl shadow-sm transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-800/50 hover:bg-gray-700/50 focus:ring-blue-500/50 focus:ring-offset-gray-900' 
                        : 'border-gray-300 bg-white/50 hover:bg-gray-50 focus:ring-blue-500/50 focus:ring-offset-white'
                    } backdrop-blur-sm hover:shadow-lg`}
                  >
                    {provider.icon}
                    <span className="sr-only">Sign in with {provider.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Back to Login for Registration */}
          {activeTab === 'register' && (
            <div className="text-center animate-fade-in delay-600">
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Already have an account?
              </p>
              <button
                onClick={() => setActiveTab('login')}              className={`mt-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? userType === 'customer'
                    ? 'text-blue-400 hover:text-blue-300'
                    : 'text-purple-400 hover:text-purple-300'
                  : userType === 'customer'
                    ? 'text-blue-600 hover:text-blue-700'
                    : 'text-purple-600 hover:text-purple-700'
              }`}
              >
                Sign In Here
              </button>
            </div>
          )}

          {/* Enhanced Back to Home */}
          <div className="text-center animate-fade-in delay-700">
            <Link 
              to="/" 
              className={`inline-flex items-center space-x-2 text-sm font-medium transition-all duration-300 group ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
