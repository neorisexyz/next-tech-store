'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type StoreProduct = { slug: string; name: string; price: string; category?: string };
type CartLine = StoreProduct & { quantity: number };
type StoreContextValue = {
  cartItems: CartLine[];
  wishlistItems: StoreProduct[];
  cartCount: number;
  addToCart: (product: StoreProduct, quantity?: number) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeFromCart: (slug: string) => void;
  toggleWishlist: (product: StoreProduct) => void;
  isWishlisted: (slug: string) => boolean;
  removeFromWishlist: (slug: string) => void;
};
const StoreContext = createContext<StoreContextValue | null>(null);
const CART_KEY = 'next-tech-cart-v1';
const WISHLIST_KEY = 'next-tech-wishlist-v1';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartLine[]>([]);
  const [wishlistItems, setWishlistItems] = useState<StoreProduct[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
      if (Array.isArray(cart)) setCartItems(cart);
      if (Array.isArray(wishlist)) setWishlistItems(wishlist);
    } catch {
      localStorage.removeItem(CART_KEY);
      localStorage.removeItem(WISHLIST_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems));
  }, [cartItems, wishlistItems, ready]);

  const value = useMemo<StoreContextValue>(() => ({
    cartItems,
    wishlistItems,
    cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    addToCart: (product, quantity = 1) => setCartItems(current => {
      const existing = current.find(item => item.slug === product.slug);
      return existing
        ? current.map(item => item.slug === product.slug ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { ...product, quantity }];
    }),
    updateQuantity: (slug, quantity) => setCartItems(current => quantity < 1
      ? current.filter(item => item.slug !== slug)
      : current.map(item => item.slug === slug ? { ...item, quantity } : item)),
    removeFromCart: slug => setCartItems(current => current.filter(item => item.slug !== slug)),
    toggleWishlist: product => setWishlistItems(current => current.some(item => item.slug === product.slug)
      ? current.filter(item => item.slug !== product.slug)
      : [...current, product]),
    isWishlisted: slug => wishlistItems.some(item => item.slug === slug),
    removeFromWishlist: slug => setWishlistItems(current => current.filter(item => item.slug !== slug))
  }), [cartItems, wishlistItems]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used inside StoreProvider');
  return context;
}
