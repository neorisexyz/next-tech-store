'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Search, Heart, ShoppingBag, Home, Grid2X2, Store, UserCircle, X, Minus, Plus, Trash2 } from 'lucide-react';
import { useStore } from './store-context';

export default function SiteChrome(){
 const pathname=usePathname();
 const {cartItems,cartCount,updateQuantity,removeFromCart}=useStore();
 const [query,setQuery]=useState('');
 const [cartOpen,setCartOpen]=useState(false);
 const total=cartItems.reduce((sum,item)=>sum+(Number(item.price.replace(/[^0-9.]/g,''))||0)*item.quantity,0);
 const money=(v:number)=>'৳ '+v.toLocaleString('en-BD');
 const nav=[{href:'/',label:'Home',Icon:Home},{href:'/categories',label:'Categories',Icon:Grid2X2},{href:'/shop',label:'Shop',Icon:Store},{href:'/account',label:'Account',Icon:UserCircle}];
 return <>
  <header className="site-header">
   <div className="site-header-inner">
    <form className="site-search" onSubmit={e=>{e.preventDefault();window.location.href='/shop?q='+encodeURIComponent(query);}}>
     <button type="submit" aria-label="Search"><Search size={18}/></button><input aria-label="Search products" placeholder="Search products..." value={query} onChange={e=>setQuery(e.target.value)}/>
    </form>
    <Link className="site-brand" href="/" aria-label="NEXT TECH"><strong><span className="brand-next">NEXT</span><span className="brand-tech">TECH</span></strong></Link>
    <div className="site-header-actions">
     <Link className="site-icon-button" href="/wishlist" aria-label="Wishlist"><Heart size={20}/></Link>
     <button className="site-icon-button site-cart-button" onClick={()=>setCartOpen(true)} aria-label="Open cart"><ShoppingBag size={21}/>{cartCount>0&&<span className="count">{cartCount}</span>}</button>
    </div>
   </div>
  </header>
  <nav className="site-bottom-nav" aria-label="Main navigation">{nav.map(({href,label,Icon})=><Link key={href} href={href} className={pathname===href||(href!=='/'&&pathname.startsWith(href))?'active':''}><Icon size={19}/><span>{label}</span></Link>)}</nav>
  {cartOpen&&<><button className="site-drawer-backdrop" aria-label="Close cart" onClick={()=>setCartOpen(false)}/><aside className="site-cart-drawer" aria-label="Quick cart"><div className="site-drawer-head"><h2>Your Cart {cartCount>0&&<small>({cartCount})</small>}</h2><button onClick={()=>setCartOpen(false)} aria-label="Close"><X/></button></div>{cartItems.length===0?<div className="site-cart-empty"><ShoppingBag size={35}/><h3>Your cart is empty</h3><p>Add products and they will appear here.</p><Link href="/shop" className="btn primary" onClick={()=>setCartOpen(false)}>Explore Products</Link></div>:<><div className="site-cart-items">{cartItems.map(item=><div className="site-cart-row" key={item.slug}><div className="site-cart-item-info"><Link href={'/product/'+item.slug} onClick={()=>setCartOpen(false)}>{item.name}</Link><strong>{item.price}</strong><div className="site-qty"><button onClick={()=>updateQuantity(item.slug,item.quantity-1)} aria-label="Decrease">−</button><span>{item.quantity}</span><button onClick={()=>updateQuantity(item.slug,item.quantity+1)} aria-label="Increase">+</button><button className="site-remove" onClick={()=>removeFromCart(item.slug)} aria-label="Remove"><Trash2 size={15}/></button></div></div></div>)}</div><div className="site-cart-summary"><div><span>Subtotal</span><strong>{money(total)}</strong></div><p>Delivery charge will be confirmed during order placement.</p><Link href="/cart" className="btn primary" onClick={()=>setCartOpen(false)}>View Cart</Link></div></>}</aside></>}
 </>;
}
