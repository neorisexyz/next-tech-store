'use client';
import Link from 'next/link';
import { Heart, Trash2 } from 'lucide-react';
import { useStore } from '../store-context';
export default function WishlistPage(){
 const {wishlistItems,removeFromWishlist,addToCart}=useStore();
 return <main className="container" style={{paddingTop:30,minHeight:'75vh',paddingBottom:80}}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:32}}><Link className="brand" href="/"><strong><span className="brand-next">NEXT</span><span className="brand-tech">TECH</span></strong></Link><Link className="textlink" href="/shop">Continue Shopping</Link></div>
  <h1 style={{fontSize:32,color:'var(--navy)'}}>Your Wishlist</h1>
  {wishlistItems.length===0?<section className="hero" style={{display:'block',padding:32,minHeight:230}}><Heart size={34}/><h2 style={{color:'var(--navy)'}}>Your wishlist is empty</h2><p>Tap the heart button on a product to save it here.</p><Link className="btn primary" href="/shop">Explore Products</Link></section>:
  <div className="product-grid">{wishlistItems.map(item=><article className="product" key={item.slug}><div className="product-info"><div className="product-type">{item.category}</div><Link href={'/product/'+item.slug}><h3>{item.name}</h3></Link><div className="product-bottom"><strong className="price">{item.price}</strong><div style={{display:'flex',gap:7}}><button className="addbtn" onClick={()=>addToCart(item)}>Add to Cart</button><button className="heart" aria-label="Remove from wishlist" onClick={()=>removeFromWishlist(item.slug)}><Trash2 size={14}/></button></div></div></div></article>)}</div>}
 </main>
}
