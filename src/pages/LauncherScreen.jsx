import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const LauncherScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Always reset the launcher state when component mounts
    setCurrentStep(0);
    setIsExiting(false);
    
    // Clear any existing flags to ensure fresh animation
    sessionStorage.removeItem('launcherTransition');
    
    // Slower, more cinematic animation sequence
    const steps = [
      { delay: 1000, action: () => setCurrentStep(1) },    // Brand name starts writing (slower)
      { delay: 3000, action: () => setCurrentStep(2) },    // Brand name fully visible with glow
      { delay: 5000, action: () => setCurrentStep(3) },    // Stroke line draws elegantly
      { delay: 7000, action: () => setCurrentStep(4) },    // Hold for appreciation
      { delay: 9000, action: () => {                       // Start cinematic exit transition
        setIsExiting(true);
        // Set sessionStorage flag for navbar animation
        sessionStorage.setItem('launcherTransition', 'true');
        sessionStorage.setItem('fromLauncher', 'true');
        
        // Check if there's an intended destination from page refresh
        const intendedDestination = sessionStorage.getItem('intendedDestination');
        const destination = intendedDestination || '/home?fromLauncher=true';
        
        // Clean up the intended destination
        sessionStorage.removeItem('intendedDestination');
        
        setTimeout(() => navigate(destination), 2500); // Longer transition
      }}
    ];

    const timers = steps.map(step => 
      setTimeout(step.action, step.delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  const handleContinue = () => {
    if (!isExiting) {
      setIsExiting(true);
      // Set sessionStorage flag for navbar animation
      sessionStorage.setItem('launcherTransition', 'true');
      sessionStorage.setItem('fromLauncher', 'true');
      
      // Check if there's an intended destination from page refresh
      const intendedDestination = sessionStorage.getItem('intendedDestination');
      const destination = intendedDestination || '/home?fromLauncher=true';
      
      // Clean up the intended destination
      sessionStorage.removeItem('intendedDestination');
      
      setTimeout(() => navigate(destination), 2500); // Slower transition
    }
  };

  return (
    <div 
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-[9999] cursor-pointer transition-all ease-in-out ${
        isExiting 
          ? 'duration-[2500ms] opacity-100 transform translate-y-[-100vh] scale-95' 
          : 'duration-[2500ms] opacity-100 scale-100 translate-y-0'
      }`}
      style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, #020617 0%, #0f172a 20%, #1e293b 40%, #334155 60%, #475569 80%, #64748b 100%)'
          : 'linear-gradient(135deg, #1e293b 0%, #334155 20%, #475569 40%, #64748b 60%, #94a3b8 80%, #cbd5e1 100%)',
      }}
      onClick={handleContinue}
    >
      {/* Professional background overlay with website colors */}
      <div 
        className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${
          isExiting ? 'opacity-0 blur-lg' : 'opacity-100'
        }`}
        style={{
          background: isDarkMode
            ? `radial-gradient(circle at 30% 40%, rgba(79, 70, 229, 0.15) 0%, transparent 60%), 
               radial-gradient(circle at 70% 60%, rgba(99, 102, 241, 0.12) 0%, transparent 60%), 
               radial-gradient(circle at 50% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 60%)`
            : `radial-gradient(circle at 30% 40%, rgba(79, 70, 229, 0.2) 0%, transparent 60%), 
               radial-gradient(circle at 70% 60%, rgba(99, 102, 241, 0.15) 0%, transparent 60%), 
               radial-gradient(circle at 50% 20%, rgba(147, 51, 234, 0.12) 0%, transparent 60%)`,
          backdropFilter: 'blur(2px)'
        }}
      />

      {/* Brand Name - Premium with website color palette */}
      <div className="relative z-10 text-center">
        <h1 
          className={`font-black text-center uppercase tracking-tight transition-all ease-out ${
            isExiting 
              ? 'duration-[2500ms] opacity-100 scale-100' 
              : currentStep >= 1 
                ? 'duration-[2500ms] opacity-100 scale-100' 
                : 'duration-[2500ms] opacity-0 scale-80'
          } ${
            currentStep >= 2 ? 'animate-pulse' : ''
          }`}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(3.5rem, 15vw, 10rem)',
            background: isDarkMode
              ? 'linear-gradient(45deg, #4f46e5 0%, #7c3aed 20%, #a855f7 40%, #c084fc 60%, #e879f9 80%, #f0abfc 100%)'
              : 'linear-gradient(45deg, #1e293b 0%, #374151 20%, #4f46e5 40%, #7c3aed 60%, #a855f7 80%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.01em',
            textShadow: isDarkMode 
              ? '0 0 50px rgba(79, 70, 229, 0.6)'
              : '0 0 50px rgba(30, 41, 59, 0.8)',
            filter: currentStep >= 2 
              ? isDarkMode
                ? 'drop-shadow(0 0 40px rgba(79, 70, 229, 0.9)) drop-shadow(0 0 80px rgba(147, 51, 234, 0.7))'
                : 'drop-shadow(0 0 40px rgba(30, 41, 59, 0.9)) drop-shadow(0 0 80px rgba(79, 70, 229, 0.7))'
              : 'none'
          }}
        >
          OPIUMVERSE
        </h1>

        {/* Professional gradient stroke line with website colors */}
        <div className="relative mt-8 flex justify-center">
          <div 
            className={`h-3 rounded-full ease-out ${
              isExiting 
                ? 'transition-all duration-[2500ms] opacity-100 w-4/5' 
                : currentStep >= 3 
                  ? 'transition-all duration-[3000ms] w-4/5' 
                  : 'transition-all duration-[3000ms] w-0'
            }`}
            style={{
              background: isDarkMode
                ? 'linear-gradient(90deg, transparent 0%, #4f46e5 10%, #7c3aed 30%, #a855f7 50%, #c084fc 70%, #e879f9 90%, transparent 100%)'
                : 'linear-gradient(90deg, transparent 0%, #1e293b 10%, #374151 30%, #4f46e5 50%, #7c3aed 70%, #a855f7 90%, transparent 100%)',
              borderRadius: '3px',
              boxShadow: currentStep >= 3 && !isExiting
                ? isDarkMode
                  ? '0 0 40px rgba(79, 70, 229, 0.9), 0 0 80px rgba(147, 51, 234, 0.7), 0 0 120px rgba(168, 85, 247, 0.5)'
                  : '0 0 40px rgba(30, 41, 59, 0.9), 0 0 80px rgba(79, 70, 229, 0.7), 0 0 120px rgba(124, 58, 237, 0.5)'
                : 'none'
            }}
          />
          
          {/* Additional glow layers for professional depth */}
          <div 
            className={`absolute top-0 h-3 rounded-full ease-out blur-md ${
              isExiting 
                ? 'transition-all duration-[2500ms] opacity-70 w-4/5' 
                : currentStep >= 3 
                  ? 'transition-all duration-[3000ms] w-4/5 opacity-70' 
                  : 'transition-all duration-[3000ms] w-0 opacity-0'
            }`}
            style={{
              background: isDarkMode
                ? 'linear-gradient(90deg, transparent 0%, #4f46e5 10%, #7c3aed 30%, #a855f7 50%, #c084fc 70%, #e879f9 90%, transparent 100%)'
                : 'linear-gradient(90deg, transparent 0%, #1e293b 10%, #374151 30%, #4f46e5 50%, #7c3aed 70%, #a855f7 90%, transparent 100%)',
              borderRadius: '3px'
            }}
          />
        </div>

        {/* Exit message during transition */}
        {isExiting && (
          <div className="absolute top-full mt-16 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out opacity-100">
            <p className={`text-2xl font-light animate-pulse ${
              isDarkMode ? 'text-indigo-300' : 'text-slate-700'
            }`}
            style={{
              textShadow: isDarkMode 
                ? '0 0 20px rgba(79, 70, 229, 0.6)'
                : '0 0 20px rgba(30, 41, 59, 0.6)'
            }}>
              Entering OpiumVerse...
            </p>
          </div>
        )}
      </div>

      {/* Professional floating elements with website color scheme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-all duration-4000 ease-out ${
              currentStep >= 2 ? 'opacity-5 animate-pulse' : 'opacity-0'
            }`}
            style={{
              width: `${80 + i * 30}px`,
              height: `${80 + i * 30}px`,
              top: `${10 + i * 15}%`,
              left: `${5 + i * 15}%`,
              background: isDarkMode
                ? i % 2 === 0 
                  ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
                  : 'linear-gradient(135deg, #a855f7, #c084fc)'
                : i % 2 === 0
                  ? 'linear-gradient(135deg, #1e293b, #374151)'
                  : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${8 + i * 2}s`,
              transform: currentStep >= 2 
                ? `scale(${0.8 + i * 0.1}) rotate(${i * 30}deg)`
                : 'scale(0) rotate(0deg)',
              transition: `all ${2500 + i * 300}ms ease-out ${i * 200}ms`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LauncherScreen;
