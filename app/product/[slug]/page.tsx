import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Router, Wifi, BatteryCharging, Camera, Monitor, Zap, Cable, ShieldCheck, Truck, Headphones, BadgeCheck, ChevronRight, CheckCircle2 } from 'lucide-react';
import ProductActions from '../product-actions';

const products=[
{slug:'dual-band-wifi-6-router',name:'Dual-Band Wi-Fi 6 Router',category:'Router',price:'৳ 4,500',Icon:Router,tag:'NETWORKING',summary:'A reliable wireless networking solution for smoother streaming, online work and everyday connectivity.',features:['Dual-band wireless connectivity','Designed for home and small office use','Simple setup and everyday management'],specs:[['Product type','Wireless Router'],['Category','Networking'],['Use case','Home / Small Office']]},
{slug:'xpon-onu-1ge',name:'XPON ONU 1GE',category:'ONU / XPON ONU',price:'৳ 1,250',Icon:Wifi,tag:'FIBER NETWORKING',summary:'A compact fiber access terminal designed to connect your compatible fiber internet line to a wired network.',features:['XPON fiber access device','1 Gigabit Ethernet port','Compact desktop form factor'],specs:[['Product type','XPON ONU'],['Ethernet','1 × GE'],['Category','Fiber Networking']]},
{slug:'mini-ups-for-router',name:'Mini UPS for Router',category:'Mini UPS',price:'৳ 1,650',Icon:BatteryCharging,tag:'POWER BACKUP',summary:'Keep essential networking equipment powered during short power interruptions with a practical backup solution.',features:['Backup power for compatible devices','Compact space-saving design','Suitable for router setups'],specs:[['Product type','Mini UPS'],['Typical use','Router / ONU'],['Category','Power Backup']]},
{slug:'2mp-smart-ip-camera',name:'2MP Smart IP Camera',category:'CCTV IP Camera',price:'৳ 2,850',Icon:Camera,tag:'SMART SECURITY',summary:'A network camera option for monitoring home, shop or office spaces with a compatible surveillance setup.',features:['2MP camera category','Network-based video monitoring','For home and business security setups'],specs:[['Product type','IP Camera'],['Resolution class','2MP'],['Category','CCTV & Security']]},
{slug:'8-port-poe-network-switch',name:'8-Port PoE Network Switch',category:'PoE Switch',price:'৳ 3,200',Icon:Zap,tag:'NETWORKING',summary:'A practical PoE switching option for connecting compatible network devices such as IP cameras and access points.',features:['8-port switch category','Power and data over Ethernet for compatible devices','Useful for CCTV and network installations'],specs:[['Product type','PoE Switch'],['Port class','8-Port'],['Category','Networking']]},
{slug:'4-channel-network-recorder',name:'4 Channel Network Recorder',category:'DVR / NVR / XVR',price:'৳ 4,900',Icon:Monitor,tag:'RECORDING SOLUTION',summary:'A compact recorder category for organizing and recording compatible security camera feeds.',features:['4-channel recorder category','For compatible surveillance cameras','Designed for security monitoring setups'],specs:[['Product type','Network Recorder'],['Channel class','4 Channel'],['Category','CCTV & Security']]},
{slug:'outdoor-bullet-camera',name:'Outdoor Bullet Camera',category:'Analog Camera',price:'৳ 1,850',Icon:Camera,tag:'OUTDOOR SECURITY',summary:'A bullet-style camera option for outdoor-facing surveillance installations and property monitoring.',features:['Outdoor bullet camera form','For compatible analog CCTV systems','Suitable for perimeter monitoring'],specs:[['Product type','Analog CCTV Camera'],['Design','Bullet'],['Category','CCTV & Security']]},
{slug:'gigabit-networking-cable',name:'Gigabit Networking Cable',category:'Networking Accessories',price:'৳ 450',Icon:Cable,tag:'NETWORK ACCESSORY',summary:'A networking cable option for wired connections between compatible routers, switches and devices.',features:['Wired Ethernet connectivity','For compatible gigabit network equipment','Useful for home and office networks'],specs:[['Product type','Networking Cable'],['Use','Ethernet connection'],['Category','Accessories']]}
];
export function generateStaticParams(){return products.map(p=>({slug:p.slug}));}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=products.find(x=>x.slug===slug);if(!p)notFound();const Icon=p.Icon;
 return <main className="container product-detail-page">
  <header className="product-page-header"><Link className="brand" href="/" aria-label="NEXT TECH"><strong><span className="brand-next">NEXT</span><span className="brand-tech">TECH</span></strong></Link><Link className="product-back-link" href="/shop">Continue Shopping <ChevronRight size={15}/></Link></header>
  <nav className="product-breadcrumb"><Link href="/">Home</Link><ChevronRight size={13}/><Link href="/categories">Categories</Link><ChevronRight size={13}/><span>{p.category}</span></nav>
  <section className="product-detail-layout">
   <div className="product-gallery">
    <div className="product-main-visual"><span className="product-visual-tag">{p.tag}</span><div className="product-detail-orb"><Icon size={142} strokeWidth={1.05}/></div><span className="visual-caption">NEXT TECH · PRODUCT PREVIEW</span></div>
    <div className="product-gallery-note"><ShieldCheck size={17}/><span>Product photos and exact model specifications will be added to the live catalogue.</span></div>
   </div>
   <div className="product-detail-info">
    <div className="product-detail-category">{p.category}</div><h1>{p.name}</h1><div className="product-detail-rating"><span className="rating-stars">★★★★★</span><span>Product information preview</span></div>
    <p className="product-detail-summary">{p.summary}</p>
    <div className="product-detail-price-row"><strong>{p.price}</strong><span>Price shown for demo</span></div>
    <div className="product-detail-stock"><span className="stock-dot"/>Availability will be confirmed before order</div>
    <div className="product-detail-divider"/>
    <ProductActions product={{slug:p.slug,name:p.name,price:p.price,category:p.category}}/>
    <div className="product-service-points"><div><Truck size={18}/><span><b>Delivery</b><small>Across Bangladesh</small></span></div><div><Headphones size={18}/><span><b>Support</b><small>Product assistance</small></span></div><div><BadgeCheck size={18}/><span><b>Shopping</b><small>Clear product details</small></span></div></div>
   </div>
  </section>
  <section className="product-information-section"><div className="product-section-heading"><span>PRODUCT OVERVIEW</span><h2>Designed around your needs.</h2><p>{p.summary}</p></div><div className="product-information-grid"><article className="product-feature-card"><h3>Key highlights</h3>{p.features.map(feature=><div className="product-feature" key={feature}><CheckCircle2 size={17}/><span>{feature}</span></div>)}</article><article className="product-spec-card"><h3>Product information</h3>{p.specs.map(([label,value])=><div className="product-spec-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}</article></div><p className="product-disclaimer">Demo catalogue entry: final model, technical specifications, stock and price must be confirmed by NEXT TECH before purchase.</p></section>
  <div className="product-bottom-link"><Link href="/shop">← Back to all products</Link></div>
 </main>;
}
