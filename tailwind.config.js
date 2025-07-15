/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Premium Royal Blue Palette
        royal: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d8ff',
          300: '#a5bdff',
          400: '#8097ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Cyan & Powder Blue
        powder: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Premium Cream & Taupe
        cream: {
          50: '#fefdfb',
          100: '#fdf9f0',
          200: '#fbf1e0',
          300: '#f7e6c8',
          400: '#f2d7a7',
          500: '#ebc181',
          600: '#e0a85e',
          700: '#d18e47',
          800: '#b5723d',
          900: '#925d35',
          950: '#4f3018',
        },
        taupe: {
          50: '#f8f7f4',
          100: '#efede6',
          200: '#ddd9cc',
          300: '#c5bfa8',
          400: '#aca184',
          500: '#9a8b6b',
          600: '#8b7a5e',
          700: '#726450',
          800: '#5f5544',
          900: '#4f4739',
          950: '#29251d',
        },
        // Premium Dark Grays
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Custom Dark Theme Colors
        dark: {
          bg: '#0a0a0a',
          surface: '#111111',
          card: '#1a1a1a',
          border: '#2a2a2a',
          text: '#ffffff',
          muted: '#9ca3af',
        },
        // Light Theme Colors - Enhanced with subtle separations
        light: {
          bg: '#ffffff',
          'bg-secondary': '#f8fafc',
          'bg-tertiary': '#f1f5f9',
          'bg-quaternary': '#e2e8f0',
          surface: '#f8fafc',
          'surface-elevated': '#f8fafc',
          card: '#fefefe',
          'card-hover': '#f9fafb',
          border: '#e2e8f0',
          'border-subtle': '#f1f5f9',
          'border-light': '#e5e7eb',
          text: '#1e293b',
          muted: '#64748b',
        }
      },
      backgroundImage: {
        // Premium Gradients
        'gradient-royal': 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #0891b2 100%)',
        'gradient-powder': 'linear-gradient(135deg, #bae6fd 0%, #7dd3fc 50%, #38bdf8 100%)',
        'gradient-cream': 'linear-gradient(135deg, #f7e6c8 0%, #ebc181 50%, #d18e47 100%)',
        'gradient-taupe': 'linear-gradient(135deg, #c5bfa8 0%, #9a8b6b 50%, #726450 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        'gradient-midnight': 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)',
        // Radial gradients
        'gradient-radial-royal': 'radial-gradient(circle at center, #4f46e5 0%, #312e81 70%)',
        'gradient-radial-ocean': 'radial-gradient(circle at center, #0ea5e9 0%, #0c4a6e 70%)',
      },
      fontFamily: {
        sans: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
