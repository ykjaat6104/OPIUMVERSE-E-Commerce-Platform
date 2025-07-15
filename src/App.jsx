import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './components/MainLayout';
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
import Login from './pages/Login';
import SellerLogin from './pages/SellerLogin';
import Register from './pages/Register';
import SellerRegister from './pages/SellerRegister';
import ForgotPassword from './pages/ForgotPassword';
import SellerForgotPassword from './pages/SellerForgotPassword';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
          <Routes>
            {/* All routes with main layout */}
            <Route path="/*" element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
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
                  <Route path="/login" element={<Login />} />
                  <Route path="/seller-login" element={<SellerLogin />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/seller-register" element={<SellerRegister />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/seller-forgot-password" element={<SellerForgotPassword />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
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
