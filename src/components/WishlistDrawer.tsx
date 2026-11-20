import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { Product } from '../data/catalog';
import { useWishlist } from '../context/WishlistContext';
import { useShortlist } from '../context/ShortlistContext';
import { useRouter } from '../context/RouterContext';
import { SafeImage } from './SafeImage';

interface WishlistDrawerProps {
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ onSelectProduct }) => {
  const {
    items,
    totalCount,
    isDrawerOpen,
    closeDrawer,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();
  const { addItem, openDrawer: openShortlistDrawer } = useShortlist();
  const { navigate } = useRouter();
  const [movedIds, setMovedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  const handleAddToShortlist = (product: Product) => {
    addItem(product);
    setMovedIds((prev) => ({ ...prev, [product.id]: true }));
    window.setTimeout(() => {
      setMovedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  const handleAddAllToShortlist = () => {
    items.forEach((product) => addItem(product));
    closeDrawer();
    openShortlistDrawer();
  };

  const handleInspectProduct = (product: Product) => {
    closeDrawer();
    onSelectProduct(product);
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Saved Wishlist"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-[#231B15]/55 backdrop-blur-xs"
          />

          {/* Slide-over Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-[#FFFBF5] h-full shadow-2xl border-l border-[#EAE0D2] flex flex-col"
          >
            {/* Header */}
            <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-[#EFE6D8] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#FDECEC] text-[#D93848] inline-flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 fill-[#D93848]" />
                </div>
                <div>
                  <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#231B15]">
                    My Wishlist
                  </h2>
                  <p className="text-xs text-[#7C6F63]">
                    Your favorite RISHARAA showroom picks
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close wishlist drawer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-[#E7DCCB] inline-flex items-center justify-center text-[#231B15] hover:bg-[#F6EDE3] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 sm:py-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-2xl bg-[#FDECEC] flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-[#D93848]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#231B15] mb-1.5">
                    Your wishlist is empty
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A4E44] max-w-xs mb-6">
                    Tap the heart icon on any appliance, furniture piece, fan, or travel bag to save
                    it here for quick comparison.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      navigate('/products');
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#F2BA49] text-[#231B15] text-sm font-semibold hover:bg-[#E5A72B] transition-colors"
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                <ul className="space-y-3.5">
                  {items.map((product) => {
                    const justAdded = Boolean(movedIds[product.id]);
                    return (
                      <li
                        key={product.id}
                        className="flex gap-3.5 p-3 sm:p-3.5 rounded-xl bg-white border border-[#EFE7DA]"
                      >
                        <button
                          type="button"
                          onClick={() => handleInspectProduct(product)}
                          className="w-20 h-20 rounded-lg overflow-hidden bg-[#FAF6F0] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A829]"
                        >
                          <SafeImage
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </button>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="text-[11px] text-[#7C6F63] truncate">
                              {product.brand} · {product.subcategory}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleInspectProduct(product)}
                              className="text-left text-sm font-semibold text-[#231B15] hover:text-[#B87B14] transition-colors line-clamp-1 mt-0.5"
                            >
                              {product.name}
                            </button>
                          </div>

                          <div className="flex items-center justify-between gap-2 mt-2.5">
                            <button
                              type="button"
                              onClick={() => handleAddToShortlist(product)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
                                justAdded
                                  ? 'bg-[#231B15] text-[#F2BA49]'
                                  : 'bg-[#F6EDE3] text-[#231B15] hover:bg-[#F2BA49]'
                              }`}
                            >
                              {justAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>In Shortlist</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-3.5 h-3.5" />
                                  <span>Add to Shortlist</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => removeFromWishlist(product.id)}
                              aria-label={`Remove ${product.name} from wishlist`}
                              className="p-1.5 text-[#7C6F63] hover:text-[#D93848] transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer Actions */}
            {items.length > 0 && (
              <div className="px-5 sm:px-6 py-4 sm:py-5 bg-white border-t border-[#EFE6D8] space-y-3.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5A4E44]">Saved Wishlist Items</span>
                  <span className="text-base font-bold text-[#231B15] tabular-nums">
                    {totalCount} {totalCount === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={clearWishlist}
                    className="px-4 py-2.5 sm:py-3 rounded-full border border-[#E7DCCB] text-xs font-medium text-[#5A4E44] hover:bg-[#F6EDE3] transition-colors whitespace-nowrap"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={handleAddAllToShortlist}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#F2BA49] text-[#231B15] font-semibold text-xs sm:text-sm hover:bg-[#E5A72B] transition-colors whitespace-nowrap"
                  >
                    <span>Move All to Shortlist</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
