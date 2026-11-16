'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, Heart, ShoppingBag, Router, Wifi, BatteryCharging, Camera, Monitor, Zap, Cable } from 'lucide-react';

const items=[
{name:'Dual-Band Wi-Fi 6 Router',bn:'ডুয়াল-ব্যান্ড Wi-Fi 6 রাউটার',category:'Router',slug:'dual-band-wifi-6-router',price:'৳ 4,500',Icon:Router},
{name:'XPON ONU 1GE',bn:'XPON ONU 1GE',category:'ONU / XPON ONU',slug:'xpon-onu-1ge',price:'৳ 1,250',Icon:Wifi},
{name:'Mini UPS for Router',bn:'রাউটারের জন্য মিনি UPS',category:'Mini UPS',slug:'mini-ups-for-router',price:'৳ 1,650',Icon:BatteryCharging},
{name:'2MP Smart IP Camera',bn:'2MP স্মার্ট IP ক্যামেরা',category:'CCTV IP Camera',slug:'2mp-smart-ip-camera',price:'৳ 2,850',Icon:Camera},
{name:'8-Port PoE Network Switch',bn:'৮-পোর্ট PoE নেটওয়ার্ক সুইচ',category:'PoE Switch',slug:'8-port-poe-network-switch',price:'৳ 3,200',Icon:Zap},
{name:'4 Channel Network Recorder',bn:'৪-চ্যানেল নেটওয়ার্ক রেকর্ডার',category:'DVR / NVR / XVR',slug:'4-channel-network-recorder',price:'৳ 4,900',Icon:Monitor},
{name:'Outdoor Bullet Camera',bn:'আউটডোর বুলেট ক্যামেরা',category:'Analog Camera',slug:'outdoor-bullet-camera',price:'৳ 1,850',Icon:Camera},
{name:'Gigabit Networking Cable',bn:'গিগাবিট নেটওয়ার্কিং ক্যাবল',category:'Networking Accessories',slug:'gigabit-networking-cable',price:'৳ 450',Icon:Cable}
];
export default function ShopPage(){
const [lang,setLang]=useState<'EN'|'BN'>('EN');const [q,setQ]=useState('');const [saved,setSaved]=useState<string[]>([]);
const list=useMemo(()=>items.filter(x=>(x.name+' '+x.bn+' '+x.category).toLowerCase().includes(q.toLowerCase())),[q]);
return <main className="container" style={{paddingTop:30,minHeight:'75vh'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:15,flexWrap:'wrap',marginBottom:28}}>
<Link className="brand" href="/"><strong><span className="brand-next">NEXT</span><span className="brand-tech">TECH</span></strong></Link>
<div style={{display:'flex',gap:12,alignItems:'center'}}><Link className="textlink" href="/">Home</Link><Link className="textlink" href="/categories">{lang==='BN'?'ক্যাটাগরি':'Categories'}</Link><button className="language-toggle" onClick={()=>setLang(v=>v==='EN'?'BN':'EN')}>{lang}</button></div>
</div>
<div className="section-head"><div><h1 style={{fontSize:30,color:'var(--navy)',margin:0}}>{lang==='BN'?'সব পণ্য':'Shop All Products'}</h1><p>{lang==='BN'?'আপনার প্রয়োজনীয় প্রযুক্তি পণ্য খুঁজে নিন':'Explore technology essentials for your home and business.'}</p></div><span className="textlink">{list.length} {lang==='BN'?'টি পণ্য':'Products'}</span></div>
<label className="searchbox" style={{maxWidth:480,width:'100%',marginBottom:24}}><Search size={17}/><input placeholder={lang==='BN'?'পণ্য খুঁজুন...':'Search products...'} value={q} onChange={e=>setQ(e.target.value)}/></label>
<div className="product-grid">{list.map(({name,bn,category,slug,price,Icon})=><article className="product" key={name}><Link href={'/product/'+slug} className="product-visual" style={{textDecoration:'none'}}><div className="product-symbol"><Icon size={49} strokeWidth={1.35}/></div></Link><div className="product-info"><div className="product-type">{category}</div><h3>{lang==='BN'?bn:name}</h3><div className="product-bottom"><span className="price">{price}</span><button className="addbtn" onClick={()=>setSaved(v=>v.includes(name)?v.filter(x=>x!==name):[...v,name])}><Heart size={13} fill={saved.includes(name)?'currentColor':'none'}/></button></div></div></article>)}</div>
{list.length===0&&<p style={{padding:30,textAlign:'center'}}>{lang==='BN'?'কোনো পণ্য পাওয়া যায়নি':'No products found.'}</p>}
<div style={{padding:'35px 0'}}><Link className="textlink" href="/">← {lang==='BN'?'হোমে ফিরে যান':'Back to Home'}</Link></div>
</main>
}