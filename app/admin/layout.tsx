'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Tags, Settings, Store } from 'lucide-react';

const navItems=[
 {href:'/admin',label:'Dashboard',Icon:LayoutDashboard},
 {href:'/admin/products',label:'Products',Icon:Package},
 {href:'/admin/categories',label:'Categories',Icon:Tags},
 {href:'/admin/settings',label:'Settings',Icon:Settings},
];

export default function AdminLayout({children}:{children:ReactNode}){
 const pathname=usePathname();
 return <div className="admin-shell">
  <aside className="admin-sidebar">
   <Link href="/admin" className="admin-logo"><span>NEXT</span> <b>TECH</b><small>ADMIN WORKSPACE</small></Link>
   <div className="admin-nav-label">WORKSPACE</div>
   <nav className="admin-nav" aria-label="Admin navigation">
    {navItems.map(({href,label,Icon})=><Link key={href} href={href} className={'admin-nav-item'+(pathname===href?' active':'')} aria-current={pathname===href?'page':undefined}><Icon size={17}/><span>{label}</span></Link>)}
   </nav>
   <div className="admin-nav-label admin-store-label">STORE</div>
   <Link href="/" className="admin-nav-item admin-store-link"><Store size={17}/><span>View Store</span></Link>
   <div className="admin-sidebar-foot">NEXT TECH<br/><span>Store management</span></div>
  </aside>
  <main className="admin-main">
   <header className="admin-topbar"><div><span className="admin-topbar-kicker">MANAGEMENT CONSOLE</span><strong>Store Admin</strong></div><Link href="/" className="admin-view-store"><Store size={15}/> <span>View Store</span></Link></header>
   {children}
  </main>
 </div>;
}
