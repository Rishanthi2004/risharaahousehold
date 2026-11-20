import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '../data/catalog';
import { SafeImage } from './SafeImage';
import { useShortlist } from '../context/ShortlistContext';
import { useRouter } from '../context/RouterContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addItem, setInquiryDraft, openDrawer } = useShortlist();
  const { navigate } = useRouter();

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, onClose]);

  const handleAddToShortlist = () => {
    if (!product) return;
    addItem(product);
    onClose();
    openDrawer();
  };

  const handleShowroomInquiry = () => {
    if (!product) return;
    setInquiryDraft(
      `I would like to inquire about "${product.name}" (${product.brand} — ${product.categoryName}). Please share showroom availability, details, and EMI options.`
    );
    onClose();
    navigate('/contact');
  };

  return (
    <AnimatePresence>
      {product && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#231B15]/65 backdrop-blur-xs"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FFFBF5] rounded-2xl shadow-2xl border border-[#EAE0D2]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close product details"
              className="absolute top-4 right-4 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/95 text-[#231B15] border border-[#EAE0D2] hover:bg-[#231B15] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A829]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Left Product Visual */}
              <div className="md:col-span-6 bg-[#F6EFE6] flex items-center justify-center h-52 sm:h-72 md:h-auto md:min-h-[440px]">
                <SafeImage
                  src={product.image}
                  alt={product.name}
                  fallbackLabel={product.name}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Contiguous Details Module (Prices Removed) */}
              <div className="md:col-span-6 p-4 sm:p-8 flex flex-col">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#7C6F63] mb-1.5 sm:mb-2">
                  <span>{product.categoryName}</span>
                  <span aria-hidden="true">/</span>
                  <span>{product.subcategory}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[#B87B14]">{product.brand}</span>
                </div>

                <h2
                  id="product-modal-title"
                  className="font-serif text-xl sm:text-[28px] font-semibold text-[#231B15] leading-tight pb-3 sm:pb-5 mb-3 sm:mb-5 border-b border-[#EFE6D8]"
                >
                  {product.name}
                </h2>

                <p className="text-xs sm:text-sm text-[#4A4038] leading-relaxed mb-4 sm:mb-5">
                  {product.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  <div className="text-xs font-semibold text-[#231B15] tracking-wide">
                    Showroom Highlights
                  </div>
                  <ul className="space-y-2">
                    {product.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#4A4038]">
                        <CheckCircle2 className="w-4 h-4 text-[#C68616] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bajaj Finserv Demo EMI Note (No price numbers) */}
                {product.emiEligible && (
                  <div className="p-3.5 rounded-xl bg-[#F6EDE3] border border-[#EADCD0] mb-6 flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-[#B87B14] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#4A4038] leading-relaxed">
                      <span className="font-semibold text-[#231B15]">
                        EMI Payment Options Available (Demo Feature):
                      </span>{' '}
                      Flexible Bajaj Finserv EMI plans are available at the RISHARAA showroom desk.
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-auto pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleAddToShortlist}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#F2BA49] text-[#231B15] font-semibold text-sm hover:bg-[#E5A72B] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#231B15]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shortlist</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleShowroomInquiry}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#241D18] text-white font-medium text-sm hover:bg-[#3A2F27] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2BA49]"
                  >
                    <span>Inquire in Showroom</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
