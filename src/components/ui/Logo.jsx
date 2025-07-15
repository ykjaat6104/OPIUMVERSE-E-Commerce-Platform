import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Logo = ({ size = 'medium', className = '' }) => {
  const { isDarkMode } = useContext(ThemeContext);
  
  const sizes = {
    small: 'text-lg',
    medium: 'text-3xl', 
    large: 'text-4xl',
    xlarge: 'text-5xl'
  };

  const customSize = {};

  return (
    <div className={`relative inline-block ${className}`}>
      <span 
        className={`${sizes[size]} font-medium bg-clip-text text-transparent uppercase tracking-wider ${
          isDarkMode
            ? 'bg-gradient-to-r from-blue-300 to-purple-400'
            : 'bg-gradient-to-r from-blue-600 to-cyan-600'
        }`}
        style={{
          ...customSize
        }}
      >
        OPIUMVERSE
      </span>
    </div>
  );
};

export default Logo;
