<?php
require __DIR__.'/app/bootstrap.php';
$error='';$success='';
if($_SERVER['REQUEST_METHOD']==='POST'){csrf_check();$action=$_POST['action']??'';
 if($action==='register'){
  $name=trim($_POST['name']??'');$email=filter_var(trim($_POST['email']??''),FILTER_VALIDATE_EMAIL);$phone=trim($_POST['phone']??'');$pass=$_POST['password']??'';
  if(!$name||!$email||strlen($pass)<10){$error='Name, valid email and a password of at least 10 characters are required.';}
  else{try{$s=db()->prepare('INSERT INTO customers(name,email,phone,password_hash) VALUES(?,?,?,?)');$s->execute([$name,$email,$phone,password_hash($pass,PASSWORD_DEFAULT)]);session_regenerate_id(true);$_SESSION['customer_id']=(int)db()->lastInsertId();$_SESSION['customer_name']=$name;header('Location: '.url('account.php?welcome=1'));exit;}catch(PDOException $ex){$error=$ex->getCode()==='23000'?'This email is already registered.':'Registration could not be completed.';}}
 }elseif($action==='login'){
  $s=db()->prepare("SELECT id,name,password_hash FROM customers WHERE email=? AND status='active' LIMIT 1");$s->execute([trim($_POST['email']??'')]);$c=$s->fetch();
  if($c&&password_verify($_POST['password']??'',$c['password_hash'])){session_regenerate_id(true);$_SESSION['customer_id']=(int)$c['id'];$_SESSION['customer_name']=$c['name'];header('Location: '.url('account.php'));exit;}$error='Email or password is incorrect.';
 }
}
if(!empty($_GET['welcome']))$success='Your customer account has been created.';
$pageTitle='My Account — NEXT TECH';require __DIR__.'/includes/header.php';
?>
<section class="page-intro"><span class="eyebrow">CUSTOMER AREA</span><h1>My Account</h1><p>Manage your profile and view your orders.</p></section>
<?php if($error):?><p class="form-error"><?=e($error)?></p><?php endif;?><?php if($success):?><p class="success-message"><?=e($success)?></p><?php endif;?>
<?php if(!empty($_SESSION['customer_id'])):$s=db()->prepare('SELECT id,order_number,total,status,created_at FROM orders WHERE customer_id=? ORDER BY id DESC LIMIT 20');$s->execute([$_SESSION['customer_id']]);$orders=$s->fetchAll();?>
<div class="account-welcome"><h2>Hello, <?=e($_SESSION['customer_name']??'Customer')?>!</h2><p>You are signed in.</p><a class="btn btn-outline" href="<?=e(url('customer-logout.php'))?>">Sign Out</a></div>
<section class="admin-panel" style="margin-top:20px"><h2>My Orders</h2><?php if($orders):?><div class="table-wrap"><table><thead><tr><th>Order</th><th>Date</th><th>Total</th><th>Status</th></tr></thead><tbody><?php foreach($orders as $o):?><tr><td><?=e($o['order_number'])?></td><td><?=e(date('d M Y',strtotime($o['created_at'])))?></td><td><?=money($o['total'])?></td><td><?=e(ucfirst(str_replace('_',' ',$o['status'])))?></td></tr><?php endforeach;?></tbody></table></div><?php else:?><p class="empty-state">You have not placed any orders yet.</p><?php endif;?></section>
<?php else:?>
<div class="account-columns"><form class="login-card" method="post"><h2>Sign In</h2><input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><input type="hidden" name="action" value="login"><label>Email<input type="email" name="email" required autocomplete="email"></label><label>Password<input type="password" name="password" required autocomplete="current-password"></label><button class="btn btn-primary">Sign In</button></form>
<form class="login-card" method="post"><h2>Create Account</h2><input type="hidden" name="csrf" value="<?=e(csrf_token())?>"><input type="hidden" name="action" value="register"><label>Full Name<input name="name" required autocomplete="name"></label><label>Email<input type="email" name="email" required autocomplete="email"></label><label>Phone<input name="phone" autocomplete="tel"></label><label>Password (minimum 10 characters)<input type="password" name="password" minlength="10" required autocomplete="new-password"></label><button class="btn btn-primary">Create Account</button></form></div>
<?php endif;?><?php require __DIR__.'/includes/footer.php';?>