import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from './store-context';
export const metadata: Metadata = { title: 'NEXT Tech | The Future, Solved.', description: 'Shop routers, ONU, Mini UPS and CCTV products at NEXT Tech Bangladesh.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><StoreProvider>{children}</StoreProvider></body></html>; }
