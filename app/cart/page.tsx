'use client';
import Link from 'next/link';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../store-context';
export default function CartPage(){
 const {cartItems,updateQuantity,removeFromCart}=useStore();
 const total=cartItems.reduce((sum,item)=>sum+(Number(item.price.replace(/[^0-9.]/g,''))||0)*item.quantity,0);
 const money=(value:number)=>'৳ '+value.toLocaleString('en-BD');
 return <main className="container" style={{paddingTop:30,minHeight:'75vh',paddingBottom:80}}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:32}}><Link className="brand" href="/"><strong><span className="brand-next">NEXT</span><span className="brand-tech">TECH</span></strong></Link><Link className="textlink" href="/shop">Continue Shopping</Link></div>
  <h1 style={{fontSize:32,color:'var(--navy)'}}>Your Cart</h1>
  {cartItems.length===0?<section className="hero" style={{display:'block',padding:32,minHeight:240}}><ShoppingBag size={34}/><h2 style={{color:'var(--navy)'}}>Your cart is empty</h2><p>Add products from the Shop or product details page.</p><Link className="btn primary" href="/shop">Explore Products</Link></section>:
  <div style={{display:'grid',gridTemplateColumns:'minmax(0,1.6fr) minmax(240px,.8fr)',gap:22,alignItems:'start'}}>
   <section style={{border:'1px solid var(--line)',borderRadius:14,padding:'4px 18px'}}>
    {cartItems.map(item=><div key={item.slug} style={{display:'flex',justifyContent:'space-between',gap:14,alignItems:'center',padding:'18px 0',borderBottom:'1px solid var(--line)',flexWrap:'wrap'}}>
     <div style={{minWidth:150,flex:1}}><Link href={'/product/'+item.slug} style={{fontWeight:750,color:'var(--navy)'}}>{item.name}</Link><div className="product-type" style={{marginTop:6}}>{item.category}</div><div style={{fontWeight:800,marginTop:7}}>{item.price}</div></div>
     <div style={{display:'flex',alignItems:'center',gap:8}}><button aria-label="Decrease quantity" onClick={()=>updateQuantity(item.slug,item.quantity-1)} className="heart">−</button><strong>{item.quantity}</strong><button aria-label="Increase quantity" onClick={()=>updateQuantity(item.slug,item.quantity+1)} className="heart">+</button><button aria-label="Remove item" onClick={()=>removeFromCart(item.slug)} className="heart"><Trash2 size={14}/></button></div>
    </div>)}
   </section>
   <aside style={{border:'1px solid var(--line)',borderRadius:14,padding:20}}><h2 style={{fontSize:19,color:'var(--navy)',marginTop:0}}>Order Summary</h2><div style={{display:'flex',justifyContent:'space-between',margin:'18px 0'}}><span>Subtotal</span><strong>{money(total)}</strong></div><p style={{fontSize:12,color:'var(--muted)',lineHeight:1.6}}>Delivery charge will be confirmed during order placement.</p><div style={{borderTop:'1px solid var(--line)',paddingTop:15,display:'flex',justifyContent:'space-between'}}><strong>Total</strong><strong style={{color:'var(--navy)'}}>{money(total)}</strong></div><button className="btn primary" style={{width:'100%',justifyContent:'center',marginTop:20}} disabled>Checkout coming soon</button><p style={{fontSize:11,color:'var(--muted)'}}>Online checkout and payment are not connected yet.</p></aside>
  </div>}
 </main>
}
