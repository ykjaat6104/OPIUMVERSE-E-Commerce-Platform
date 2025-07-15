import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './components/MainLayout';
import LauncherScreen from './pages/LauncherScreen';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ProductCategory from './pages/ProductCategory';
import ProductComparison from './pages/ProductComparison';
import ProductReviews from './pages/ProductReviews';
import ProductWishlist from './pages/ProductWishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import ForgotPassword from './pages/ForgotPassword';
import SellerForgotPassword from './pages/SellerForgotPassword';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import CustomerSupport from './pages/CustomerSupport';
import AuthPage from './pages/AuthPage';

function App() {
  // Clear any previous launcher flags to ensure launcher shows on every refresh
  React.useEffect(() => {
    // Clear launcher-related sessionStorage on app load to ensure fresh start
    sessionStorage.removeItem('launcherTransition');
    sessionStorage.removeItem('hasSeenLauncher');
    
    // If user navigated directly to any route other than "/" on page load/refresh,
    // store their intended destination and redirect to launcher
    const currentPath = window.location.pathname;
    if (currentPath !== '/' && !sessionStorage.getItem('fromLauncher')) {
      sessionStorage.setItem('intendedDestination', currentPath + window.location.search);
      window.history.replaceState({}, '', '/');
    }
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
          <Routes>
            {/* Launcher Screen - default entry point */}
            <Route path="/" element={<LauncherScreen />} />
            
            {/* All routes with main layout */}
            <Route path="/*" element={
              <MainLayout>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/category/:category" element={<ProductCategory />} />
                  <Route path="/compare" element={<ProductComparison />} />
                  <Route path="/reviews/:productId" element={<ProductReviews />} />
                  <Route path="/wishlist" element={<ProductWishlist />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/checkout/success" element={<CheckoutSuccess />} />
                  
                  {/* Auth routes - redirect old routes to unified auth page */}
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/login" element={<Navigate to="/auth" replace />} />
                  <Route path="/register" element={<Navigate to="/auth" replace />} />
                  <Route path="/seller-login" element={<Navigate to="/auth" replace />} />
                  <Route path="/seller-register" element={<Navigate to="/auth" replace />} />
                  
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/seller-forgot-password" element={<SellerForgotPassword />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/support" element={<CustomerSupport />} />
                </Routes>
              </MainLayout>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
