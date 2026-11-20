import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Gem,
  ShieldCheck,
  Award,
  ShoppingBag,
  CreditCard,
} from 'lucide-react';
import {
  CATEGORIES,
  PRODUCTS,
  SHOWROOM_MEDIA,
  Product,
} from '../data/catalog';
import { useRouter } from '../context/RouterContext';
import { SafeImage } from '../components/SafeImage';
import { ProductCard } from '../components/ProductCard';
import { BrandMarquee } from '../components/BrandMarquee';
import { ScrollReveal, SCROLL_VIEWPORT } from '../components/ScrollReveal';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
}

const WHY_CHOOSE_ITEMS = [
  {
    icon: Gem,
    title: 'Multiple Categories',
    detail: 'Kitchen, furniture, cooling electronics & luggage under one roof.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Brands',
    detail: 'Havells, Orient Electric, USHA, Poppy, VIP, Aristocrat & Skybags.',
  },
  {
    icon: Award,
    title: 'Quality Products',
    detail: 'Selected home essentials built for lasting everyday comfort.',
  },
  {
    icon: ShoppingBag,
    title: 'Convenient Shopping',
    detail: 'Compare every home & lifestyle department in one showroom.',
  },
  {
    icon: CreditCard,
    title: 'EMI Options (Bajaj Finserv)',
    detail: 'Flexible showroom EMI payment options as a demo business feature.',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onSelectProduct }) => {
  const { navigate } = useRouter();
  const [showAllFeaturedMobile, setShowAllFeaturedMobile] = useState(false);
  const featuredProducts = PRODUCTS.filter((p) => p.featured);

  return (
    <div className="bg-[#FFFBF5]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#211914] min-h-[340px] sm:min-h-[480px] lg:min-h-[620px] flex items-center">
        {/* Luxurious Modern Living Showroom Hero Photography (Responsive Desktop & Mobile Images) */}
        <motion.div
          initial={{ opacity: 0.25, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 'some' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {/* Mobile View Hero Image */}
          <SafeImage
            src={SHOWROOM_MEDIA.heroMobile}
            alt="RISHARAA luxurious modern living showroom featuring sofa, dining table, kitchen appliances, cooling fan, and travel luggage"
            loading="eager"
            className="block sm:hidden w-full h-full object-cover object-center"
          />
          {/* Desktop View Hero Image */}
          <SafeImage
            src={SHOWROOM_MEDIA.heroMain}
            alt="RISHARAA luxurious modern living showroom featuring sofa, dining table, kitchen appliances, cooling fan, and travel luggage"
            loading="eager"
            className="hidden sm:block w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Measured Left-Weighted Scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#1D1510]/90 via-[#241A13]/62 to-[#241A13]/15"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#1D1510]/50 via-transparent to-[#1D1510]/15"
        />

        <div className="relative z-10 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-9 sm:py-16 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 'some' }}
            className="max-w-2xl space-y-3.5 sm:space-y-6"
          >
            {/* Line 1: Welcome to RISHARAA */}
            <div className="overflow-hidden">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold tracking-wide text-[#F4B844]"
              >
                <span>Welcome to RISHARAA</span>
                <motion.span
                  variants={{
                    hidden: { scaleX: 0, opacity: 0 },
                    visible: {
                      scaleX: 1,
                      opacity: 1,
                      transition: { duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  style={{ transformOrigin: 'left' }}
                  className="h-[1.5px] w-8 sm:w-12 bg-[#F4B844]/85"
                  aria-hidden="true"
                />
              </motion.div>
            </div>

            {/* Lines 2 & 3: Main Headline (Line-by-Line Reveal) */}
            <h1 className="font-serif text-[1.75rem] sm:text-[clamp(2.35rem,4.6vw,4.1rem)] font-bold text-white leading-[1.1] sm:leading-[1.08] tracking-[-0.015em]">
              <span className="block overflow-hidden pb-0.5">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: '100%' },
                    visible: {
                      opacity: 1,
                      y: '0%',
                      transition: { duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="block"
                >
                  Everything Your Home Needs,
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: '100%' },
                    visible: {
                      opacity: 1,
                      y: '0%',
                      transition: { duration: 0.6, delay: 0.82, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="block text-[#F4B844]"
                >
                  All in One Place.
                </motion.span>
              </span>
            </h1>

            {/* Line 4: Supporting Description */}
            <div className="overflow-hidden">
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 1.18, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="text-xs sm:text-lg text-[#F5EFE6] leading-relaxed max-w-xl"
              >
                From kitchen to comfort — discover home appliances, furniture, mattresses, cooling
                electronics, and travel luggage under one roof.
              </motion.p>
            </div>

            {/* Line 5: CTA Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, delay: 1.52, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2"
            >
              <button
                type="button"
                onClick={() => navigate('/categories')}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full bg-[#F2BA49] text-[#231B15] font-semibold text-xs sm:text-base hover:bg-[#E5A72B] transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-black/25 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/products')}
                className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-[#231B15]/45 backdrop-blur-sm border border-white/35 text-white font-medium text-xs sm:text-base hover:bg-[#231B15]/65 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B844]"
              >
                <span>Browse Products</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES (Compact 2x2 Grid on Mobile, 4-Col on Desktop) */}
      <section className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-14 lg:py-18">
        <ScrollReveal className="text-center mb-5 sm:mb-10">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] text-[#D4921D] mb-1 sm:mb-2">
            Our Categories
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="hidden sm:block h-[1.5px] w-16 bg-[#E8A829]/75" aria-hidden="true" />
            <h2 className="font-serif text-xl sm:text-4xl font-semibold text-[#231B15] leading-tight">
              Explore Our Wide Range of Products
            </h2>
            <span className="hidden sm:block h-[1.5px] w-16 bg-[#E8A829]/75" aria-hidden="true" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={SCROLL_VIEWPORT}
              transition={{ duration: 0.48, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => navigate('/categories', { cat: category.slug })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate('/categories', { cat: category.slug });
                }
              }}
              className={`group flex flex-col rounded-xl sm:rounded-2xl overflow-hidden border border-[#231B15]/8 ${category.cardBgClass} cursor-pointer transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(35,27,21,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A829]`}
            >
              {/* Category Studio Photography */}
              <div className="aspect-[4/3] w-full overflow-hidden">
                <SafeImage
                  src={category.image}
                  alt={category.name}
                  fallbackLabel={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Category Details */}
              <div className="flex flex-col flex-1 p-3 sm:p-5">
                <div className="text-[10px] sm:text-[11px] font-medium text-[#4A4038] mb-0.5 sm:mb-1 truncate">
                  {category.associatedEntities.join(' · ')}
                </div>
                <h3 className="text-[13px] sm:text-xl font-bold text-[#231B15] leading-snug mb-1 sm:mb-1.5 line-clamp-2">
                  {category.name}
                </h3>
                <p className="hidden sm:line-clamp-2 text-xs sm:text-sm text-[#4A4038] leading-relaxed mb-4">
                  {category.shortTagline}
                </p>

                <div className="mt-auto flex items-center justify-between pt-1.5 sm:pt-2">
                  <span className="text-[11px] sm:text-xs font-semibold text-[#231B15] group-hover:text-[#9A650F] transition-colors">
                    <span className="sm:hidden">Explore</span>
                    <span className="hidden sm:inline">Explore Category</span>
                  </span>
                  <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white text-[#231B15] shadow-xs inline-flex items-center justify-center transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-[#231B15] group-hover:text-white shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (Compact on Mobile with Expand Option, Full Grid on Desktop) */}
      <section className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 pb-8 sm:pb-14 lg:pb-18">
        <ScrollReveal className="relative flex flex-col items-center text-center mb-5 sm:mb-10">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] text-[#D4921D] mb-1 sm:mb-2">
            Trending Now
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="hidden sm:block h-[1.5px] w-16 bg-[#E8A829]/75" aria-hidden="true" />
            <h2 className="font-serif text-xl sm:text-4xl font-semibold text-[#231B15] leading-tight">
              Featured Products
            </h2>
            <span className="hidden sm:block h-[1.5px] w-16 bg-[#E8A829]/75" aria-hidden="true" />
          </div>

          <button
            type="button"
            onClick={() => navigate('/products')}
            className="hidden sm:inline-flex sm:absolute sm:right-0 sm:bottom-0 items-center gap-2 px-5 py-2 rounded-full border border-[#E5C17A] bg-[#FFFDF8] text-xs sm:text-sm font-semibold text-[#231B15] hover:bg-[#F2BA49] hover:border-[#F2BA49] transition-colors whitespace-nowrap"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={!showAllFeaturedMobile && index >= 4 ? 'hidden sm:block' : 'block'}
            >
              <ProductCard
                product={product}
                onViewDetails={onSelectProduct}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Mobile Compact Actions for Featured Products */}
        <div className="sm:hidden mt-4 flex items-center justify-center gap-2.5">
          {featuredProducts.length > 4 && (
            <button
              type="button"
              onClick={() => setShowAllFeaturedMobile((prev) => !prev)}
              className="px-4 py-2 rounded-full border border-[#E5C17A] bg-white text-xs font-semibold text-[#231B15]"
            >
              {showAllFeaturedMobile
                ? 'Show Fewer'
                : `Show More (+${featuredProducts.length - 4})`}
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F2BA49] text-xs font-semibold text-[#231B15]"
          >
            <span>All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 4. ANIMATED BRAND SHOWCASE */}
      <section className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 pb-6 sm:pb-10">
        <ScrollReveal>
          <BrandMarquee />
        </ScrollReveal>
      </section>

      {/* 5. WHY CHOOSE RISHARAA? + ABOUT RISHARAA SHOWROOM SPLIT */}
      <section className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 pb-6 sm:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Why Choose RISHARAA — Warm Bronze-Espresso Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SCROLL_VIEWPORT}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#261D16] text-white p-5 sm:p-10 flex flex-col justify-between border border-[#3B2E24]"
          >
            <div className="absolute inset-0 pointer-events-none">
              <SafeImage
                src={SHOWROOM_MEDIA.heroLiving}
                alt="RISHARAA warm showroom ambiance"
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#211812]/95 via-[#2B2017]/88 to-[#35261A]/80" />
            </div>

            <div className="relative z-10">
              <p className="text-[11px] sm:text-xs font-bold tracking-[0.12em] text-[#F4B844] mb-1.5 sm:mb-2">
                Why Choose RISHARAA?
              </p>
              <h2 className="font-serif text-xl sm:text-3xl font-semibold text-white leading-snug mb-1.5 sm:mb-2">
                More Than a Store, A Lifestyle Partner.
              </h2>
              <p className="text-xs sm:text-sm text-[#DDD2C5] leading-relaxed max-w-xl mb-4 sm:mb-7">
                Quality products, trusted brands, and easy shopping — all in one place.
              </p>

              {/* Single-row horizontal swipe on mobile, grid on sm+ */}
              <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 no-scrollbar -mx-1 px-1 pb-1 sm:pb-0">
                {WHY_CHOOSE_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="min-w-[116px] sm:min-w-0 shrink-0 p-3 sm:p-3.5 rounded-xl bg-white/[0.06] backdrop-blur-xs border border-[#F4B844]/15 flex flex-col items-center text-center"
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#F4B844] mb-2 sm:mb-2.5" strokeWidth={1.65} />
                      <h3 className="text-[11px] sm:text-xs font-semibold text-white leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 mt-4 sm:mt-7 pt-4 sm:pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              <p className="text-[11px] sm:text-xs text-[#DFD4C7]">
                Bajaj Finserv EMI availability offered as a demo showroom feature.
              </p>
              <button
                type="button"
                onClick={() => navigate('/about', { section: 'brands' })}
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#F2BA49] text-[#231B15] text-xs sm:text-sm font-semibold hover:bg-[#E5A72B] transition-colors whitespace-nowrap"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </motion.div>

          {/* About RISHARAA Card — Compact horizontal split on mobile, stacked on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SCROLL_VIEWPORT}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => navigate('/about', { section: 'brands' })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/about', { section: 'brands' });
              }
            }}
            className="group lg:col-span-4 rounded-xl sm:rounded-2xl bg-[#F6ECE1] border border-[#EADBC9] overflow-hidden flex flex-row lg:flex-col cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(35,27,21,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A829]"
          >
            <div className="flex-1 p-4 sm:p-7 sm:pb-5 flex flex-col justify-center">
              <h3 className="font-serif text-lg sm:text-2xl font-semibold text-[#231B15] mb-1.5 sm:mb-3">
                About RISHARAA
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4038] leading-relaxed mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-none">
                RISHARAA is a modern lifestyle and home essentials showroom bringing together
                quality products, trusted brands, and everyday convenience.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#231B15] group-hover:text-[#B87B14] transition-colors border-b border-[#231B15]/40 pb-0.5 self-start">
                <span>Know More &amp; Brands</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <div className="w-32 sm:w-44 lg:w-full shrink-0 lg:mt-auto lg:aspect-[4/3] lg:flex-1 overflow-hidden">
              <SafeImage
                src={SHOWROOM_MEDIA.showroomExterior}
                alt="RISHARAA modern retail showroom facade"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. FINAL CTA SECTION */}
      <section className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 pt-1 pb-10 sm:pb-16 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#E7D8C4] bg-[#F2E3D0]"
        >
          <div className="absolute inset-0">
            <SafeImage
              src={SHOWROOM_MEDIA.heroLiving}
              alt="RISHARAA lifestyle home collection"
              className="w-full h-full object-cover opacity-30"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#EFE0CC]/85 via-[#F7ECDD]/95 to-[#EFE0CC]/85"
            />
          </div>

          <div className="relative z-10 px-5 sm:px-12 py-7 sm:py-14 text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-xl sm:text-4xl font-semibold text-[#231B15] leading-tight mb-2 sm:mb-3">
              Make Your Home Complete with RISHARAA
            </h2>
            <p className="text-xs sm:text-base text-[#4A4038] leading-relaxed mb-5 sm:mb-7">
              Discover quality products for every corner of your home and every part of your
              lifestyle.
            </p>
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3.5 rounded-full bg-[#F2BA49] text-[#231B15] font-semibold text-xs sm:text-base hover:bg-[#E5A72B] transition-all duration-200 hover:-translate-y-0.5 shadow-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#231B15]"
            >
              <span>Explore Our Products</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
