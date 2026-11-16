'use client';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useStore } from '../../store-context';
import { Heart, ShoppingBag } from 'lucide-react';
import { categories, products } from '../../catalog';
export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const cat = categories.find(x => x.slug === params.slug);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  if (!cat) notFound();
  const list = products.filter(p => p.category === cat.name);
  const Icon = cat.Icon;
  return <main className="container" style={{ paddingTop: 30, minHeight: '75vh' }}>
    <section className="hero" style={{ minHeight: 190, gridTemplateColumns: '1fr auto', padding: 30, alignItems: 'center', marginBottom: 28 }}><div><div className="eyebrow">NEXT TECH COLLECTION</div><h1 style={{ fontSize: 34, margin: '12px 0' }}>{cat.name}</h1><p>{list.length} {list.length === 1 ? 'product' : 'products'} in this category</p></div><div className="cat-icon" style={{ width: 86, height: 86 }}><Icon size={42} /></div></section>
    {list.length ? <div className="product-grid">{list.map(({ name, bn, category, slug, price, Icon: ProductIcon }) => <article className="product" key={slug}><Link href={'/product/' + slug} className="product-visual" style={{ textDecoration: 'none' }}><div className="product-symbol"><ProductIcon size={49} strokeWidth={1.35} /></div></Link><div className="product-info"><div className="product-type">{category}</div><Link href={'/product/' + slug} style={{ textDecoration: 'none', color: 'inherit' }}><h3>{name}</h3></Link><div className="product-bottom"><span className="price">{price}</span><div style={{ display: 'flex', gap: 7 }}><button className="heart" aria-label="Save to wishlist" aria-pressed={isWishlisted(slug)} onClick={() => toggleWishlist({ slug, name, price, category })}><Heart size={14} fill={isWishlisted(slug) ? 'currentColor' : 'none'} /></button><button className="addbtn" onClick={() => addToCart({ slug, name, price, category })}><ShoppingBag size={13} /> Add</button></div></div></div></article>)}</div> : <p>No products are listed in this category yet.</p>}
  </main>;
}
