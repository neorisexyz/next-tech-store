-- First create and select your cPanel database in phpMyAdmin, then import this file.
CREATE TABLE admins (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,name VARCHAR(120) NOT NULL,email VARCHAR(190) NOT NULL UNIQUE,password_hash VARCHAR(255) NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB;
CREATE TABLE categories (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,name VARCHAR(120) NOT NULL,slug VARCHAR(150) NOT NULL UNIQUE,description TEXT NULL,sort_order INT NOT NULL DEFAULT 0,is_active TINYINT(1) NOT NULL DEFAULT 1,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB;
CREATE TABLE products (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,category_id BIGINT UNSIGNED NULL,name VARCHAR(190) NOT NULL,slug VARCHAR(210) NOT NULL UNIQUE,description TEXT NULL,price DECIMAL(12,2) NOT NULL DEFAULT 0,stock INT UNSIGNED NOT NULL DEFAULT 0,image VARCHAR(255) NULL,status ENUM('active','draft') NOT NULL DEFAULT 'active',created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,CONSTRAINT fk_products_category FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL,INDEX idx_products_status(status),INDEX idx_products_category(category_id)) ENGINE=InnoDB;
CREATE TABLE settings (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,setting_key VARCHAR(100) NOT NULL UNIQUE,setting_value TEXT NULL) ENGINE=InnoDB;
INSERT INTO categories(name,slug,description,sort_order) VALUES
('Router','router','Wi-Fi routers and networking devices',1),
('ONU / XPON ONU','onu-xpon-onu','Fiber ONU and XPON devices',2),
('Mini UPS','mini-ups','Backup power for routers and devices',3),
('CCTV IP Camera','cctv-ip-camera','IP security cameras',4),
('Analog Camera','analog-camera','Analog CCTV cameras',5),
('DVR / NVR / XVR','dvr-nvr-xvr','Video recording systems',6),
('PoE Switch','poe-switch','Power over Ethernet switches',7),
('Networking Accessories','networking-accessories','Cables and networking accessories',8),
('Camera Accessories','camera-accessories','CCTV power and installation accessories',9);
INSERT INTO settings(setting_key,setting_value) VALUES('store_name','NEXT TECH'),('tagline','The Future, Solved.');

CREATE TABLE customers (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,name VARCHAR(120) NOT NULL,email VARCHAR(190) NOT NULL UNIQUE,phone VARCHAR(40) NULL,password_hash VARCHAR(255) NOT NULL,status ENUM('active','blocked') NOT NULL DEFAULT 'active',created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB;
CREATE TABLE wishlists (customer_id BIGINT UNSIGNED NOT NULL,product_id BIGINT UNSIGNED NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(customer_id,product_id),CONSTRAINT fk_wishlist_customer FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE,CONSTRAINT fk_wishlist_product FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE) ENGINE=InnoDB;
CREATE TABLE orders (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,customer_id BIGINT UNSIGNED NOT NULL,order_number VARCHAR(32) NOT NULL UNIQUE,customer_name VARCHAR(120) NOT NULL,phone VARCHAR(40) NOT NULL,address TEXT NOT NULL,city VARCHAR(120) NOT NULL,note TEXT NULL,subtotal DECIMAL(12,2) NOT NULL,total DECIMAL(12,2) NOT NULL,status ENUM('pending','confirmed','processing','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',payment_method ENUM('cash_on_delivery') NOT NULL DEFAULT 'cash_on_delivery',payment_status ENUM('unpaid','paid','refunded') NOT NULL DEFAULT 'unpaid',created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,CONSTRAINT fk_order_customer FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE RESTRICT,INDEX idx_orders_status(status),INDEX idx_orders_customer(customer_id)) ENGINE=InnoDB;
CREATE TABLE order_items (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,order_id BIGINT UNSIGNED NOT NULL,product_id BIGINT UNSIGNED NULL,product_name VARCHAR(190) NOT NULL,unit_price DECIMAL(12,2) NOT NULL,quantity INT UNSIGNED NOT NULL,line_total DECIMAL(12,2) NOT NULL,CONSTRAINT fk_order_item_order FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,CONSTRAINT fk_order_item_product FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE SET NULL) ENGINE=InnoDB;

