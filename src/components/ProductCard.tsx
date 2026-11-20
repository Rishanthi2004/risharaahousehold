import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Check, Eye, ArrowRight } from 'lucide-react';
import { Product } from '../data/catalog';
import { SafeImage } from './SafeImage';
import { useShortlist } from '../context/ShortlistContext';
import { SCROLL_VIEWPORT } from './ScrollReveal';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  showDescription?: boolean;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  showDescription = false,
  index = 0,
}) => {
  const { addItem } = useShortlist();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={SCROLL_VIEWPORT}
      transition={{ duration: 0.45, delay: Math.min((index % 4) * 0.05, 0.16), ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col bg-white rounded-xl sm:rounded-2xl border border-[#EFE7DA] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(35,27,21,0.08)]"
    >
      {/* Uniform 4:3 Product Image Area */}
      <div
        onClick={() => onViewDetails(product)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onViewDetails(product);
          }
        }}
        aria-label={`View details for ${product.name}`}
        className="relative aspect-[4/3] w-full bg-[#FAF6F0] overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E8A829]"
      >
        <SafeImage
          src={product.image}
          alt={product.name}
          fallbackLabel={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#231B15]/0 group-hover:bg-[#231B15]/10 transition-colors duration-200" />
        <span className="hidden sm:inline-flex pointer-events-none absolute bottom-3 left-3 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 text-[#231B15] text-xs font-medium opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-sm">
          <Eye className="w-3.5 h-3.5 text-[#C68616]" />
          <span>View Details</span>
        </span>
      </div>

      {/* Product Body (Compact on Mobile, Prices Removed) */}
      <div className="flex flex-col flex-1 p-2.5 sm:p-5">
        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-[#7C6F63] mb-1 sm:mb-1.5 truncate">
          <span className="truncate">{product.subcategory}</span>
          <span aria-hidden="true">·</span>
          <span className="font-medium text-[#5A4E44] truncate">{product.brand}</span>
        </div>

        <h3 className="text-[13px] sm:text-base font-semibold text-[#231B15] leading-snug line-clamp-2 mb-1 sm:mb-1.5">
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="text-left hover:text-[#C68616] transition-colors focus-visible:outline-none focus-visible:underline"
          >
            {product.name}
          </button>
        </h3>

        {showDescription && (
          <p className="hidden sm:line-clamp-2 text-xs sm:text-sm text-[#5A4E44] leading-relaxed mb-3">
            {product.description}
          </p>
        )}

        {/* Footer actions baseline */}
        <div className="mt-auto pt-2 sm:pt-3 border-t border-[#F4EDE3] flex items-center justify-between gap-1.5">
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="inline-flex items-center gap-1 text-[11px] sm:text-sm font-semibold text-[#B87B14] hover:text-[#231B15] transition-colors whitespace-nowrap"
          >
            <span className="sm:hidden">Details</span>
            <span className="hidden sm:inline">View Details</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to shortlist`}
            className={`inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full border transition-colors duration-150 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A829] ${
              justAdded
                ? 'bg-[#231B15] border-[#231B15] text-[#F2BA49]'
                : 'bg-[#FDF9F2] border-[#EADFD0] text-[#231B15] hover:bg-[#F2BA49] hover:border-[#F2BA49]'
            }`}
          >
            {justAdded ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
        </div>
      </div>
    </motion.article>
  );
};
