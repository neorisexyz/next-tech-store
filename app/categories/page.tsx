'use client';
import Link from 'next/link';
import { useState } from 'react';
import { categories, products } from '../catalog';
export default function CategoriesPage() {
  const [lang, setLang] = useState<'EN' | 'BN'>('EN');
  return <main className="container" style={{ paddingTop: 30, minHeight: '75vh' }}>
    <div className="section-head"><div><h1 style={{ fontSize: 30, color: 'var(--navy)', margin: 0 }}>{lang === 'BN' ? 'সব ক্যাটাগরি' : 'Browse Categories'}</h1><p>{lang === 'BN' ? 'আপনার প্রয়োজন অনুযায়ী ক্যাটাগরি বেছে নিন' : 'Choose a category to explore products.'}</p></div><button className="language-toggle" onClick={() => setLang(v => v === 'EN' ? 'BN' : 'EN')}>{lang}</button></div>
    <div className="category-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(145px,1fr))' }}>{categories.map(({ name, bn, slug, Icon }) => { const count = products.filter(p => p.category === name).length; return <Link className="category" href={'/categories/' + slug} key={slug}><div className="cat-icon"><Icon size={23} /></div><span>{lang === 'BN' ? bn : name}</span><small>{count} {lang === 'BN' ? 'টি পণ্য' : count === 1 ? 'product' : 'products'}</small></Link>; })}</div>
  </main>;
}
