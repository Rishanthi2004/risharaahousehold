import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Eye, Compass, CreditCard } from 'lucide-react';
import { CATEGORIES, BRANDS, SHOWROOM_MEDIA } from '../data/catalog';
import { useRouter } from '../context/RouterContext';
import { SafeImage } from '../components/SafeImage';
import { BrandMarquee } from '../components/BrandMarquee';
import { BrandWordmark } from '../components/BrandLogoMark';
import { ScrollReveal, SCROLL_VIEWPORT } from '../components/ScrollReveal';

export const AboutPage: React.FC = () => {
  const { route, navigate } = useRouter();

  // Smoothly scroll to the Brands section when navigated from Home Page About card or Brand links
  useEffect(() => {
    if (route.params.section === 'brands') {
      const timer = window.setTimeout(() => {
        const el = document.getElementById('brands-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 220);
      return () => window.clearTimeout(timer);
    }
  }, [route.params.section]);

  return (
    <div className="bg-[#FFFBF5]">
      {/* Page Hero / Business Introduction */}
      <section className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 py-7 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SCROLL_VIEWPORT}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] text-[#D4921D] mb-1.5 sm:mb-2.5">
              About RISHARAA
            </p>
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-semibold text-[#231B15] leading-[1.14] mb-3 sm:mb-5">
              Everything for Your Home &amp; Lifestyle, Under One Roof.
            </h1>

            <div className="space-y-2.5 sm:space-y-3.5 text-xs sm:text-[15px] text-[#4A4038] leading-relaxed">
              <p>
                RISHARAA is a modern lifestyle and home essentials showroom bringing together
                quality products, trusted brands and everyday convenience under one roof.
              </p>
              <p>
                From stylish furniture and comfortable mattresses to advanced kitchen appliances,
                cooling solutions and premium travel luggage, we offer everything customers need
                for their homes and lifestyles in one destination.
              </p>
            </div>

            <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
              <button
                type="button"
                onClick={() => navigate('/categories')}
                className="inline-flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#F2BA49] text-[#231B15] font-semibold text-xs sm:text-sm hover:bg-[#E5A72B] transition-colors whitespace-nowrap"
              >
                <span>Explore Categories</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('brands-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#DFD2C0] bg-white text-[#231B15] font-medium text-xs sm:text-sm hover:bg-[#F6EDE3] transition-colors whitespace-nowrap"
              >
                <span>Our Brands</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={SCROLL_VIEWPORT}
            transition={{ duration: 0.52, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 lg:self-center rounded-xl sm:rounded-2xl overflow-hidden border border-[#EAE0D2] bg-[#241D18] aspect-[16/9] shadow-sm"
          >
            <SafeImage
              src={SHOWROOM_MEDIA.showroomExterior}
              alt="RISHARAA multi-category home and lifestyle showroom storefront"
              loading="eager"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>
      </section>

      {/* Concise Vision, Mission & Showroom Departments */}
      <section className="bg-white border-y border-[#EFE6D8]">
        <div className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 py-7 sm:py-12 lg:py-14 space-y-5 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={SCROLL_VIEWPORT}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-[#F6ECE1] border border-[#EADBC9]"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#F2BA49]/25 text-[#B87B14] inline-flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
                <h2 className="font-serif text-lg sm:text-2xl font-semibold text-[#231B15]">
                  Our Vision
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#4A4038] leading-relaxed">
                To be a complete, welcoming home and lifestyle destination where families find
                lasting quality for every room and every journey.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={SCROLL_VIEWPORT}
              transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-[#261D16] text-white border border-[#3B2E24]"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#F2BA49]/20 text-[#F4B844] inline-flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <h2 className="font-serif text-lg sm:text-2xl font-semibold text-white">
                  Our Mission
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#DFD4C7] leading-relaxed">
                To bring trusted brands, quality home essentials, and convenient shopping—with
                Bajaj Finserv EMI options (demo feature)—together under one roof.
              </p>
            </motion.div>
          </div>

          {/* Compact 4-Department Quick Links */}
          <ScrollReveal className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5" delay={0.04}>
            {CATEGORIES.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => navigate('/categories', { cat: category.slug })}
                className="group text-left p-3 sm:p-4 rounded-xl bg-[#FFFBF5] border border-[#EFE7DA] hover:border-[#E8A829] transition-colors flex flex-col justify-between gap-1 sm:gap-2"
              >
                <div className="text-xs sm:text-sm font-semibold text-[#231B15] group-hover:text-[#B87B14] transition-colors leading-snug">
                  {category.name}
                </div>
                <div className="text-[11px] sm:text-xs text-[#7C6F63] line-clamp-1">
                  {category.shortTagline}
                </div>
              </button>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* CLEAN TEXT-FOCUSED BRANDS SECTION (NO IMAGES ON BRAND CARDS) */}
      <section
        id="brands-section"
        aria-labelledby="about-brands-heading"
        className="scroll-mt-20 py-8 sm:py-12 lg:py-16"
      >
        <div className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-5 sm:mb-8">
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] text-[#D4921D] mb-1 sm:mb-2">
              Our Trusted Brands
            </p>
            <div className="flex items-center justify-center gap-4 mb-1.5 sm:mb-2.5">
              <span className="hidden sm:block h-[1.5px] w-14 bg-[#E8A829]/75" aria-hidden="true" />
              <h2
                id="about-brands-heading"
                className="font-serif text-xl sm:text-4xl font-semibold text-[#231B15] leading-tight"
              >
                Brands at RISHARAA
              </h2>
              <span className="hidden sm:block h-[1.5px] w-14 bg-[#E8A829]/75" aria-hidden="true" />
            </div>
            <p className="text-xs sm:text-sm text-[#5A4E44]">
              Tap any brand below to browse its available showroom products.
            </p>
          </ScrollReveal>

          {/* Animated Brand Strip */}
          <ScrollReveal className="mb-5 sm:mb-8" delay={0.04}>
            <BrandMarquee compact />
          </ScrollReveal>

          {/* Clean No-Image Brand Name Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {BRANDS.map((brand, idx) => (
              <motion.button
                key={brand.id}
                type="button"
                onClick={() => navigate('/products', { brand: brand.name })}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={SCROLL_VIEWPORT}
                transition={{ duration: 0.42, delay: (idx % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group text-left p-3.5 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-[#EFE7DA] hover:border-[#E8A829] hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(35,27,21,0.07)] transition-all duration-200 flex flex-col justify-between gap-2.5 sm:gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A829]"
              >
                <div className="py-0.5 sm:py-1">
                  <BrandWordmark brandName={brand.name} size="md" />
                </div>

                <div>
                  <div className="text-[11px] sm:text-xs font-medium text-[#7C6F63] mb-0.5 sm:mb-1 truncate">
                    {brand.categoryName}
                  </div>
                  <div className="hidden sm:block text-xs text-[#4A4038] line-clamp-1 mb-3">
                    {brand.productFocus.join(' · ')}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#B87B14] group-hover:text-[#231B15] transition-colors mt-1 sm:mt-0">
                    <span>View Products</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.button>
            ))}

            {/* Sri Poomagal Agencies Card (No Image) */}
            <motion.button
              type="button"
              onClick={() => navigate('/categories', { cat: 'home-kitchen' })}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={SCROLL_VIEWPORT}
              transition={{ duration: 0.42, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group text-left p-3.5 sm:p-6 bg-[#261D16] text-white rounded-xl sm:rounded-2xl border border-[#3B2E24] hover:border-[#F2BA49] hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(35,27,21,0.12)] transition-all duration-200 flex flex-col justify-between gap-2.5 sm:gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2BA49]"
            >
              <div>
                <div className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#F4B844] mb-0.5 sm:mb-1">
                  Kitchen Agency
                </div>
                <div className="font-serif text-base sm:text-xl font-semibold text-white leading-snug">
                  Sri Poomagal Agencies
                </div>
              </div>

              <div>
                <div className="text-[11px] sm:text-xs text-[#DFD4C7] mb-1.5 sm:mb-3 truncate">
                  Home &amp; Kitchen Appliances
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#F4B844] group-hover:text-white transition-colors">
                  <span>Explore Kitchen</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.button>
          </div>

          {/* Compact EMI Demo Note */}
          <ScrollReveal className="mt-5 sm:mt-8 p-3.5 sm:p-4 rounded-xl bg-[#F6EDE3] border border-[#EADCD0] flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-[11px] sm:text-xs text-[#4A4038]">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#B87B14] shrink-0" />
              <span>
                Bajaj Finserv EMI options available at RISHARAA showroom (demo feature).
              </span>
            </div>
            <span className="hidden sm:inline text-[#7C6F63]">
              Brand associations shown reflect this demo showroom catalog.
            </span>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
