# NEXT TECH — PHP + MySQL (cPanel edition)

A separate PHP implementation in this folder. The Next.js/Vercel project at the repository root remains untouched.

## Requirements
- PHP 8.1+ with PDO MySQL and Fileinfo
- MySQL 5.7+ / MariaDB
- Apache with .htaccess

## cPanel installation
1. Create a MySQL database and database user in cPanel; grant ALL PRIVILEGES.
2. Import the complete `database.sql` in phpMyAdmin. It creates the nine categories plus customer, wishlist and order tables.
3. Copy `config/config.example.php` to `config/config.php`; enter the exact cPanel database name, user and password. Set `base_url` to your domain (blank at domain root).
4. Upload the contents of this folder into `public_html/`.
5. Ensure `uploads/products/` is writable by PHP.
6. Visit `/admin/setup.php` once to create the first admin with a unique 12+ character password. Immediately delete `admin/setup.php`.
7. Sign in at `/admin/login.php`.

## Included
- Responsive storefront, shared header and fixed bottom navigation
- Homepage, shop, category and product details
- Session cart and customer registration/login
- Persistent wishlist for signed-in customers (session wishlist for guests)
- Checkout with Cash on Delivery, order creation, transactional stock validation/deduction; guests are returned to checkout after sign-in/registration
- Customer order history with private order tracking page and live status timeline (Pending → Confirmed → Processing → Shipped → Delivered; cancellation is shown separately)
- Admin product/category management and order status/payment status management

## Not yet included
Online payment gateway, courier API integration, email/SMS notifications, customer password reset, product reviews and configurable business contact details. Checkout currently creates COD orders only. Add real product data and prices in the Admin Panel; no fabricated sample stock/prices are inserted.

## Security and operations
- Keep `config/config.php` private; never share database credentials.
- Enable HTTPS.
- Remove the one-time admin setup file after use.
- Back up database and uploaded product images regularly.
- Review cancellation/refund stock handling and business-specific order policies before production launch.
