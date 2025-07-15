import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext';

const Home = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const { isDarkMode } = useContext(ThemeContext);
  const { addToCart } = useContext(CartContext);

  const customerReviews = [
    {
      name: "Sarah Johnson",
      role: "Tech Professional",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b8c8?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "These wireless headphones are absolutely amazing! Crystal clear sound, perfect noise cancellation, and the battery life is incredible. Best purchase ever!",
      product: "Premium Wireless Headphones"
    },
    {
      name: "Michael Chen",
      role: "Tech Enthusiast",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "The smart watch exceeded my expectations! Health tracking is accurate, battery lasts days, and the design is premium. Worth every penny!",
      product: "Smart Watch Series X"
    },
    {
      name: "Emily Rodriguez",
      role: "Fashion Enthusiast",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "The luxury leather wallet is simply perfect! RFID protection, premium quality leather, and elegant design. Highly recommended!",
      product: "Luxury Leather Wallet"
    },
    {
      name: "David Kim",
      role: "Photographer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "Professional camera quality is outstanding! Sharp images, excellent low-light performance, perfect for my photography business.",
      product: "Professional Camera"
    },
    {
      name: "Lisa Thompson",
      role: "Fitness Trainer",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      review: "The wireless speaker is perfect for outdoor workouts! Waterproof design, amazing sound quality, and 360° audio coverage.",
      product: "Wireless Speaker"
    },
    {
      name: "Amanda Foster",
      role: "Gamer",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "The gaming keyboard is a game-changer! Mechanical switches feel amazing, RGB lighting is stunning, and it's built to last.",
      product: "Gaming Mechanical Keyboard"
    },
    {
      name: "Robert Wilson",
      role: "Digital Nomad",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "Portable power bank is a lifesaver! 20000mAh capacity, fast charging, and compact design. Perfect for travel and emergencies.",
      product: "Portable Power Bank"
    },
    {
      name: "Jessica Martinez",
      role: "Style Influencer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      review: "Designer sunglasses are absolutely gorgeous! UV protection is excellent, comfortable fit, and they match everything I wear.",
      product: "Designer Sunglasses"
    },
    {
      name: "Carlos Rodriguez",
      role: "Smart Home Expert",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "Smart home hub works flawlessly! Easy setup, connects all my devices perfectly, and the app interface is intuitive.",
      product: "Smart Home Hub"
    },
    {
      name: "Rachel Green",
      role: "Remote Worker",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      review: "Wireless charging pad is so convenient! Fast charging, sleek design, and works perfectly with my phone case on.",
      product: "Wireless Charging Pad"
    },
    {
      name: "Kevin Park",
      role: "Audio Engineer",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      review: "Bluetooth earbuds deliver studio-quality sound! Perfect fit, excellent noise cancellation, and impressive battery life.",
      product: "Bluetooth Earbuds"
    },
    {
      name: "Sophie Laurent",
      role: "Work from Home Professional",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      review: "Laptop stand improved my posture significantly! Adjustable aluminum build, sturdy design, perfect for ergonomics.",
      product: "Laptop Stand"
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % customerReviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + customerReviews.length) % customerReviews.length);
  };
  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop',
      description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
      rating: 4.8,
      category: 'Audio'
    },
    {
      id: 2,
      name: 'Smart Watch Series X',
      price: 449.99,
      originalPrice: 549.99,
      discount: 18,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=400&fit=crop',
      description: 'Advanced smartwatch with health tracking, GPS, and premium design.',
      rating: 4.6,
      category: 'Electronics'
    },
    {
      id: 3,
      name: 'Luxury Leather Wallet',
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      image: 'https://plus.unsplash.com/premium_photo-1676999224991-8f3d35dbde54?w=600&auto=format&fit=crop',
      description: 'Handcrafted genuine leather wallet with RFID protection and multiple compartments.',
      rating: 4.7,
      category: 'Accessories'
    },
    {
      id: 4,
      name: 'Professional Camera',
      price: 1299.99,
      originalPrice: 1599.99,
      discount: 19,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=400&fit=crop',
      description: 'Professional DSLR camera with advanced features for photography enthusiasts.',
      rating: 4.9,
      category: 'Electronics'
    },
    {
      id: 21,
      name: 'Gaming Headset',
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      image: 'https://plus.unsplash.com/premium_photo-1679177184017-7777cdbb2ba5?w=600&auto=format&fit=crop',
      description: 'Professional gaming headset with surround sound',
      rating: 4.7,
      category: 'Gaming'
    },
    {
      id: 13,
      name: 'Smart LED Bulb',
      price: 24.99,
      originalPrice: 34.99,
      discount: 29,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop',
      description: 'Color-changing smart LED bulb with app control',
      rating: 4.4,
      category: 'Lighting'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className={`relative py-20 lg:py-32 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white'
          : 'bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white'
      }`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-medium mb-6">
            Welcome to <span className={`${
              isDarkMode ? 'text-purple-300' : 'text-cyan-200'
            }`}>OpiumVerse</span>
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-200' : 'text-gray-100'
          }`}>
            Discover premium products with royal quality and sophisticated design
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <button className={`px-8 py-4 rounded-lg font-medium text-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                  : 'bg-gradient-to-r from-blue-600 to-sky-400 text-white hover:from-blue-700 hover:to-sky-500'
              }`}>
                Shop Now
              </button>
            </Link>
            <Link to="/about">
              <button className={`border-2 px-8 py-4 rounded-lg font-medium text-lg transition-all duration-200 transform hover:scale-105 ${
                isDarkMode
                  ? 'border-purple-400 text-purple-300 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-600/20 hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-blue-600'
              }`}>
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Explore our premium collection across all categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Electronics",
                image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=200&fit=crop",
                count: "12+ Products"
              },
              {
                name: "Accessories",
                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
                count: "8+ Products"
              },
              {
                name: "Audio",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
                count: "6+ Products"
              },
              {
                name: "Lighting",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
                count: "4+ Products"
              },
              {
                name: "Storage",
                image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=200&fit=crop",
                count: "3+ Products"
              },
              {
                name: "Gaming",
                image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop",
                count: "5+ Products"
              }
            ].map((category, index) => (
              <Link key={index} to={`/products?category=${category.name.toLowerCase()}`}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 mb-4">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-center mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Collection</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover our most exclusive and sought-after items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                {/* Discount Badge */}
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                    -{product.discount}%
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{product.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through">${product.originalPrice}</span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">Save ${product.originalPrice - product.price}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-gray-600 dark:text-gray-300 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className={`w-full py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                      : 'bg-gradient-to-r from-blue-600 to-sky-400 text-white hover:from-blue-700 hover:to-sky-500'
                  }`}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <button className={`px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                  : 'bg-gradient-to-r from-blue-600 to-sky-400 text-white hover:from-blue-700 hover:to-sky-500'
              }`}>
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose OpiumVerse - Enhanced E-commerce Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose OpiumVerse?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience premium e-commerce with unmatched quality and service excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                description: "Free delivery on orders over $100 with lightning-fast processing"
              },
              {
                icon: "🔒",
                title: "Secure Payment",
                description: "Bank-level encryption and multiple payment options for your safety"
              },
              {
                icon: "↩️",
                title: "Easy Returns",
                description: "30-day hassle-free returns with full money-back guarantee"
              },
              {
                icon: "⭐",
                title: "Premium Quality",
                description: "Hand-picked products with rigorous quality control standards"
              },
              {
                icon: "📞",
                title: "24/7 Support",
                description: "Round-the-clock customer service from our expert team"
              },
              {
                icon: "💎",
                title: "Exclusive Deals",
                description: "Member-only discounts and early access to new arrivals"
              },
              {
                icon: "🌱",
                title: "Eco-Friendly",
                description: "Sustainable packaging and environmentally conscious products"
              },
              {
                icon: "⚡",
                title: "Fast Checkout",
                description: "One-click purchasing with saved preferences and auto-fill"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section - Carousel */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real experiences from our valued community members
            </p>
          </div>

          {/* Review Carousel */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg mx-auto max-w-2xl">
              <div className="flex items-center mb-6">
                <img 
                  src={customerReviews[currentReview].image} 
                  alt={customerReviews[currentReview].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{customerReviews[currentReview].name}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{customerReviews[currentReview].role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(customerReviews[currentReview].rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-4 italic">"{customerReviews[currentReview].review}"</p>
              
              <div className="text-blue-600 dark:text-blue-400 font-medium">
                Verified Purchase: {customerReviews[currentReview].product}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevReview}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                  : 'bg-gradient-to-r from-blue-600 to-sky-400 text-white hover:from-blue-700 hover:to-sky-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextReview}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                  : 'bg-gradient-to-r from-blue-600 to-sky-400 text-white hover:from-blue-700 hover:to-sky-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {customerReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 transform hover:scale-125 ${
                  index === currentReview 
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                      : 'bg-gradient-to-r from-blue-600 to-sky-400'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the <span className="text-cyan-300">Elite Experience</span>
          </h2>
          <p className="text-xl text-gray-100 mb-6">
            Become part of an exclusive community that values quality, sophistication, and premium craftsmanship
          </p>
          
          {/* Customer Stats */}
          <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-300 mb-1">25,000+</div>
                <div className="text-sm text-gray-200">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-300 mb-1">4.9/5</div>
                <div className="text-sm text-gray-200">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-300 mb-1">50+</div>
                <div className="text-sm text-gray-200">Countries Served</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <button className={`px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
              }`}>
                Start Your Journey
              </button>
            </Link>
            <Link to="/contact">
              <button className={`border-2 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                isDarkMode
                  ? 'border-purple-400 text-purple-300 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-600/20 hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-purple-600'
              }`}>
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
