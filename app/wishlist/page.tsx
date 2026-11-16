'use client';
import Link from 'next/link';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '../store-context';

export default function WishlistPage(){
 const {wishlistItems,removeFromWishlist,addToCart}=useStore();
 return <main className="container store-page wishlist-page">
  <div className="store-page-heading"><div><span className="eyebrow">SAVED FOR LATER</span><h1>Your Wishlist</h1><p>Products you have saved for future reference.</p></div><span className="store-page-count">{wishlistItems.length} saved</span></div>
  {wishlistItems.length===0?<section className="store-empty-state"><Heart size={36}/><h2>Your wishlist is empty</h2><p>Tap the heart on a product to save it here.</p></section>:
  <div className="product-grid">{wishlistItems.map(item=><article className="product wishlist-product" key={item.slug}><div className="product-info"><div className="product-type">{item.category}</div><Link href={'/product/'+item.slug}><h3>{item.name}</h3></Link><div className="product-bottom"><strong className="price">{item.price}</strong><div className="wishlist-actions"><button className="addbtn" onClick={()=>addToCart(item)}><ShoppingBag size={13}/> Add</button><button className="heart" aria-label={'Remove '+item.name+' from wishlist'} onClick={()=>removeFromWishlist(item.slug)}><Trash2 size={14}/></button></div></div></div></article>)}</div>}
 </main>;
}
