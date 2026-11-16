import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Router, Wifi, BatteryCharging, Camera, Monitor, Zap, Cable } from 'lucide-react';
const products=[
{slug:'dual-band-wifi-6-router',name:'Dual-Band Wi-Fi 6 Router',category:'Router',price:'৳ 4,500',Icon:Router},
{slug:'xpon-onu-1ge',name:'XPON ONU 1GE',category:'ONU / XPON ONU',price:'৳ 1,250',Icon:Wifi},
{slug:'mini-ups-for-router',name:'Mini UPS for Router',category:'Mini UPS',price:'৳ 1,650',Icon:BatteryCharging},
{slug:'2mp-smart-ip-camera',name:'2MP Smart IP Camera',category:'CCTV IP Camera',price:'৳ 2,850',Icon:Camera},
{slug:'8-port-poe-network-switch',name:'8-Port PoE Network Switch',category:'PoE Switch',price:'৳ 3,200',Icon:Zap},
{slug:'4-channel-network-recorder',name:'4 Channel Network Recorder',category:'DVR / NVR / XVR',price:'৳ 4,900',Icon:Monitor},
{slug:'outdoor-bullet-camera',name:'Outdoor Bullet Camera',category:'Analog Camera',price:'৳ 1,850',Icon:Camera},
{slug:'gigabit-networking-cable',name:'Gigabit Networking Cable',category:'Networking Accessories',price:'৳ 450',Icon:Cable}
];
export function generateStaticParams(){return products.map(p=>({slug:p.slug}));}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=products.find(x=>x.slug===slug);if(!p)notFound();const Icon=p.Icon;return <main className="container" style={{paddingTop:30,minHeight:'75vh'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:30}}><Link className="brand" href="/"><strong><span className="brand-next">NEXT</span><span className="brand-tech">TECH</span></strong></Link><Link className="textlink" href="/shop">Shop All</Link></div><div className="hero" style={{minHeight:360,padding:35,alignItems:'center'}}><div className="hero-copy" style={{padding:15}}><div className="eyebrow">{p.category}</div><h1 style={{fontSize:38}}>{p.name}</h1><p>Product information, specifications and availability will be updated when the live product catalogue is connected.</p><h2 style={{color:'var(--navy)'}}>{p.price}</h2><Link className="btn primary" href="/cart">Add to Cart</Link></div><div className="hero-art"><div className="orb"><Icon size={105} strokeWidth={1.2}/></div></div></div><p style={{color:'var(--muted)',fontSize:12,marginTop:25}}>Demo product preview — final price, stock and specifications are subject to confirmation.</p><Link className="textlink" href="/shop">← Back to Shop</Link></main>}
