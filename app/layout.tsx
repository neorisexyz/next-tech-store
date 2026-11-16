import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'NEXT Tech | The Future, Solved.', description: 'Shop routers, ONU, Mini UPS and CCTV products at NEXT Tech Bangladesh.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
