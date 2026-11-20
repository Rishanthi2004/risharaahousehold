import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { Product, PRODUCTS } from '../data/catalog';

const STORAGE_KEY = 'risharaa_wishlist_v1';

interface WishlistContextValue {
  items: Product[];
  isDrawerOpen: boolean;
  totalCount: number;
  openDrawer: () => void;
  closeDrawer: () => void;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function loadStoredIds(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((id): id is string => typeof id === 'string');
    }
    return [];
  } catch {
    return [];
  }
}

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>(() => loadStoredIds());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // Ignore storage quota or private browsing errors
    }
  }, [savedIds]);

  const items = useMemo(() => {
    const productMap = new Map(PRODUCTS.map((p) => [p.id, p]));
    return savedIds
      .map((id) => productMap.get(id))
      .filter((p): p is Product => Boolean(p));
  }, [savedIds]);

  const savedIdSet = useMemo(() => new Set(savedIds), [savedIds]);

  const isWishlisted = useCallback(
    (productId: string) => savedIdSet.has(productId),
    [savedIdSet]
  );

  const toggleWishlist = useCallback((product: Product) => {
    setSavedIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [product.id, ...prev]
    );
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setSavedIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const clearWishlist = useCallback(() => {
    setSavedIds([]);
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        items,
        isDrawerOpen,
        totalCount: items.length,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        isWishlisted,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error('useWishlist must be used inside WishlistProvider');
  }
  return ctx;
}
