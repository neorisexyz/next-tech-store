# NEXT TECH — PHP + MySQL (cPanel edition)

A separate PHP implementation in this folder. The existing Next.js/Vercel application at the repository root is untouched. Upload the **contents of this folder** to your cPanel document root (usually public_html) when hosting is purchased.

## Requirements
- PHP 8.1+ with PDO MySQL and Fileinfo enabled
- MySQL 5.7+ / MariaDB
- Apache with .htaccess support

## cPanel installation
1. Create a MySQL database and database user in cPanel; grant ALL PRIVILEGES.
2. Import database.sql using phpMyAdmin.
3. Copy config/config.example.php to config/config.php and enter your exact cPanel database name, username and password. Set base_url to your domain (leave blank at the domain root).
4. Upload the contents of php-cpanel/ into public_html/.
5. Ensure uploads/products/ is writable by PHP (normally 755; follow host guidance).
6. Visit /admin/setup.php once to create the first administrator. Use a unique password of at least 12 characters.
7. Immediately delete admin/setup.php from hosting after creating the administrator.
8. Sign in at /admin/login.php.

## Included
- Responsive NEXT TECH navy/sky/white storefront
- Shared header, category strip and fixed bottom navigation
- Homepage, shop, category and product pages
- Session-based cart
- Admin login, dashboard, product create/edit, image upload validation, stock and active/draft status
- Nine requested categories

## Later phases
Customer accounts, persistent wishlist, order management, checkout/payment gateway, delivery integration, real contact details and email/SMS are not connected yet. Prices/inventory must be entered by the store admin; no demo product pricing is seeded.

## Security
- Never expose config/config.php publicly; keep credentials private.
- Enable HTTPS.
- Delete admin/setup.php after first admin creation.
- Keep PHP, MySQL and cPanel updated and back up database/uploads.
