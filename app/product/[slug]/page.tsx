import { notFound } from 'next/navigation';
import { ShieldCheck, Truck, Headphones, BadgeCheck, CheckCircle2 } from 'lucide-react';
import ProductActions from '../product-actions';
import { products } from '../../catalog';

export function generateStaticParams() { return products.map(p => ({ slug: p.slug })); }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find(x => x.slug === slug);
  if (!p) notFound();
  const Icon = p.Icon;
  return <main className="container product-detail-page">
    <section className="product-detail-layout">
      <div className="product-gallery"><div className="product-main-visual"><span className="product-visual-tag">{p.tag}</span><div className="product-detail-orb"><Icon size={142} strokeWidth={1.05} /></div><span className="visual-caption">NEXT TECH · PRODUCT PREVIEW</span></div><div className="product-gallery-note"><ShieldCheck size={17} /><span>Illustrative product preview. Actual product photos will be added to the catalogue.</span></div></div>
      <div className="product-detail-info"><div className="product-detail-category">{p.category}</div><h1>{p.name}</h1><div className="product-detail-rating"><span className="rating-stars">★★★★★</span><span>Product information preview</span></div><p className="product-detail-summary">{p.summary}</p><div className="product-detail-price-row"><strong>{p.price}</strong><span>Demo price — confirm before ordering</span></div><div className="product-detail-stock"><span className="stock-dot" />Availability will be confirmed before order</div><div className="product-detail-divider" /><ProductActions product={{ slug: p.slug, name: p.name, price: p.price, category: p.category }} /><div className="product-service-points"><div><Truck size={18} /><span><b>Delivery</b><small>Across Bangladesh</small></span></div><div><Headphones size={18} /><span><b>Support</b><small>Product assistance</small></span></div><div><BadgeCheck size={18} /><span><b>Shopping</b><small>Clear product details</small></span></div></div></div>
    </section>
    <section className="product-information-section"><div className="product-section-heading"><span>PRODUCT OVERVIEW</span><h2>Designed around your needs.</h2><p>{p.summary}</p></div><div className="product-information-grid"><article className="product-feature-card"><h3>Key highlights</h3>{p.features.map(feature => <div className="product-feature" key={feature}><CheckCircle2 size={17} /><span>{feature}</span></div>)}</article><article className="product-spec-card"><h3>Product information</h3>{p.specs.map(([label, value]) => <div className="product-spec-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}</article></div><p className="product-disclaimer">Demo catalogue entry: these sample names, prices and specifications are placeholders. Confirm the exact model, stock, specifications and price with NEXT TECH before purchase.</p></section>
  </main>;
}
