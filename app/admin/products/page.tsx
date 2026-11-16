'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, Plus, SlidersHorizontal, Eye, Pencil, Package } from 'lucide-react';
import { categories, products } from '../../catalog';
export default function AdminProductsPage(){
 const [query,setQuery]=useState('');
 const [category,setCategory]=useState('All');
 const filtered=useMemo(()=>products.filter(p=>(category==='All'||p.category===category)&&(p.name+' '+p.category+' '+p.slug).toLowerCase().includes(query.toLowerCase())),[query,category]);
 return <div className="admin-content"><div className="admin-page-heading"><div><div className="admin-eyebrow">CATALOGUE</div><h1>Products</h1><p>Browse the current product catalogue and its sample pricing.</p></div><button className="admin-primary-btn" disabled title="Product creation will be enabled after database setup"><Plus size={16}/> Add Product</button></div>
 <div className="admin-notice"><strong>Read-only preview</strong><span>Product creation, editing, image uploads, stock control and permanent saving will be enabled after the secure database and admin authentication are connected.</span></div>
 <section className="admin-panel-card"><div className="admin-toolbar"><label className="admin-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search product name or category..."/></label><label className="admin-select"><SlidersHorizontal size={15}/><select value={category} onChange={e=>setCategory(e.target.value)}><option>All</option>{categories.map(c=><option key={c.slug}>{c.name}</option>)}</select></label><span className="admin-result-count">{filtered.length} products</span></div>
 <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th>CATALOGUE</th><th>ACTION</th></tr></thead><tbody>{filtered.map(p=><tr key={p.slug}><td><div className="admin-product-cell"><span className="admin-product-icon"><p.Icon size={18}/></span><span><b>{p.name}</b><small>{p.bn}</small></span></div></td><td>{p.category}</td><td><b>{p.price}</b></td><td><span className="admin-status demo">Demo</span></td><td><Link className="admin-row-action" href={'/product/'+p.slug} title="Preview product"><Eye size={16}/></Link><button className="admin-row-action" disabled title="Editing will be enabled after database setup"><Pencil size={15}/></button></td></tr>)}</tbody></table>{filtered.length===0&&<div className="admin-empty"><Package size={25}/><b>No products found</b><span>Try another search or category.</span></div>}</div></section></div>;
}
