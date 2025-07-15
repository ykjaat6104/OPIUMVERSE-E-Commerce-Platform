import React, { useState, useContext, useRef, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const CustomerSupport = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm OpiumBot, your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const messagesEndRef = useRef(null);

  const supportCategories = [
    { id: 'general', name: 'General Help', icon: '❓' },
    { id: 'orders', name: 'Orders & Shipping', icon: '📦' },
    { id: 'payments', name: 'Payments & Billing', icon: '💳' },
    { id: 'returns', name: 'Returns & Refunds', icon: '↩️' },
    { id: 'account', name: 'Account Issues', icon: '👤' },
    { id: 'technical', name: 'Technical Support', icon: '🔧' }
  ];

  const quickActions = [
    'Track my order',
    'Return an item',
    'Payment issues',
    'Account problems',
    'Product information',
    'Shipping options'
  ];

  const faqData = {
    general: [
      { q: "What is OpiumVerse?", a: "OpiumVerse is a premium e-commerce platform offering a wide range of products with cutting-edge technology and excellent customer service." },
      { q: "How do I create an account?", a: "Click on the 'Sign Up' button on the homepage and follow the registration process. You can create either a customer or seller account." }
    ],
    orders: [
      { q: "How can I track my order?", a: "You can track your order by logging into your account and visiting the 'My Orders' section, or use the tracking number sent to your email." },
      { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days." }
    ],
    payments: [
      { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and bank transfers." },
      { q: "Is my payment information secure?", a: "Yes, we use industry-standard encryption and secure payment processors to protect your information." }
    ],
    returns: [
      { q: "What is your return policy?", a: "We offer a 30-day return policy for most items. Items must be in original condition with tags attached." },
      { q: "How do I return an item?", a: "Go to 'My Orders', select the item you want to return, and follow the return process. We'll provide a prepaid return label." }
    ],
    account: [
      { q: "I forgot my password", a: "Click on 'Forgot Password' on the login page and follow the instructions to reset your password." },
      { q: "How do I update my profile?", a: "Log into your account and go to 'Profile Settings' to update your personal information." }
    ],
    technical: [
      { q: "The website is not loading properly", a: "Try clearing your browser cache and cookies, or try accessing the site from a different browser." },
      { q: "I'm having trouble placing an order", a: "Ensure your browser accepts cookies and JavaScript is enabled. If issues persist, try using a different browser." }
    ]
  };

  // AI Bot Response Logic
  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Order tracking responses
    if (message.includes('track') || message.includes('order') || message.includes('shipping')) {
      return "To track your order, please log into your account and go to 'My Orders' section. You can also use the tracking number sent to your email. If you need immediate assistance, please provide your order number.";
    }
    
    // Payment related responses
    if (message.includes('payment') || message.includes('billing') || message.includes('card') || message.includes('money')) {
      return "For payment issues, please check that your card information is correct and has sufficient funds. We accept all major credit cards, PayPal, and digital wallets. If you're still having trouble, I can connect you with our billing specialist.";
    }
    
    // Return/refund responses
    if (message.includes('return') || message.includes('refund') || message.includes('exchange')) {
      return "Our return policy allows returns within 30 days of purchase. Items must be in original condition. To start a return, go to 'My Orders' and select the item you want to return. Would you like me to guide you through the process?";
    }
    
    // Account related responses
    if (message.includes('account') || message.includes('login') || message.includes('password') || message.includes('profile')) {
      return "For account issues, try clearing your browser cache first. If you forgot your password, use the 'Forgot Password' link on the login page. For profile updates, go to 'Account Settings' after logging in.";
    }
    
    // Product related responses
    if (message.includes('product') || message.includes('item') || message.includes('availability') || message.includes('stock')) {
      return "For product information, you can search our catalog or browse by categories. If a product is out of stock, you can set up notifications to be alerted when it's back. Do you need help finding a specific product?";
    }
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm here to help you with any questions about OpiumVerse. You can ask me about orders, payments, returns, account issues, or general information. What would you like to know?";
    }
    
    // Contact/human agent responses
    if (message.includes('human') || message.includes('agent') || message.includes('representative') || message.includes('contact')) {
      return "I can connect you with a human agent if needed. Our support team is available 24/7. You can also reach us at support@opiumverse.com or call 1-800-OPIUM-HELP. Would you like me to transfer you to a live agent?";
    }
    
    // Default response
    return "I understand you need help with that. Could you please provide more specific details about your issue? You can also browse our FAQ section below or contact our human support team for personalized assistance.";
  };

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateBotResponse(message),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      {/* Header */}
      <div className={`border-b transition-colors duration-300 ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'
      } backdrop-blur-sm sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className={`text-4xl font-bold mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Customer Support
            </h1>
            <p className={`text-lg transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Get instant help with our AI assistant or browse our help resources
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Support Categories */}
          <div className={`lg:col-span-1 p-6 rounded-2xl transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/50 border border-gray-700' 
              : 'bg-white/70 border border-gray-200'
          } backdrop-blur-sm h-fit`}>
            <h2 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Support Categories
            </h2>
            <div className="space-y-2">
              {supportCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                    selectedCategory === category.id
                      ? isDarkMode
                        ? 'bg-blue-600/20 border border-blue-500/30 text-blue-400'
                        : 'bg-indigo-50 border border-indigo-200 text-indigo-700'
                      : isDarkMode
                        ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className={`w-full text-left p-2 rounded-lg text-sm transition-all duration-300 ${
                      isDarkMode
                        ? 'hover:bg-gray-700/50 text-gray-400 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Chatbot */}
          <div className={`lg:col-span-2 rounded-2xl transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/50 border border-gray-700' 
              : 'bg-white/70 border border-gray-200'
          } backdrop-blur-sm flex flex-col h-[600px]`}>
            {/* Chat Header */}
            <div className={`p-4 border-b transition-colors duration-300 ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            } rounded-t-2xl`}>
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600'
                    : 'bg-gradient-to-br from-cyan-500 to-blue-500'
                }`}>
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className={`font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    OpiumBot AI Assistant
                  </h3>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Online • Instant responses
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl transition-all duration-300 ${
                    message.sender === 'user'
                      ? isDarkMode
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-200'
                        : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 opacity-70`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className={`px-4 py-2 rounded-2xl transition-all duration-300 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <div className="flex space-x-1">
                      <div className={`w-2 h-2 rounded-full animate-bounce transition-colors duration-300 ${
                        isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                      }`} style={{ animationDelay: '0ms' }}></div>
                      <div className={`w-2 h-2 rounded-full animate-bounce transition-colors duration-300 ${
                        isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                      }`} style={{ animationDelay: '150ms' }}></div>
                      <div className={`w-2 h-2 rounded-full animate-bounce transition-colors duration-300 ${
                        isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                      }`} style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className={`p-4 border-t transition-colors duration-300 ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className={`flex-1 px-4 py-2 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-offset-gray-800' 
                      : 'border-gray-300 bg-white/50 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500/20 focus:ring-offset-white'
                  } backdrop-blur-sm`}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white focus:ring-blue-500/50 focus:ring-offset-gray-800 disabled:opacity-50'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white focus:ring-cyan-500/50 focus:ring-offset-white disabled:opacity-50'
                  } ${!isTyping && inputMessage.trim() ? 'hover:scale-105 active:scale-95' : ''}`}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={`mt-12 p-6 rounded-2xl transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800/50 border border-gray-700' 
            : 'bg-white/70 border border-gray-200'
        } backdrop-blur-sm`}>
          <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqData[selectedCategory]?.map((faq, index) => (
              <div key={index} className={`p-4 rounded-lg transition-all duration-300 ${
                isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'
              }`}>
                <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {faq.q}
                </h3>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className={`mt-8 p-6 rounded-2xl transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800/50 border border-gray-700' 
            : 'bg-white/70 border border-gray-200'
        } backdrop-blur-sm`}>
          <h2 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Need More Help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600'
                  : 'bg-gradient-to-br from-cyan-500 to-blue-500'
              }`}>
                <span className="text-white text-xl">📧</span>
              </div>
              <h3 className={`font-semibold mb-1 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Email Support
              </h3>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                support@opiumverse.com
              </p>
            </div>
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600'
                  : 'bg-gradient-to-br from-cyan-500 to-blue-500'
              }`}>
                <span className="text-white text-xl">📞</span>
              </div>
              <h3 className={`font-semibold mb-1 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Phone Support
              </h3>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                1-800-OPIUM-HELP
              </p>
            </div>
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600'
                  : 'bg-gradient-to-br from-cyan-500 to-blue-500'
              }`}>
                <span className="text-white text-xl">💬</span>
              </div>
              <h3 className={`font-semibold mb-1 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Live Chat
              </h3>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Available 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
