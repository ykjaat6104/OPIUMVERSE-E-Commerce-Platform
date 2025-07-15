import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const ProductWishlist = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 1250,
      brand: 'AudioPro',
      inStock: true,
      dateAdded: '2024-01-15'
    },
    {
      id: 2,
      name: 'Smart Watch Series X',
      price: 449.99,
      originalPrice: 549.99,
      discount: 18,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      rating: 4.6,
      reviews: 890,
      brand: 'TechWear',
      inStock: true,
      dateAdded: '2024-01-12'
    },
    {
      id: 3,
      name: 'Wireless Gaming Mouse',
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 567,
      brand: 'GameTech',
      inStock: false,
      dateAdded: '2024-01-10'
    },
    {
      id: 4,
      name: 'USB-C Hub',
      price: 49.99,
      originalPrice: 69.99,
      discount: 29,
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=300&fit=crop',
      rating: 4.4,
      reviews: 342,
      brand: 'ConnectPro',
      inStock: true,
      dateAdded: '2024-01-08'
    },
    {
      id: 5,
      name: 'Bluetooth Speaker',
      price: 129.99,
      originalPrice: 179.99,
      discount: 28,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
      rating: 4.5,
      reviews: 789,
      brand: 'SoundMax',
      inStock: true,
      dateAdded: '2024-01-05'
    }
  ]);

  const [sortBy, setSortBy] = useState('newest');
  const [selectedItems, setSelectedItems] = useState([]);

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    setSelectedItems(prev => prev.filter(id => id !== productId));
  };

  const addToCart = (productId) => {
    // Add to cart logic here
    console.log(`Adding product ${productId} to cart`);
  };

  const toggleSelectItem = (productId) => {
    setSelectedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const selectAll = () => {
    setSelectedItems(wishlistItems.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const removeSelected = () => {
    setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const addSelectedToCart = () => {
    selectedItems.forEach(productId => addToCart(productId));
    setSelectedItems([]);
  };

  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default: // newest
        return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              My Wishlist
            </h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          
          {wishlistItems.length > 0 && (
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {wishlistItems.length > 0 && (
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 mb-6`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <button
                  onClick={selectedItems.length === wishlistItems.length ? clearSelection : selectAll}
                  className={`text-sm font-medium ${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'} transition-colors`}
                >
                  {selectedItems.length === wishlistItems.length ? 'Deselect All' : 'Select All'}
                </button>
                {selectedItems.length > 0 && (
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedItems.length} selected
                  </span>
                )}
              </div>
              
              {selectedItems.length > 0 && (
                <div className="flex space-x-2">
                  <button
                    onClick={addSelectedToCart}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Add Selected to Cart
                  </button>
                  <button
                    onClick={removeSelected}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Remove Selected
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Wishlist Items */}
        {wishlistItems.length > 0 ? (
          <div className="space-y-4">
            {sortedItems.map((item) => (
              <div 
                key={item.id} 
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg`}
              >
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <div className="flex items-center pt-2">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                    />
                  </div>

                  {/* Product Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg cursor-pointer"
                      onClick={() => navigate(`/product/${item.id}`)}
                    />
                    {item.discount && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        -{item.discount}%
                      </div>
                    )}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                        <span className="text-white text-sm font-medium">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <div className="flex-1">
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide mb-1`}>
                          {item.brand}
                        </div>
                        <h3 
                          className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold text-lg cursor-pointer hover:text-indigo-600 transition-colors`}
                          onClick={() => navigate(`/product/${item.id}`)}
                        >
                          {item.name}
                        </h3>
                        
                        {/* Rating */}
                        <div className="flex items-center mt-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {item.rating} ({item.reviews} reviews)
                          </span>
                        </div>

                        {/* Date Added */}
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
                          Added {formatDate(item.dateAdded)}
                        </p>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex flex-col items-end space-y-3 mt-4 sm:mt-0">
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              ${item.price}
                            </span>
                            {item.originalPrice && (
                              <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} line-through`}>
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>
                          {item.discount && (
                            <p className="text-sm text-green-600 font-medium">
                              Save ${(item.originalPrice - item.price).toFixed(2)}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={() => addToCart(item.id)}
                            disabled={!item.inStock}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              item.inStock
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className={`px-4 py-2 rounded-lg font-medium border transition-colors ${
                              isDarkMode 
                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className={`text-6xl ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`}>
              💝
            </div>
            <h3 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              Your wishlist is empty
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-8 max-w-md mx-auto`}>
              Save items you love to your wishlist. Review them anytime and easily move them to your cart.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* Share Wishlist */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 text-center">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Share Your Wishlist
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                Let your friends and family know what you'd love to receive
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  <span>Share on Twitter</span>
                </button>
                <button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Share on Facebook</span>
                </button>
                <button className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductWishlist;
