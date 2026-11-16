'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useStore } from '../store-context';
import { Search, Heart, ShoppingBag } from 'lucide-react';
import { categories, products } from '../catalog';

export default function ShopPage() {
  const [lang, setLang] = useState<'EN' | 'BN'>('EN');
  const [q, setQ] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const list = useMemo(() => products.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    (p.name + ' ' + p.bn + ' ' + p.category).toLowerCase().includes(q.toLowerCase())
  ), [q, activeCategory]);
  return <main className="container" style={{ paddingTop: 30, minHeight: '75vh' }}>
    <div className="section-head"><div><h1 style={{ fontSize: 30, color: 'var(--navy)', margin: 0 }}>{lang === 'BN' ? 'সব পণ্য' : 'Shop All Products'}</h1><p>{lang === 'BN' ? 'আপনার প্রয়োজনীয় প্রযুক্তি পণ্য খুঁজে নিন' : 'Explore technology essentials for your home and business.'}</p></div><div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><span className="textlink">{list.length} {lang === 'BN' ? 'টি পণ্য' : 'Products'}</span><button className="language-toggle" onClick={() => setLang(v => v === 'EN' ? 'BN' : 'EN')}>{lang}</button></div></div>
    <label className="searchbox" style={{ maxWidth: 520, width: '100%', marginBottom: 18 }}><Search size={17} /><input aria-label="Search products" placeholder={lang === 'BN' ? 'পণ্য খুঁজুন...' : 'Search products...'} value={q} onChange={e => setQ(e.target.value)} /></label>
    <div className="catalog-filter-row" aria-label="Filter products by category"><button className={activeCategory === 'All' ? 'catalog-filter active' : 'catalog-filter'} onClick={() => setActiveCategory('All')}>{lang === 'BN' ? 'সব' : 'All'}</button>{categories.map(c => <button key={c.slug} className={activeCategory === c.name ? 'catalog-filter active' : 'catalog-filter'} onClick={() => setActiveCategory(c.name)}>{lang === 'BN' ? c.bn : c.name}</button>)}</div>
    <div className="product-grid">{list.map(({ name, bn, category, slug, price, Icon }) => <article className="product" key={slug}><Link href={'/product/' + slug} className="product-visual" style={{ textDecoration: 'none' }}><div className="product-symbol"><Icon size={49} strokeWidth={1.35} /></div></Link><div className="product-info"><div className="product-type">{category}</div><Link href={'/product/' + slug} style={{ textDecoration: 'none', color: 'inherit' }}><h3>{lang === 'BN' ? bn : name}</h3></Link><div className="product-bottom"><span className="price">{price}</span><div style={{ display: 'flex', gap: 7 }}><button className="heart" aria-label="Save to wishlist" aria-pressed={isWishlisted(slug)} onClick={() => toggleWishlist({ slug, name, price, category })}><Heart size={14} fill={isWishlisted(slug) ? 'currentColor' : 'none'} /></button><button className="addbtn" onClick={() => addToCart({ slug, name, price, category })}><ShoppingBag size={13} /> Add</button></div></div></div></article>)}</div>
    {list.length === 0 && <p style={{ padding: 30, textAlign: 'center' }}>{lang === 'BN' ? 'কোনো পণ্য পাওয়া যায়নি' : 'No products found.'}</p>}
  </main>;
}
