import Link from 'next/link';
import {
  ArrowUpRight, Package, Tags, ShoppingCart, Users, Plus,
  ExternalLink, ChartNoAxesCombined, ClipboardList, Settings2,
  CircleHelp, Boxes, Clock3, ShieldCheck
} from 'lucide-react';
import { products, categories } from '../catalog';

const unavailableStats = [
  { label: 'Orders', value: '—', note: 'Connect order database', Icon: ShoppingCart },
  { label: 'Customers', value: '—', note: 'Customer data not connected', Icon: Users },
];

const quickActions = [
  { href: '/admin/products', label: 'Manage products', detail: 'Review the product catalogue', Icon: Package },
  { href: '/admin/categories', label: 'Manage categories', detail: 'Browse store categories', Icon: Tags },
  { href: '/admin/settings', label: 'Store settings', detail: 'Review current store setup', Icon: Settings2 },
];

export default function AdminDashboard() {
  const stats = [
    { label: 'Catalogue products', value: String(products.length), note: 'Sample catalogue entries', Icon: Package, tone: 'blue' },
    { label: 'Categories', value: String(categories.length), note: 'Store categories configured', Icon: Tags, tone: 'sky' },
    ...unavailableStats.map(({ label, value, note, Icon }) => ({ label, value, note, Icon, tone: 'muted' })),
  ];

  return (
    <div className="admin-content admin-dashboard">
      <div className="admin-page-heading">
        <div>
          <div className="admin-eyebrow">STORE OVERVIEW</div>
          <h1>Dashboard</h1>
          <p>A clear overview of your NEXT TECH store workspace.</p>
        </div>
        <Link className="admin-primary-btn" href="/admin/products">
          <Plus size={16} /> Manage catalogue
        </Link>
      </div>

      <div className="admin-dashboard-notice">
        <span className="admin-dashboard-notice-icon"><ShieldCheck size={18} /></span>
        <div>
          <strong>Dashboard preview mode</strong>
          <p>Product and category totals come from the current demo catalogue. Live sales, orders, customer and inventory metrics will appear after database and admin authentication are connected.</p>
        </div>
      </div>

      <section className="admin-dashboard-stats" aria-label="Store statistics">
        {stats.map(({ label, value, note, Icon, tone }) => (
          <article className="admin-dashboard-stat" key={label}>
            <div className="admin-dashboard-stat-head">
              <span>{label}</span>
              <span className={'admin-dashboard-stat-icon ' + tone}><Icon size={18} /></span>
            </div>
            <strong>{value}</strong>
            <small>{note}</small>
          </article>
        ))}
      </section>

      <div className="admin-dashboard-main-grid">
        <section className="admin-dashboard-card admin-sales-card">
          <div className="admin-dashboard-card-heading">
            <div>
              <span className="admin-dashboard-section-label">PERFORMANCE</span>
              <h2>Sales overview</h2>
              <p>Revenue and sales trends will be shown here.</p>
            </div>
            <span className="admin-dashboard-period">Live data pending</span>
          </div>
          <div className="admin-dashboard-empty-chart">
            <span><ChartNoAxesCombined size={27} /></span>
            <strong>Sales analytics are not connected yet</strong>
            <p>Once order and payment data are connected, this area will show revenue, order volume and sales trends.</p>
          </div>
        </section>

        <section className="admin-dashboard-card admin-orders-card">
          <div className="admin-dashboard-card-heading">
            <div>
              <span className="admin-dashboard-section-label">FULFILMENT</span>
              <h2>Order status</h2>
              <p>Order pipeline summary</p>
            </div>
            <span className="admin-dashboard-heading-icon"><ClipboardList size={18} /></span>
          </div>
          <div className="admin-dashboard-order-empty">
            <span><Clock3 size={22} /></span>
            <strong>No live order data</strong>
            <p>Order counts by status will appear after the order system is connected.</p>
          </div>
          <div className="admin-dashboard-card-foot">
            <span>Order management</span>
            <span className="admin-coming-soon">Not connected</span>
          </div>
        </section>
      </div>

      <div className="admin-dashboard-bottom-grid">
        <section className="admin-dashboard-card">
          <div className="admin-dashboard-card-heading">
            <div>
              <span className="admin-dashboard-section-label">CATALOGUE</span>
              <h2>Recent products</h2>
              <p>Latest entries in the sample catalogue</p>
            </div>
            <Link href="/admin/products" className="admin-dashboard-text-link">View all <ArrowUpRight size={14} /></Link>
          </div>
          <div className="admin-dashboard-product-list">
            {products.slice(0, 4).map((product) => (
              <div className="admin-dashboard-product-row" key={product.slug}>
                <span className="admin-dashboard-product-icon"><product.Icon size={18} /></span>
                <span className="admin-dashboard-product-name"><strong>{product.name}</strong><small>{product.category}</small></span>
                <strong className="admin-dashboard-product-price">{product.price}</strong>
              </div>
            ))}
          </div>
          <div className="admin-dashboard-card-foot">
            <span><Boxes size={14} /> {products.length} demo catalogue entries</span>
            <span className="admin-coming-soon">Sample data</span>
          </div>
        </section>

        <section className="admin-dashboard-card admin-quick-actions-card">
          <div className="admin-dashboard-card-heading">
            <div>
              <span className="admin-dashboard-section-label">SHORTCUTS</span>
              <h2>Quick actions</h2>
              <p>Jump to a store management area</p>
            </div>
          </div>
          <div className="admin-dashboard-actions">
            {quickActions.map(({ href, label, detail, Icon }) => (
              <Link href={href} key={href} className="admin-dashboard-action">
                <span><Icon size={17} /></span>
                <span className="admin-dashboard-action-copy"><strong>{label}</strong><small>{detail}</small></span>
                <ArrowUpRight size={15} />
              </Link>
            ))}
          </div>
          <div className="admin-dashboard-help">
            <CircleHelp size={16} />
            <span>Need live reports? Connect the store database in the next setup phase.</span>
          </div>
        </section>
      </div>

      <div className="admin-dashboard-footer-link">
        <span>Want to see the customer experience?</span>
        <Link href="/"><ExternalLink size={14} /> Open storefront</Link>
      </div>
    </div>
  );
}
