import { Router, Wifi, BatteryCharging, Camera, Monitor, Zap, Cable, ShieldCheck, type LucideIcon } from 'lucide-react';

export type StoreCategory = { name: string; bn: string; slug: string; Icon: LucideIcon };
export const categories: StoreCategory[] = [
  { name: 'Router', bn: 'রাউটার', slug: 'router', Icon: Router },
  { name: 'ONU / XPON ONU', bn: 'ONU / XPON ONU', slug: 'onu', Icon: Wifi },
  { name: 'Mini UPS', bn: 'মিনি UPS', slug: 'mini-ups', Icon: BatteryCharging },
  { name: 'CCTV IP Camera', bn: 'CCTV IP ক্যামেরা', slug: 'cctv-ip-camera', Icon: Camera },
  { name: 'Analog Camera', bn: 'অ্যানালগ ক্যামেরা', slug: 'analog-camera', Icon: Camera },
  { name: 'DVR / NVR / XVR', bn: 'DVR / NVR / XVR', slug: 'dvr-nvr-xvr', Icon: Monitor },
  { name: 'PoE Switch', bn: 'PoE সুইচ', slug: 'poe-switch', Icon: Zap },
  { name: 'Networking Accessories', bn: 'নেটওয়ার্কিং অ্যাক্সেসরিজ', slug: 'networking-accessories', Icon: Cable },
  { name: 'Camera Accessories', bn: 'ক্যামেরা অ্যাক্সেসরিজ', slug: 'camera-accessories', Icon: ShieldCheck },
];

export type CatalogProduct = {
  slug: string; name: string; bn: string; category: string; price: string;
  Icon: LucideIcon; tag: string; summary: string; features: string[];
  specs: [string, string][];
};
export const products: CatalogProduct[] = [
  { slug: 'dual-band-wifi-6-router', name: 'Dual-Band Wi-Fi 6 Router', bn: 'ডুয়াল-ব্যান্ড Wi-Fi 6 রাউটার', category: 'Router', price: '৳ 4,500', Icon: Router, tag: 'NETWORKING', summary: 'A wireless networking option for home and small-office connectivity.', features: ['Dual-band wireless category', 'For home and small office use', 'Confirm exact model before purchase'], specs: [['Product type', 'Wireless Router'], ['Category', 'Networking'], ['Use case', 'Home / Small Office']] },
  { slug: 'xpon-onu-1ge', name: 'XPON ONU 1GE', bn: 'XPON ONU 1GE', category: 'ONU / XPON ONU', price: '৳ 1,250', Icon: Wifi, tag: 'FIBER NETWORKING', summary: 'A compact fiber access terminal for compatible internet connections.', features: ['XPON fiber access category', '1 Gigabit Ethernet port class', 'Check ISP compatibility before purchase'], specs: [['Product type', 'XPON ONU'], ['Ethernet', '1 × GE'], ['Category', 'Fiber Networking']] },
  { slug: 'mini-ups-for-router', name: 'Mini UPS for Router', bn: 'রাউটারের জন্য মিনি UPS', category: 'Mini UPS', price: '৳ 1,650', Icon: BatteryCharging, tag: 'POWER BACKUP', summary: 'A compact backup-power option for compatible networking devices.', features: ['Backup power category', 'Compact design', 'Runtime depends on connected device'], specs: [['Product type', 'Mini UPS'], ['Typical use', 'Router / ONU'], ['Category', 'Power Backup']] },
  { slug: '2mp-smart-ip-camera', name: '2MP Smart IP Camera', bn: '2MP স্মার্ট IP ক্যামেরা', category: 'CCTV IP Camera', price: '৳ 2,850', Icon: Camera, tag: 'SMART SECURITY', summary: 'A network camera option for home, shop and office monitoring.', features: ['2MP resolution class', 'Network-based monitoring', 'Confirm exact model and features'], specs: [['Product type', 'IP Camera'], ['Resolution class', '2MP'], ['Category', 'CCTV & Security']] },
  { slug: 'outdoor-bullet-camera', name: 'Outdoor Bullet Camera', bn: 'আউটডোর বুলেট ক্যামেরা', category: 'Analog Camera', price: '৳ 1,850', Icon: Camera, tag: 'OUTDOOR SECURITY', summary: 'A bullet-style camera option for compatible analog CCTV installations.', features: ['Outdoor bullet form factor', 'For compatible analog CCTV systems', 'Confirm lens and night-vision details'], specs: [['Product type', 'Analog CCTV Camera'], ['Design', 'Bullet'], ['Category', 'CCTV & Security']] },
  { slug: '4-channel-network-recorder', name: '4 Channel Network Recorder', bn: '৪-চ্যানেল নেটওয়ার্ক রেকর্ডার', category: 'DVR / NVR / XVR', price: '৳ 4,900', Icon: Monitor, tag: 'RECORDING SOLUTION', summary: 'A recorder category for managing compatible security camera feeds.', features: ['4-channel class', 'For compatible surveillance cameras', 'Confirm DVR / NVR / XVR type'], specs: [['Product type', 'Video Recorder'], ['Channel class', '4 Channel'], ['Category', 'CCTV & Security']] },
  { slug: '8-port-poe-network-switch', name: '8-Port PoE Network Switch', bn: '৮-পোর্ট PoE নেটওয়ার্ক সুইচ', category: 'PoE Switch', price: '৳ 3,200', Icon: Zap, tag: 'NETWORKING', summary: 'A PoE switching option for compatible IP cameras and network devices.', features: ['8-port category', 'Power and data over Ethernet', 'Confirm PoE budget and port speed'], specs: [['Product type', 'PoE Switch'], ['Port class', '8-Port'], ['Category', 'Networking']] },
  { slug: 'gigabit-networking-cable', name: 'Gigabit Networking Cable', bn: 'গিগাবিট নেটওয়ার্কিং ক্যাবল', category: 'Networking Accessories', price: '৳ 450', Icon: Cable, tag: 'NETWORK ACCESSORY', summary: 'A wired Ethernet connectivity accessory for compatible network equipment.', features: ['Ethernet connectivity', 'For compatible gigabit equipment', 'Confirm length and cable category'], specs: [['Product type', 'Networking Cable'], ['Use', 'Ethernet connection'], ['Category', 'Accessories']] },
  { slug: 'cctv-power-adapter', name: 'CCTV Power Adapter', bn: 'CCTV পাওয়ার অ্যাডাপ্টার', category: 'Camera Accessories', price: '৳ 350', Icon: ShieldCheck, tag: 'CAMERA ACCESSORY', summary: 'A power accessory category for compatible CCTV camera installations.', features: ['CCTV power accessory', 'Compatibility varies by camera', 'Confirm voltage and current rating'], specs: [['Product type', 'CCTV Power Adapter'], ['Use', 'Camera power'], ['Category', 'Camera Accessories']] },
];
