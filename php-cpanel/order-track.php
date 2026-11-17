<?php
require __DIR__.'/app/bootstrap.php';
if(empty($_SESSION['customer_id'])){header('Location: '.url('account.php'));exit;}
$orderNo=trim($_GET['order']??'');
$s=db()->prepare('SELECT id,order_number,customer_name,phone,address,city,total,status,payment_method,payment_status,created_at,updated_at FROM orders WHERE order_number=? AND customer_id=? LIMIT 1');
$s->execute([$orderNo,$_SESSION['customer_id']]);$order=$s->fetch();
if(!$order){http_response_code(404);$pageTitle='Order Not Found — NEXT TECH';require __DIR__.'/includes/header.php';?><section class="page-intro"><h1>Order not found</h1><p>This order number is not available in your account.</p><a class="btn btn-primary" href="<?=e(url('account.php'))?>">My Account</a></section><?php require __DIR__.'/includes/footer.php';exit;}
$s=db()->prepare('SELECT product_name,quantity,unit_price,line_total FROM order_items WHERE order_id=? ORDER BY id');$s->execute([$order['id']]);$items=$s->fetchAll();
$steps=['pending'=>'Order Placed','confirmed'=>'Confirmed','processing'=>'Processing','shipped'=>'Shipped','delivered'=>'Delivered'];
$sequence=array_keys($steps);$current=array_search($order['status'],$sequence,true);$cancelled=$order['status']==='cancelled';
$pageTitle='Track '.$order['order_number'].' — NEXT TECH';require __DIR__.'/includes/header.php';
?>
<section class="page-intro"><span class="eyebrow">ORDER STATUS</span><h1>Track Your Order</h1><p>Order <strong><?=e($order['order_number'])?></strong> · Placed <?=e(date('d M Y, h:i A',strtotime($order['created_at'])))?></p></section>
<section class="tracking-panel"><div class="tracking-heading"><div><span class="muted-label">CURRENT STATUS</span><h2 class="status-pill status-<?=e($order['status'])?>"><?=e(ucfirst(str_replace('_',' ',$order['status'])))?></h2></div><div class="tracking-total"><small>Order Total</small><strong><?=money($order['total'])?></strong></div></div>
<?php if($cancelled):?><div class="tracking-cancelled"><strong>Order Cancelled</strong><p>This order has been cancelled. Please contact our store if you need assistance.</p></div><?php else:?><div class="tracking-steps"><?php foreach($steps as $key=>$label):$idx=array_search($key,$sequence,true);$done=$current!==false&&$idx<=$current;?><div class="tracking-step <?=$done?'is-done':''?>"><span class="tracking-dot"><?=$done?'✓':''?></span><strong><?=e($label)?></strong><?php if($key==='pending'):?><small><?=e(date('d M, h:i A',strtotime($order['created_at'])))?></small><?php elseif($done&&$key===$order['status']):?><small>Last updated <?=e(date('d M, h:i A',strtotime($order['updated_at'])))?></small><?php endif;?></div><?php endforeach;?></div><?php endif;?>
</section>
<div class="tracking-columns"><section class="admin-panel"><h2>Items Ordered</h2><?php foreach($items as $it):?><div class="tracking-item"><div><strong><?=e($it['product_name'])?></strong><small>Qty: <?=(int)$it['quantity']?> × <?=money($it['unit_price'])?></small></div><strong><?=money($it['line_total'])?></strong></div><?php endforeach;?><hr><p class="tracking-total-line">Total <strong><?=money($order['total'])?></strong></p></section>
<section class="admin-panel"><h2>Delivery Details</h2><p><strong><?=e($order['customer_name'])?></strong></p><p><?=e($order['phone'])?></p><p><?=e($order['address'])?>, <?=e($order['city'])?></p><hr><p>Payment: Cash on Delivery</p><p>Payment status: <?=e(ucfirst($order['payment_status']))?></p></section></div>
<div class="tracking-actions"><a class="btn btn-outline" href="<?=e(url('account.php'))?>">My Account & Orders</a><a class="btn btn-primary" href="<?=e(url('shop.php'))?>">Continue Shopping</a></div>
<?php require __DIR__.'/includes/footer.php';?>
