CREATE DATABASE IF NOT EXISTS next_tech_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE next_tech_store;
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
