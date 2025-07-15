import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const { isDarkMode } = useContext(ThemeContext);
  const { addToCart, isInCart } = useCart();

  const categories = ['all', 'electronics', 'accessories', 'audio', 'lighting', 'storage', 'gaming', 'environmental'];

  const products = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      category: 'audio',
      description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
      rating: 4.8,
      reviews: 150
    },
    {
      id: 2,
      name: 'Smart Watch Series X',
      price: 449.99,
      originalPrice: 549.99,
      discount: 18,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      category: 'electronics',
      description: 'Advanced smartwatch with health tracking, GPS, and premium design.',
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      name: 'Luxury Leather Wallet',
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      image: 'https://plus.unsplash.com/premium_photo-1676999224991-8f3d35dbde54?w=600&auto=format&fit=crop',
      category: 'accessories',
      description: 'Handcrafted genuine leather wallet with RFID protection and multiple compartments.',
      rating: 4.7,
      reviews: 234
    },
    {
      id: 4,
      name: 'Professional Camera',
      price: 1299.99,
      originalPrice: 1599.99,
      discount: 19,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
      category: 'electronics',
      description: 'Professional DSLR camera with advanced features for photography enthusiasts.',
      rating: 4.9,
      reviews: 67
    },
    {
      id: 5,
      name: 'Wireless Speaker',
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
      category: 'audio',
      description: 'Waterproof portable speaker with 360° sound',
      rating: 4.5,
      reviews: 178
    },
    {
      id: 6,
      name: 'Gaming Mechanical Keyboard',
      price: 159.99,
      originalPrice: 199.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
      category: 'gaming',
      description: 'RGB mechanical gaming keyboard with premium switches',
      rating: 4.6,
      reviews: 92
    },
    {
      id: 7,
      name: 'Portable Power Bank',
      price: 49.99,
      originalPrice: 69.99,
      discount: 29,
      image: 'https://images.unsplash.com/photo-1600577231598-31ea4cb50da3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG93ZXIlMjBiYW5rfGVufDB8fDB8fHww',
      category: 'electronics',
      description: 'High-capacity 20000mAh power bank with fast charging',
      rating: 4.4,
      reviews: 145
    },
    {
      id: 8,
      name: 'Designer Sunglasses',
      price: 189.99,
      originalPrice: 249.99,
      discount: 24,
      image: 'https://images.unsplash.com/photo-1722842529466-3c00784630a5?w=600&auto=format&fit=crop&q=60',
      category: 'accessories',
      description: 'Premium designer sunglasses with UV protection',
      rating: 4.3,
      reviews: 76
    },
    {
      id: 9,
      name: 'Smart Home Hub',
      price: 129.99,
      originalPrice: 169.99,
      discount: 24,
      image: 'https://media.istockphoto.com/id/1214098172/photo/smart-home-hub-for-home-automation-on-wooden-desktop-with-copyspace.webp?a=1&b=1&s=612x612&w=0&k=20&c=XkA-ETZty0LU6OowQFWxnTdHKb_3Hqo4FCP2mbIOET8=',
      category: 'electronics',
      description: 'Central control hub for all your smart home devices',
      rating: 4.5,
      reviews: 113
    },
    {
      id: 10,
      name: 'Wireless Charging Pad',
      price: 39.99,
      originalPrice: 59.99,
      discount: 33,
      image: 'https://media.istockphoto.com/id/1215029140/photo/modern-smart-phone-wireless-charging-on-carbon-fibre-surface.webp?a=1&b=1&s=612x612&w=0&k=20&c=cuUdZEj6-gJE36T2gNRykV638T83HCXL_Ah0VSyTQBc=',
      category: 'electronics',
      description: 'Fast wireless charging pad compatible with all devices',
      rating: 4.2,
      reviews: 88
    },
    {
      id: 11,
      name: 'Bluetooth Earbuds',
      price: 129.99,
      originalPrice: 179.99,
      discount: 28,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
      category: 'audio',
      description: 'True wireless earbuds with premium sound quality',
      rating: 4.6,
      reviews: 203
    },
    {
      id: 12,
      name: 'Laptop Stand',
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1623251609314-97cc1f84e3ed?w=600&auto=format&fit=crop',
      category: 'accessories',
      description: 'Adjustable aluminum laptop stand for better ergonomics',
      rating: 4.7,
      reviews: 156
    },
    {
      id: 13,
      name: 'Smart LED Bulb',
      price: 24.99,
      originalPrice: 34.99,
      discount: 29,
      image: 'https://media.istockphoto.com/id/510784830/photo/led-technology.webp?a=1&b=1&s=612x612&w=0&k=20&c=QIHehbNqn-9UhJkHqDVj22VbBeTlTbRZNHx7bJjZpAA=',
      category: 'lighting',
      description: 'Color-changing smart LED bulb with app control',
      rating: 4.4,
      reviews: 89
    },
    {
      id: 14,
      name: 'External Hard Drive',
      price: 119.99,
      originalPrice: 149.99,
      discount: 20,
      image: 'https://plus.unsplash.com/premium_photo-1726869660745-9f60cdf6588b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXh0ZXJuYWwlMjBoYXJkJTIwZHJpdmV8ZW58MHx8MHx8fDA%3D',
      category: 'storage',
      description: '2TB portable external hard drive with USB 3.0',
      rating: 4.5,
      reviews: 167
    },
    {
      id: 15,
      name: 'Gaming Mouse',
      price: 69.99,
      originalPrice: 89.99,
      discount: 22,
      image: 'https://images.unsplash.com/photo-1697256936487-34c35c4ededa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGdhbWluZyUyMHJnYiUyMG1vdXNlfGVufDB8fDB8fHww',
      category: 'gaming',
      description: 'Precision gaming mouse with customizable RGB lighting',
      rating: 4.6,
      reviews: 134
    },
    {
      id: 16,
      name: 'Wireless Router',
      price: 149.99,
      originalPrice: 199.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1681383064412-171e5bee5f6e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2lyZWxlc3MlMjByb3V0ZXJ8ZW58MHx8MHx8fDA%3D',
      category: 'electronics',
      description: 'High-speed Wi-Fi 6 router with advanced security features',
      rating: 4.3,
      reviews: 78
    },
    {
      id: 17,
      name: 'Phone Case',
      price: 29.99,
      originalPrice: 39.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=300&fit=crop',
      category: 'accessories',
      description: 'Premium protective phone case with wireless charging support',
      rating: 4.4,
      reviews: 256
    },
    {
      id: 18,
      name: 'Desktop Speakers',
      price: 89.99,
      originalPrice: 119.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
      category: 'audio',
      description: 'High-quality desktop speakers with rich bass',
      rating: 4.5,
      reviews: 112
    },
    {
      id: 19,
      name: 'LED Desk Lamp',
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1621177555452-bedbe4c28879?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGVzayUyMGxhbXB8ZW58MHx8MHx8fDA%3D',
      category: 'lighting',
      description: 'Adjustable LED desk lamp with multiple brightness levels',
      rating: 4.6,
      reviews: 93
    },
    {
      id: 20,
      name: 'USB Flash Drive',
      price: 19.99,
      originalPrice: 29.99,
      discount: 33,
      image: 'https://images.unsplash.com/photo-1740060217613-a17198996949?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNiJTIwZmxhc2glMjBkcml2ZXxlbnwwfHwwfHx8MA%3D%3D',
      category: 'storage',
      description: '128GB high-speed USB 3.0 flash drive',
      rating: 4.3,
      reviews: 189
    },
    {
      id: 21,
      name: 'Gaming Headset',
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      image: 'https://plus.unsplash.com/premium_photo-1679177184017-7777cdbb2ba5?w=600&auto=format&fit=crop',
      category: 'gaming',
      description: 'Professional gaming headset with surround sound',
      rating: 4.7,
      reviews: 145
    },
    {
      id: 22,
      name: 'Smart Light Strip',
      price: 34.99,
      originalPrice: 49.99,
      discount: 30,
      image: 'https://images.unsplash.com/photo-1735474477564-a4ebaaec87ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxlZCUyMHN0cmlwfGVufDB8fDB8fHww',
      category: 'lighting',
      description: '16.4ft RGB LED light strip with app control',
      rating: 4.4,
      reviews: 167
    },
    {
      id: 23,
      name: 'Portable SSD',
      price: 159.99,
      originalPrice: 199.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1721333084639-0f64b0583875?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3NkJTIwcG9ydGFibGV8ZW58MHx8MHx8fDA%3D',
      category: 'storage',
      description: '1TB portable SSD with ultra-fast transfer speeds',
      rating: 4.8,
      reviews: 98
    },
    {
      id: 24,
      name: 'Gaming Controller',
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop',
      category: 'gaming',
      description: 'Wireless gaming controller with precision controls',
      rating: 4.6,
      reviews: 201
    },
    // Additional Electronics Products
    {
      id: 25,
      name: 'Tablet Pro 12.9"',
      price: 899.99,
      originalPrice: 1099.99,
      discount: 18,
      image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=300&fit=crop',
      category: 'electronics',
      description: 'Professional tablet with Apple Pencil support and high-resolution display',
      rating: 4.7,
      reviews: 156
    },
    {
      id: 26,
      name: 'Drone 4K Camera',
      price: 599.99,
      originalPrice: 799.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400&h=300&fit=crop',
      category: 'electronics',
      description: '4K camera drone with GPS and obstacle avoidance',
      rating: 4.5,
      reviews: 89
    },
    {
      id: 27,
      name: 'Smart TV 55"',
      price: 649.99,
      originalPrice: 899.99,
      discount: 28,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
      category: 'electronics',
      description: '55-inch 4K Smart TV with HDR and streaming apps',
      rating: 4.6,
      reviews: 234
    },
    {
      id: 28,
      name: 'Fitness Tracker',
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop',
      category: 'electronics',
      description: 'Advanced fitness tracker with heart rate and sleep monitoring',
      rating: 4.4,
      reviews: 312
    },
    {
      id: 29,
      name: 'Wireless Earphones',
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1662348316397-7afeb1045fd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5jJTIwYnVkc3xlbnwwfHwwfHx8MA%3D%3D',
      category: 'electronics',
      description: 'True wireless earphones with active noise cancellation',
      rating: 4.3,
      reviews: 187
    },
    // Additional Accessories Products
    {
      id: 30,
      name: 'Leather Messenger Bag',
      price: 149.99,
      originalPrice: 199.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      category: 'accessories',
      description: 'Vintage leather messenger bag with laptop compartment',
      rating: 4.7,
      reviews: 145
    },
    {
      id: 31,
      name: 'Stainless Steel Watch',
      price: 249.99,
      originalPrice: 349.99,
      discount: 29,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop',
      category: 'accessories',
      description: 'Premium stainless steel watch with sapphire crystal',
      rating: 4.8,
      reviews: 98
    },
    {
      id: 32,
      name: 'Silk Scarf Collection',
      price: 89.99,
      originalPrice: 119.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1657485455514-47d4287c1c0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2lsayUyMHNjYXJmJTIwY29sbGVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
      category: 'accessories',
      description: 'Luxurious silk scarf in multiple color options',
      rating: 4.5,
      reviews: 67
    },
    {
      id: 33,
      name: 'Carbon Fiber Belt',
      price: 69.99,
      originalPrice: 89.99,
      discount: 22,
      image: 'https://media.istockphoto.com/id/1663131123/photo/rolled-fashionable-black-belt-with-engraving-space.webp?a=1&b=1&s=612x612&w=0&k=20&c=sphI_ticc74DSI9KuG4Xqqx9nV83kOvnuB_VfIacnrE=',
      category: 'accessories',
      description: 'Lightweight carbon fiber belt with automatic buckle',
      rating: 4.4,
      reviews: 123
    },
    {
        id: 34,
      name: 'Ceramic Jewelry Set',
      price: 199.99,
      originalPrice: 279.99,
      discount: 29,
      image: 'https://images.unsplash.com/photo-1745541472976-54b48c4813cb?w=600&auto=format&fit=crop',
      category: 'accessories',
      description: 'Elegant ceramic jewelry set with necklace and earrings',
      rating: 4.6,
      reviews: 89
    },
    // Additional Audio Products
    {
      id: 35,
      name: 'Studio Monitor Speakers',
      price: 399.99,
      originalPrice: 499.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1601120289684-658fb970fe6e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJpZyUyMHNwZWFrZXJzfGVufDB8fDB8fHww',
      category: 'audio',
      description: 'Professional studio monitor speakers with accurate sound reproduction',
      rating: 4.8,
      reviews: 76
    },
    {
      id: 36,
      name: 'Vinyl Record Player',
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      image: 'https://plus.unsplash.com/premium_photo-1687533705440-afd9b293ace7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmlueWwlMjByZWNvcmQlMjBwbGF5ZXJ8ZW58MHx8MHx8fDA%3D',
      category: 'audio',
      description: 'Vintage-style vinyl record player with modern features',
      rating: 4.7,
      reviews: 134
    },
    {
      id: 37, 
      name: 'Sound Bar 5.1',
      price: 249.99,
      originalPrice: 329.99,
      discount: 24,
      image: 'https://images.unsplash.com/photo-1604914416956-38b08c516877?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c291bmRiYXJ8ZW58MHx8MHx8fDA%3D',
      category: 'audio',
      description: '5.1 channel sound bar with wireless subwoofer',
      rating: 4.5,
      reviews: 198
    },
    {
      id: 38,
      name: 'Podcast Microphone',
      price: 149.99,
      originalPrice: 199.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&h=300&fit=crop',
      category: 'audio',
      description: 'Professional podcast microphone with USB connectivity',
      rating: 4.6,
      reviews: 156
    },
    {
      id: 39,
      name: 'Audio Interface',
      price: 199.99,
      originalPrice: 259.99,
      discount: 23,
      image: 'https://images.unsplash.com/photo-1634041322763-61fc86332d5e?w=600&auto=format&fit=crop',
      category: 'audio',
      description: '2-channel audio interface for home recording',
      rating: 4.4,
      reviews: 87
    },
    // Additional Gaming Products
    {
      id: 40,
      name: 'Gaming Monitor 27"',
      price: 349.99,
      originalPrice: 449.99,
      discount: 22,
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop',
      category: 'gaming',
      description: '27-inch 144Hz gaming monitor with 1ms response time',
      rating: 4.7,
      reviews: 189
    },
    {
      id: 41,
      name: 'Gaming Mobile',
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      category: 'gaming',
      description: 'Experience ultra-smooth gameplay with the powerful processor and high refresh rate display of this gaming mobile. Engineered for performance, it features advanced cooling and long-lasting battery life for uninterrupted action',
      rating: 4.6,
      reviews: 234
    },
    {
      id: 42,
      name: 'Mechanical Gaming Keyboard RGB',
      price: 129.99,
      originalPrice: 169.99,
      discount: 24,
      image: 'https://media.istockphoto.com/id/1319228231/photo/black-computer-keyboard-with-rgb-color-isolated-on-black-with-clipping-path.webp?a=1&b=1&s=612x612&w=0&k=20&c=YMzLVq_T_xSequzbB3F9uFPFYCVNe2mFZxO0D889lM8=',
      category: 'gaming',
      description: 'Full-size mechanical gaming keyboard with customizable RGB',
      rating: 4.5,
      reviews: 167
    },
    {
      id: 43,
      name: 'Gaming Desk',
      price: 199.99,
      originalPrice: 269.99,
      discount: 26,
      image: 'https://images.unsplash.com/photo-1674968283640-979828cea353?w=600&auto=format&fit=crop',
      category: 'gaming',
      description: 'Large gaming desk with cable management and RGB strips',
      rating: 4.4,
      reviews: 145
    },
    {
      id: 44,
      name: 'VR Headset',
      price: 399.99,
      originalPrice: 499.99,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&h=300&fit=crop',
      category: 'gaming',
      description: 'Standalone VR headset with 90Hz display and hand tracking',
      rating: 4.7,
      reviews: 98
    },
    // Additional Lighting Products
    {
      id: 45,
      name: 'Smart Ceiling Light',
      price: 89.99,
      originalPrice: 119.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1589492766501-6c1e4b91e90d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNlaWxpbmclMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D',
      category: 'lighting',
      description: 'Smart ceiling light with dimming and color temperature control',
      rating: 4.5,
      reviews: 123
    },
    {
      id: 46,
      name: 'Floor Lamp Modern',
      price: 149.99,
      originalPrice: 199.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
      category: 'lighting',
      description: 'Modern floor lamp with adjustable brightness and USB charging',
      rating: 4.6,
      reviews: 87
    },
    {
      id: 47,
      name: 'Pendant Light Set',
      price: 199.99,
      originalPrice: 259.99,
      discount: 23,
      image: 'https://media.istockphoto.com/id/1300486308/photo/light-bulbs-hanging-from-ceiling.webp?a=1&b=1&s=612x612&w=0&k=20&c=1Ha-l1v5I11SeTWSER-Llm07kk1E7YD2-uEkfF1c-uo=',
      category: 'lighting',
      description: 'Set of 3 pendant lights with adjustable height',
      rating: 4.4,
      reviews: 76
    },
    {
      id: 48,
      name: 'Outdoor Solar Lights',
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      image: 'data:image/jpeg;base64,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',
      category: 'lighting',
      description: 'Solar-powered outdoor lights with motion sensor',
      rating: 4.3,
      reviews: 156
    },
    // Additional Storage Products
    {
      id: 49,
      name: 'NAS Storage Server',
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      image: 'https://plus.unsplash.com/premium_photo-1661386257356-c17257862be8?w=600&auto=format&fit=crop',
      category: 'storage',
      description: '2-bay NAS storage server for home and office',
      rating: 4.6,
      reviews: 89
    },
    {
      id: 50,
      name: 'Cloud Storage Device',
      price: 149.99,
      originalPrice: 199.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
      category: 'storage',
      description: 'Personal cloud storage device with remote access',
      rating: 4.4,
      reviews: 134
    },
    // Environmental Products
    {
      id: 51,
      name: 'Indoor Plant Collection',
      price: 89.99,
      originalPrice: 119.99,
      discount: 25,
      image: 'https://plus.unsplash.com/premium_photo-1726743615672-1acd4aaefdee?w=600&auto=format&fit=crop',
      category: 'environmental',
      description: 'Beautiful collection of 3 air-purifying indoor plants in decorative pots',
      rating: 4.7,
      reviews: 189
    },
    {
      id: 52,
      name: 'Artificial Fiddle Leaf Fig Plant',
      price: 149.99,
      originalPrice: 199.99,
      discount: 25,
      image: 'https://media.istockphoto.com/id/2212847999/photo/image-of-artificial-fiddle-leaf-fig-tree-fake-house-plant-ficus-lyrata-for-modern-interior.webp?a=1&b=1&s=612x612&w=0&k=20&c=V5eNjY3SwMwfPdXLE8n5_lhBi5qiz1Uipe0l2VOJROM=',
      category: 'environmental',
      description: 'Realistic 6ft artificial fiddle leaf fig tree - maintenance free',
      rating: 4.5,
      reviews: 134
    },
    {
      id: 53,
      name: 'Grass Mat',
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      image: 'https://media.istockphoto.com/id/165853305/photo/patch-of-artificial-turf.webp?a=1&b=1&s=612x612&w=0&k=20&c=G1snor6BBURkYkb6XYXeirEvQPD6D9HWsrqr9OrGu6I=',
      category: 'environmental',
      description: 'Eco-friendly artificial grass mat for indoor/outdoor use',
      rating: 4.6,
      reviews: 156
    },
    {
      id: 54,
      name: 'Succulent Garden Kit',
      price: 39.99,
      originalPrice: 54.99,
      discount: 27,
      image: 'https://plus.unsplash.com/premium_photo-1664200630491-5f0bda86db50?w=600&auto=format&fit=crop',
      category: 'environmental',
      description: 'Complete kit with 6 different succulents and decorative stones',
      rating: 4.4,
      reviews: 98
    },
    {
      id: 55,
      name: 'Eco-Friendly Cleaning Set',
      price: 34.99,
      originalPrice: 49.99,
      discount: 30,
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop',
      category: 'environmental',
      description: 'Plant-based cleaning products starter pack - biodegradable',
      rating: 4.3,
      reviews: 167
    },
    {
      id: 56,
      name: 'Hanging Plant Holder',
      price: 24.99,
      originalPrice: 34.99,
      discount: 29,
      image: 'https://images.unsplash.com/photo-1669967705219-91b47708ee07?w=600&auto=format&fit=crop',
      category: 'environmental',
      description: 'Macrame hanging planter for indoor/outdoor use',
      rating: 4.5,
      reviews: 223
    },
    {
      id: 57,
      name: 'Air Purifer',
      price: 129.99,
      originalPrice: 169.99,
      discount: 24,
      image: 'https://media.istockphoto.com/id/1364110607/photo/young-woman-in-living-room-setting-up-home-air-purifier.webp?a=1&b=1&s=612x612&w=0&k=20&c=mTLhmlidm-EoD_xO8gixonGrgqAbA_2FcyXO_1wpVMc=',
      category: 'environmental',
      description: 'Eco-friendly air purifier with HEPA filter',
      rating: 4.8,
      reviews: 145
    },
    {
      id: 58,
      name: 'Biodegradable Planters',
      price: 19.99,
      originalPrice: 29.99,
      discount: 33,
      image: 'https://images.unsplash.com/photo-1601601319316-bace8ae2b548?w=600&auto=format&fit=crop',
      category: 'environmental',
      description: 'Set of 10 biodegradable coconut fiber planters',
      rating: 4.2,
      reviews: 89
    }
  ];

  // Effect to handle URL parameters
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    const searchFromUrl = searchParams.get('search');
    
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
    
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        return b.discount - a.discount;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Our Products</h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Discover our curated selection of premium products designed to enhance your lifestyle.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar - Centered */}
          <div className="flex justify-center">
            <div className="max-w-md w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border smooth-transition hover-scale focus:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              />
            </div>
          </div>

          {/* Category Filter - Centered */}
          <div className="flex justify-center">
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide max-w-full pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap smooth-transition hover-lift btn-active transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white hover-glow'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options - Right Side */}
          <div className="flex justify-end">
            <div className="flex items-center space-x-2">
              <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 rounded-lg border smooth-transition hover-scale ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:scale-105`}
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="discount">Discount</option>
              </select>
            </div>
          </div>
        </div>



        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card card-hover bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative image-hover">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold pulse-glow">
                    -{product.discount}%
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-70 text-white px-2 py-1 rounded-md text-xs hover-lift">
                  {product.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">({product.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className={`px-3 py-1 rounded-md text-sm transition-all duration-200 hover-lift btn-active transform hover:scale-105 ${
                      isInCart(product.id)
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700 text-white'
                          : 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white'
                        : isDarkMode
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                          : 'bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 text-white'
                    }`}
                  >
                    {isInCart(product.id) ? 'Added to Cart ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
