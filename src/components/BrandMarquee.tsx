import React from 'react';
import { BRANDS } from '../data/catalog';
import { useRouter } from '../context/RouterContext';
import { BrandWordmark } from './BrandLogoMark';

interface BrandMarqueeProps {
  compact?: boolean;
}

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ compact = false }) => {
  const { navigate } = useRouter();
  const trackBrands = [...BRANDS, ...BRANDS];

  return (
    <div className="w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#F6EDE3] border border-[#EADCD0]">
      <div className="flex flex-col md:flex-row items-stretch">
        {/* Left label block */}
        <div
          className={`shrink-0 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center gap-1.5 px-4 sm:px-6 ${
            compact ? 'py-2.5 sm:py-4 md:py-5' : 'py-3 sm:py-5 md:py-6'
          } border-b md:border-b-0 md:border-r border-[#E4D5C6] bg-[#F1E5D8]/70`}
        >
          <span className="text-xs sm:text-sm font-semibold text-[#231B15] leading-snug whitespace-nowrap">
            Our Trusted Brands
          </span>
          <button
            type="button"
            onClick={() => navigate('/about', { section: 'brands' })}
            className="text-[11px] sm:text-xs font-semibold text-[#B87B14] hover:text-[#231B15] transition-colors whitespace-nowrap"
          >
            View all brands &rarr;
          </button>
        </div>

        {/* Animated scrolling logo strip */}
        <div className="relative flex-1 overflow-hidden py-3 sm:py-5">
          {/* Soft side fade masks */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-10 bg-gradient-to-r from-[#F6EDE3] to-transparent z-10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-10 bg-gradient-to-l from-[#F6EDE3] to-transparent z-10"
          />

          <div className="animate-risharaa-marquee flex items-center">
            {trackBrands.map((brand, idx) => (
              <button
                key={`${brand.id}-${idx}`}
                type="button"
                onClick={() => navigate('/products', { brand: brand.name })}
                title={`Browse ${brand.name} products`}
                className="mx-4 sm:mx-9 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A829] shrink-0"
              >
                <BrandWordmark brandName={brand.name} size="md" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
