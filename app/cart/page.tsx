'use client';
import Link from 'next/link';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../store-context';

export default function CartPage(){
 const {cartItems,updateQuantity,removeFromCart}=useStore();
 const total=cartItems.reduce((sum,item)=>sum+(Number(item.price.replace(/[^0-9.]/g,''))||0)*item.quantity,0);
 const money=(value:number)=>'৳ '+value.toLocaleString('en-BD');
 return <main className="container store-page cart-page">
  <div className="store-page-heading"><div><span className="eyebrow">YOUR SELECTION</span><h1>Your Cart</h1><p>Review your selected products and quantities.</p></div><span className="store-page-count">{cartItems.reduce((n,item)=>n+item.quantity,0)} items</span></div>
  {cartItems.length===0?<section className="store-empty-state"><ShoppingBag size={36}/><h2>Your cart is empty</h2><p>Products you add will appear here.</p></section>:
  <div className="cart-layout">
   <section className="cart-lines" aria-label="Cart items">
    {cartItems.map(item=><article className="cart-line" key={item.slug}>
     <div className="cart-line-info"><Link href={'/product/'+item.slug}>{item.name}</Link><span>{item.category}</span><strong>{item.price}</strong></div>
     <div className="cart-line-controls"><div className="cart-quantity"><button aria-label="Decrease quantity" onClick={()=>updateQuantity(item.slug,item.quantity-1)}>−</button><strong>{item.quantity}</strong><button aria-label="Increase quantity" onClick={()=>updateQuantity(item.slug,item.quantity+1)}>+</button></div><button className="cart-remove" aria-label={'Remove '+item.name} onClick={()=>removeFromCart(item.slug)}><Trash2 size={16}/></button></div>
    </article>)}
   </section>
   <aside className="cart-summary"><h2>Order Summary</h2><div className="cart-summary-row"><span>Subtotal</span><strong>{money(total)}</strong></div><div className="cart-summary-total"><span>Total</span><strong>{money(total)}</strong></div><p>Delivery charge will be confirmed before order placement.</p><button className="btn primary cart-checkout-disabled" disabled>Checkout is not connected yet</button><small>Online checkout and payment will be enabled with the store backend.</small></aside>
  </div>}
 </main>;
}
