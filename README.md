# 🌊 OpiumVerse - Premium E-commerce Platform

A modern, professional e-commerce platform built with React and Vite, featuring a sophisticated design and seamless shopping experience.

## ✨ Features

### 🛍️ **E-commerce Core**
- **Product Catalog**: Browse premium products with advanced filtering
- **Shopping Cart**: Add/remove products with real-time cart updates
- **User Authentication**: Secure login/register system
- **Product Categories**: Electronics, Audio, Accessories, Lighting, Gaming, Storage
- **Product Comparison**: Side-by-side feature comparison
- **Responsive Design**: Perfect experience on all devices

### 🎨 **Design & UI**
- **Theme System**: Dark/Light mode toggle
- **Professional Color Scheme**: Blue, cyan, and purple gradients
- **Smooth Animations**: Hover effects and transitions
- **Customer Reviews**: Interactive review carousel
- **Clean Architecture**: Modern, intuitive interface

## 🚀 Tech Stack

- **Frontend**: React 19.1.0, Vite 7.0.4
- **Routing**: React Router Dom 7.6.3
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Development**: Hot Module Replacement, ESLint

## 🏗️ Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation with cart counter
│   └── Footer.jsx      # Site footer
├── pages/              # Page components
│   ├── Home.jsx        # Landing page with featured products
│   ├── Products.jsx    # Product catalog
│   ├── Cart.jsx        # Shopping cart
│   ├── Login.jsx       # Authentication
│   ├── Register.jsx    # User registration
│   └── ProductComparison.jsx
├── context/            # State management
│   ├── AuthContext.jsx # User authentication
│   ├── CartContext.jsx # Shopping cart state
│   └── ThemeContext.jsx # Dark/light theme
└── assets/            # Static files
```

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/ykjaat6104/OPIUMVERSE-E-Commerce-Platform.git
cd OpiumVerse

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Key Features Breakdown

### **Shopping Experience**
- ✅ Featured products on homepage with "Add to Cart" functionality
- ✅ Product categories with image previews
- ✅ Interactive product comparison table
- ✅ Real-time cart updates and management
- ✅ Customer review carousel with ratings

### **User Management**
- ✅ Secure authentication system
- ✅ User registration and login
- ✅ Profile management
- ✅ Session persistence

### **Design System**
- ✅ Dark/Light theme toggle
- ✅ Responsive mobile-first design
- ✅ Professional gradient color scheme
- ✅ Smooth animations and transitions
- ✅ Modern UI components

## 🌐 Live Demo

**Features to Test:**
- Browse products and categories
- Add items to cart from homepage
- Switch between dark/light themes
- Navigate through customer reviews
- Compare products side-by-side

## 📱 Responsive Design

- **Mobile**: Optimized touch interface
- **Tablet**: Perfect layout adaptation
- **Desktop**: Full-featured experience
- **All Devices**: Consistent performance

## 🔧 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run code linting
```

## 🎨 Color Palette

- **Primary**: Blue gradients (#1e40af to #06b6d4)
- **Accent**: Purple (#8b5cf6) and Cyan (#06b6d4)
- **Background**: Dynamic dark/light themes
- **Text**: High contrast for accessibility

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open Pull Request

## � License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for modern e-commerce | React + Vite + Tailwind CSS**