import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const SellerForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    businessId: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Simulate seller password reset API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would call your seller password reset API here
      // await resetSellerPassword(formData.email, formData.businessId);
      
      setMessage('If a seller account with that email and business ID exists, we\'ve sent you a password reset link to your registered business email.');
      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again or contact seller support.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="min-h-screen flex items-center justify-center">
        <div className={`max-w-md w-full space-y-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white/70 backdrop-blur-lg'} p-8 rounded-2xl shadow-2xl border ${isDarkMode ? 'border-gray-700' : 'border-white/20'}`}>
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
              </svg>
            </div>
            {!isSubmitted ? (
              <>
                <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  Seller Account Recovery
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
                  Enter your business email and Business ID to reset your seller account password.
                </p>
              </>
            ) : (
              <>
                <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  Check your business email
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
                  We've sent a password reset link to your registered business email address.
                </p>
              </>
            )}
          </div>

          {!isSubmitted ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Business Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`appearance-none relative block w-full px-4 py-3 border ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                        : 'border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-all duration-200 hover-lift`}
                    placeholder="Enter your business email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="businessId" className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Business ID
                  </label>
                  <input
                    id="businessId"
                    name="businessId"
                    type="text"
                    autoComplete="organization"
                    required
                    className={`appearance-none relative block w-full px-4 py-3 border ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                        : 'border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-all duration-200 hover-lift`}
                    placeholder="Enter your Business ID"
                    value={formData.businessId}
                    onChange={handleChange}
                  />
                  <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    This is the unique ID assigned to your business during registration
                  </p>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <div className="text-sm text-red-700 font-medium">{error}</div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading || !formData.email.trim() || !formData.businessId.trim()}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover-lift shadow-lg"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </span>
                  {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {message && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <div className="text-sm text-green-700 font-medium">{message}</div>
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ email: '', businessId: '' });
                    setMessage('');
                    setError('');
                  }}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover-lift"
                >
                  Try different credentials
                </button>

                <div className="text-center">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Didn't receive the email? Check your spam folder or{' '}
                  </span>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                      setError('');
                    }}
                    className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                  >
                    try again
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center space-y-4">
            <Link 
              to="/auth"
              className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all duration-200 hover-lift"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Sign In
            </Link>

            <div className="text-center">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Don't have an account?{' '}
              </span>
              <Link 
                to="/auth"
                className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Seller Support */}
          <div className={`mt-8 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50/50'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <div className="text-center">
              <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Need Business Support?
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                For business account issues, billing questions, or technical support, contact our dedicated seller support team.
              </p>
              <Link 
                to="/seller-support"
                className="text-xs font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                Contact Seller Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerForgotPassword;
