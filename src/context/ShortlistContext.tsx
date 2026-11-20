import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Product } from '../data/catalog';

export interface ShortlistItem {
  product: Product;
  quantity: number;
}

interface ShortlistContextValue {
  items: ShortlistItem[];
  isDrawerOpen: boolean;
  totalCount: number;
  inquiryDraft: string;
  setInquiryDraft: (draft: string) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearShortlist: () => void;
}

const ShortlistContext = createContext<ShortlistContextValue | null>(null);

export const ShortlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ShortlistItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [inquiryDraft, setInquiryDraft] = useState('');

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === productId ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearShortlist = useCallback(() => {
    setItems([]);
  }, []);

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return (
    <ShortlistContext.Provider
      value={{
        items,
        isDrawerOpen,
        totalCount,
        inquiryDraft,
        setInquiryDraft,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        addItem,
        removeItem,
        updateQuantity,
        clearShortlist,
      }}
    >
      {children}
    </ShortlistContext.Provider>
  );
};

export function useShortlist(): ShortlistContextValue {
  const ctx = useContext(ShortlistContext);
  if (!ctx) {
    throw new Error('useShortlist must be used inside ShortlistProvider');
  }
  return ctx;
}
