import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShortlist } from '../context/ShortlistContext';
import { useRouter } from '../context/RouterContext';
import { SafeImage } from './SafeImage';

export const ShortlistDrawer: React.FC = () => {
  const {
    items,
    totalCount,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearShortlist,
    setInquiryDraft,
  } = useShortlist();
  const { navigate } = useRouter();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  const handleProceedToInquiry = () => {
    const summaryLines = items.map(
      (i) => `- ${i.product.name} (${i.product.brand}) — Qty: ${i.quantity}`
    );
    setInquiryDraft(
      `Showroom Product Shortlist Inquiry:\n${summaryLines.join(
        '\n'
      )}\n\nPlease share showroom availability, details, and EMI options.`
    );
    closeDrawer();
    navigate('/contact');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Showroom Shortlist"
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
            <div className="px-6 py-5 border-b border-[#EFE6D8] flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#231B15]">
                  Showroom Shortlist
                </h2>
                <p className="text-xs text-[#7C6F63]">
                  Save products to inquire at RISHARAA showroom
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close shortlist drawer"
                className="w-10 h-10 rounded-lg border border-[#E7DCCB] inline-flex items-center justify-center text-[#231B15] hover:bg-[#F6EDE3] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-2xl bg-[#F6EDE3] flex items-center justify-center mb-4">
                    <ShoppingBag className="w-6 h-6 text-[#B87B14]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#231B15] mb-1.5">
                    Your shortlist is empty
                  </h3>
                  <p className="text-sm text-[#5A4E44] max-w-xs mb-6">
                    Explore our kitchen appliances, furniture, cooling electronics, and luggage to
                    save favorites here.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      navigate('/products');
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#F2BA49] text-[#231B15] text-sm font-semibold hover:bg-[#E5A72B] transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map(({ product, quantity }) => (
                    <li
                      key={product.id}
                      className="flex gap-4 p-3.5 rounded-xl bg-white border border-[#EFE7DA]"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#FAF6F0] shrink-0">
                        <SafeImage
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-[#7C6F63] truncate">
                          {product.brand} · {product.subcategory}
                        </div>
                        <h4 className="text-sm font-semibold text-[#231B15] truncate mt-0.5">
                          {product.name}
                        </h4>
                        <div className="flex items-center justify-between mt-3">
                          <div className="inline-flex items-center rounded-lg border border-[#E7DCCB] bg-[#FFFBF5]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, -1)}
                              aria-label={`Decrease quantity of ${product.name}`}
                              className="w-7 h-7 inline-flex items-center justify-center text-[#5A4E44] hover:text-[#231B15]"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold tabular-nums text-[#231B15]">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, 1)}
                              aria-label={`Increase quantity of ${product.name}`}
                              className="w-7 h-7 inline-flex items-center justify-center text-[#5A4E44] hover:text-[#231B15]"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            aria-label={`Remove ${product.name}`}
                            className="p-1.5 text-[#7C6F63] hover:text-[#B91C1C] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer Summary (Prices Removed) */}
            {items.length > 0 && (
              <div className="px-6 py-5 bg-white border-t border-[#EFE6D8] space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#5A4E44]">Selected Showroom Items</span>
                    <span className="text-base font-bold text-[#231B15] tabular-nums">
                      {totalCount} {totalCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <p className="text-xs text-[#7C6F63]">
                    Bajaj Finserv EMI options available at RISHARAA showroom (demo feature).
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={clearShortlist}
                    className="px-4 py-3 rounded-full border border-[#E7DCCB] text-xs font-medium text-[#5A4E44] hover:bg-[#F6EDE3] transition-colors whitespace-nowrap"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedToInquiry}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#F2BA49] text-[#231B15] font-semibold text-sm hover:bg-[#E5A72B] transition-colors whitespace-nowrap"
                  >
                    <span>Send Showroom Inquiry</span>
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
