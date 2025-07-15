import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About OpiumVerse</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            OpiumVerse is your premier destination for luxury fashion and lifestyle products. 
            We believe in bringing you the finest curated collections that define elegance, 
            sophistication, and modern style.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Founded with a passion for exceptional quality and timeless design, we work with 
            renowned designers and brands to offer you exclusive pieces that make a statement.
          </p>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To provide our customers with an unparalleled shopping experience, featuring 
              carefully selected luxury items that embody quality, style, and exclusivity.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Quality and Craftsmanship</li>
              <li>Customer Satisfaction</li>
              <li>Sustainable Fashion</li>
              <li>Innovation and Style</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every product in our collection is carefully selected and tested to meet our high standards of quality and durability.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Global Shipping</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We deliver worldwide with fast and secure shipping options to bring luxury products directly to your doorstep.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Experience Luxury Today</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Join thousands of satisfied customers who trust OpiumVerse for their premium lifestyle needs.
            </p>
            <Link to="/products">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Explore Our Collection
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
