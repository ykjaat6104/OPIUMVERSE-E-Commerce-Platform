import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ProductComparison = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold text-center mb-8 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Product Comparison
        </h1>
        <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p>Compare products side by side to make the best choice.</p>
          <p className="mt-4">This feature is coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;