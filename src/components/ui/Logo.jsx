import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Logo = ({ size = 'medium', className = '', showLauncherTransition = false, keepIlluminated = false }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isAnimating, setIsAnimating] = useState(showLauncherTransition);
  const [shouldGlow, setShouldGlow] = useState(keepIlluminated);
  
  const sizes = {
    small: 'text-lg',
    medium: 'text-3xl', 
    large: 'text-4xl',
    xlarge: 'text-5xl'
  };

  const customSize = {};

  useEffect(() => {
    if (showLauncherTransition) {
      setIsAnimating(true);
      setShouldGlow(true);
      // Keep glowing after transition ends
      const timer = setTimeout(() => {
        setIsAnimating(false);
        // Keep the glow permanently if keepIlluminated is true
        if (!keepIlluminated) {
          setShouldGlow(false);
        }
      }, 4000); // Longer animation to match launcher
      return () => clearTimeout(timer);
    } else if (keepIlluminated) {
      setShouldGlow(true);
    }
  }, [showLauncherTransition, keepIlluminated]);

  return (
    <div className={`relative inline-block ${className}`}>
      <span 
        className={`${sizes[size]} bg-clip-text text-transparent uppercase tracking-wider transition-all duration-1000 ${
          isAnimating 
            ? 'animate-pulse scale-125 font-black'
            : shouldGlow
              ? 'scale-110 font-bold animate-pulse'
              : 'scale-100 font-medium'
        } ${
          isDarkMode
            ? 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'
            : 'bg-gradient-to-r from-blue-600 to-sky-400'
        }`}
        style={{
          ...customSize,
          filter: (isAnimating || shouldGlow)
            ? isDarkMode 
              ? 'drop-shadow(0 0 20px rgba(79, 70, 229, 0.9)) drop-shadow(0 0 40px rgba(147, 51, 234, 0.7))'
              : 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 40px rgba(0, 0, 0, 0.6))'
            : 'none',
          textShadow: (isAnimating || shouldGlow)
            ? isDarkMode 
              ? '0 0 25px rgba(79, 70, 229, 0.9), 0 0 50px rgba(147, 51, 234, 0.7)'
              : '0 0 25px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 0, 0, 0.6)'
            : 'none'
        }}
      >
        OPIUMVERSE
      </span>
      
      {/* Enhanced glow effect for launcher transition */}
      {(isAnimating || shouldGlow) && (
        <div className="absolute inset-0 -z-10">
          <span 
            className={`${sizes[size]} font-black bg-clip-text text-transparent uppercase tracking-wider blur-sm opacity-60 ${
              isDarkMode
                ? 'bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300'
                : 'text-black'
            }`}
            style={customSize}
          >
            OPIUMVERSE
          </span>
        </div>
      )}
      
      {/* Additional glow layers for premium effect */}
      {(isAnimating || shouldGlow) && (
        <div className="absolute inset-0 -z-20">
          <span 
            className={`${sizes[size]} font-black bg-clip-text text-transparent uppercase tracking-wider blur-lg opacity-40 ${
              isDarkMode
                ? 'bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200'
                : 'text-black'
            }`}
            style={customSize}
          >
            OPIUMVERSE
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
