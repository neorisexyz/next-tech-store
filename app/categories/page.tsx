'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Router, Wifi, BatteryCharging, Camera, Monitor, Zap, Cable, ShieldCheck } from 'lucide-react';
const cats=[
['Router','রাউটার','router',Router],['ONU / XPON ONU','ONU / XPON ONU','onu',Wifi],['Mini UPS','মিনি UPS','mini-ups',BatteryCharging],['CCTV IP Camera','CCTV IP ক্যামেরা','cctv-ip-camera',Camera],['Analog Camera','অ্যানালগ ক্যামেরা','analog-camera',Camera],['DVR / NVR / XVR','DVR / NVR / XVR','dvr-nvr-xvr',Monitor],['PoE Switch','PoE সুইচ','poe-switch',Zap],['Networking Accessories','নেটওয়ার্কিং অ্যাক্সেসরিজ','networking-accessories',Cable],['Camera Accessories','ক্যামেরা অ্যাক্সেসরিজ','camera-accessories',ShieldCheck]
] as const;
export default function CategoriesPage(){const [lang,setLang]=useState<'EN'|'BN'>('EN');return <main className="container" style={{paddingTop:30,minHeight:'75vh'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:35}}><Link className="brand" href="/"><strong><span className="brand-next">NEXT</span><span className="brand-tech">TECH</span></strong></Link><div style={{display:'flex',gap:14,alignItems:'center'}}><Link className="textlink" href="/shop">Shop</Link><button className="language-toggle" onClick={()=>setLang(v=>v==='EN'?'BN':'EN')}>{lang}</button></div></div>
<div className="section-head"><div><h1 style={{fontSize:30,color:'var(--navy)',margin:0}}>{lang==='BN'?'সব ক্যাটাগরি':'Browse Categories'}</h1><p>{lang==='BN'?'আপনার প্রয়োজন অনুযায়ী ক্যাটাগরি বেছে নিন':'Choose a category to explore products.'}</p></div></div>
<div className="category-grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(145px,1fr))'}}>{cats.map(([en,bn,slug,Icon])=><Link className="category" href={'/categories/'+slug} key={slug}><div className="cat-icon"><Icon size={23}/></div><span>{lang==='BN'?bn:en}</span></Link>)}</div>
<div style={{padding:'35px 0'}}><Link className="textlink" href="/">← {lang==='BN'?'হোমে ফিরে যান':'Back to Home'}</Link></div>
</main>}
