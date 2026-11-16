'use client';
import { useState } from 'react';
import { useStore } from '../store-context';
export default function ProductActions({ product }: { product: { slug: string; name: string; price: string; category: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const saved = isWishlisted(product.slug);
  return <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',marginTop:18}}>
    <div style={{display:'flex',alignItems:'center',border:'1px solid var(--line)',borderRadius:8,overflow:'hidden'}}>
      <button aria-label="Decrease quantity" onClick={()=>setQuantity(q=>Math.max(1,q-1))} style={{padding:'10px 14px',border:0,background:'#f4f8fa'}}>−</button>
      <span style={{minWidth:38,textAlign:'center'}}>{quantity}</span>
      <button aria-label="Increase quantity" onClick={()=>setQuantity(q=>q+1)} style={{padding:'10px 14px',border:0,background:'#f4f8fa'}}>+</button>
    </div>
    <button className="btn primary" onClick={()=>{addToCart(product,quantity);setMessage('Added to cart');}}><span>Add to Cart</span></button>
    <button className="btn secondary" aria-pressed={saved} onClick={()=>{toggleWishlist(product);setMessage(saved?'Removed from wishlist':'Saved to wishlist');}}>{saved?'♥ Saved':'♡ Wishlist'}</button>
    {message&&<span role="status" style={{fontSize:12,color:'#1684b8',width:'100%'}}>{message}</span>}
  </div>;
}
