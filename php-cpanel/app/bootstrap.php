<?php
declare(strict_types=1);
$configFile = __DIR__ . '/../config/config.php';
if (!is_file($configFile)) {
    http_response_code(503);
    exit('Setup required: copy config/config.example.php to config/config.php and add your database details.');
}
$config = require $configFile;
date_default_timezone_set($config['timezone'] ?? 'Asia/Dhaka');
if (session_status() !== PHP_SESSION_ACTIVE) {
    $secure = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    session_set_cookie_params(['httponly'=>true,'secure'=>$secure,'samesite'=>'Lax']);
    session_start();
}
function db(): PDO {
    static $pdo;
    global $config;
    if (!$pdo) {
        $d = $config['db'];
        $pdo = new PDO(
            "mysql:host={$d['host']};dbname={$d['name']};charset={$d['charset']}",
            $d['user'], $d['pass'],
            [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES=>false]
        );
    }
    return $pdo;
}
function e(?string $value): string { return htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8'); }
function money($amount): string { global $config; return ($config['currency'] ?? '৳') . number_format((float)$amount, 0); }
function url(string $path=''): string { global $config; return rtrim($config['base_url'] ?? '', '/') . '/' . ltrim($path, '/'); }
function csrf_token(): string { if (empty($_SESSION['csrf'])) $_SESSION['csrf']=bin2hex(random_bytes(32)); return $_SESSION['csrf']; }
function csrf_check(): void {
    if ($_SERVER['REQUEST_METHOD']==='POST' && !hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) {
        http_response_code(419); exit('Invalid security token. Please reload and try again.');
    }
}
function admin_required(): void { if (empty($_SESSION['admin_id'])) { header('Location: '.url('admin/login.php')); exit; } }
function setting(string $key, string $default=''): string {
    try { $s=db()->prepare('SELECT setting_value FROM settings WHERE setting_key=?'); $s->execute([$key]); return (string)($s->fetchColumn() ?: $default); }
    catch (Throwable $t) { return $default; }
}
