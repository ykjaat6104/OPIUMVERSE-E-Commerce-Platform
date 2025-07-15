-- OpiumVerse Database Setup
-- Run this script in your MySQL database

CREATE DATABASE IF NOT EXISTS opiumverse_db;
USE opiumverse_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    zip_code VARCHAR(10),
    country VARCHAR(50) DEFAULT 'USA',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    category_id INT,
    category VARCHAR(100),
    image_url VARCHAR(255),
    images JSON,
    stock_quantity INT DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    badge VARCHAR(50),
    sku VARCHAR(100),
    weight DECIMAL(8, 2),
    dimensions VARCHAR(100),
    materials TEXT,
    care_instructions TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10, 2) DEFAULT 0.00,
    shipping_amount DECIMAL(10, 2) DEFAULT 0.00,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    shipping_address JSON,
    billing_address JSON,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Shopping cart table
CREATE TABLE IF NOT EXISTS cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE KEY unique_user_product (user_id, product_id)
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE KEY unique_user_product (user_id, product_id)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    comment TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample categories
INSERT INTO categories (name, description, image_url) VALUES
('Women\'s Fashion', 'Elegant and sophisticated women\'s clothing', '/images/category1.jpg'),
('Men\'s Fashion', 'Modern and stylish men\'s clothing', '/images/category2.jpg'),
('Accessories', 'Premium accessories for all occasions', '/images/category3.jpg'),
('Jewelry', 'Exquisite jewelry pieces', '/images/category4.jpg');

-- Insert sample products
INSERT INTO products (name, description, price, original_price, category, image_url, stock_quantity, rating, review_count, badge) VALUES
('Luxury Silk Dress', 'Elegant silk dress perfect for special occasions. Made from premium silk with exquisite craftsmanship.', 299.99, 399.99, 'Women\'s Fashion', '/images/product1.jpg', 15, 4.8, 124, 'Best Seller'),
('Designer Handbag', 'Premium leather handbag with modern design. Features multiple compartments and gold-tone hardware.', 489.99, 599.99, 'Accessories', '/images/product2.jpg', 8, 4.9, 89, 'New'),
('Premium Watch', 'Swiss-made watch with automatic movement. Features sapphire crystal and water resistance.', 799.99, 999.99, 'Accessories', '/images/product3.jpg', 5, 4.7, 156, 'Limited'),
('Elegant Jewelry Set', 'Beautiful jewelry set with genuine stones. Includes necklace, earrings, and bracelet.', 199.99, 279.99, 'Jewelry', '/images/product4.jpg', 12, 4.6, 92, 'Sale'),
('Casual Sneakers', 'Comfortable sneakers for everyday wear. Made with breathable materials and cushioned sole.', 129.99, NULL, 'Men\'s Fashion', '/images/product5.jpg', 25, 4.5, 78, NULL),
('Business Suit', 'Professional suit made from premium fabric. Tailored fit with modern styling.', 599.99, NULL, 'Men\'s Fashion', '/images/product6.jpg', 10, 4.8, 65, NULL),
('Vintage Sunglasses', 'Classic vintage-style sunglasses with UV protection. Premium acetate frame.', 89.99, 129.99, 'Accessories', '/images/product7.jpg', 20, 4.4, 43, 'Sale'),
('Leather Wallet', 'Handcrafted leather wallet with RFID protection. Multiple card slots and bill compartment.', 79.99, NULL, 'Accessories', '/images/product8.jpg', 30, 4.6, 156, NULL);

-- Insert sample reviews
INSERT INTO reviews (product_id, user_id, rating, title, comment, is_verified) VALUES
(1, 1, 5, 'Amazing quality!', 'This dress exceeded my expectations. The silk is beautiful and the fit is perfect.', TRUE),
(1, 2, 4, 'Love it!', 'Great dress for special occasions. Received many compliments.', TRUE),
(2, 1, 5, 'Perfect handbag', 'Exactly what I was looking for. Great quality and stylish design.', TRUE),
(3, 2, 5, 'Excellent watch', 'Love the craftsmanship and attention to detail. Worth every penny.', TRUE);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_rating ON products(rating);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_cart_user ON cart_items(user_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
