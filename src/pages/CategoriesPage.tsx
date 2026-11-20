import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS, CategorySlug, Product } from '../data/catalog';
import { useRouter } from '../context/RouterContext';
import { SafeImage } from '../components/SafeImage';
import { ProductCard } from '../components/ProductCard';
import { ScrollReveal, SCROLL_VIEWPORT } from '../components/ScrollReveal';

interface CategoriesPageProps {
  onSelectProduct: (product: Product) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onSelectProduct }) => {
  const { route, navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | 'all'>('all');
  const [activeSubcategories, setActiveSubcategories] = useState<Record<CategorySlug, string>>({
    'home-kitchen': 'All',
    'furniture-mattresses': 'All',
    'electronics-cooling': 'All',
    'handbags-luggage': 'All',
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Sync with URL query parameters (?cat=...&sub=...)
  useEffect(() => {
    const paramCat = route.params.cat as CategorySlug | undefined;
    const paramSub = route.params.sub;

    setSearchQuery('');

    if (paramCat && CATEGORIES.some((c) => c.slug === paramCat)) {
      setSelectedCategory(paramCat);
      setActiveSubcategories((prev) => ({
        ...prev,
        [paramCat]: paramSub || 'All',
      }));

      if (paramSub) {
        window.setTimeout(() => {
          const el = document.getElementById(`cat-products-${paramCat}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 160);
      }
    } else if (!paramCat) {
      setSelectedCategory('all');
    }
  }, [route.params.cat, route.params.sub]);

  const visibleCategories = useMemo(() => {
    const base =
      selectedCategory === 'all'
        ? CATEGORIES
        : CATEGORIES.filter((c) => c.slug === selectedCategory);

    if (!searchQuery.trim()) return base;

    const q = searchQuery.toLowerCase();
    return base.filter((category) => {
      const matchesCategory =
        category.name.toLowerCase().includes(q) ||
        category.description.toLowerCase().includes(q) ||
        category.associatedEntities.some((e) => e.toLowerCase().includes(q)) ||
        category.subcategories.some((s) => s.toLowerCase().includes(q));

      const hasMatchingProducts = PRODUCTS.some(
        (p) =>
          p.categorySlug === category.slug &&
          (p.name.toLowerCase().includes(q) ||
            p.subcategory.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q))
      );

      return matchesCategory || hasMatchingProducts;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryTabClick = (slug: CategorySlug | 'all') => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      navigate('/categories');
    } else {
      navigate('/categories', { cat: slug });
    }
  };

  const handleSubcategoryClick = (catSlug: CategorySlug, sub: string) => {
    setActiveSubcategories((prev) => ({
      ...prev,
      [catSlug]: sub,
    }));
  };

  return (
    <div className="bg-[#FFFBF5] min-h-screen">
      {/* Page Header & Filter Controls */}
      <section className="bg-white border-b border-[#EFE6D8]">
        <div className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SCROLL_VIEWPORT}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-4 sm:mb-8"
          >
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] text-[#D4921D] mb-1 sm:mb-2">
              Showroom Departments
            </p>
            <h1 className="font-serif text-2xl sm:text-5xl font-semibold text-[#231B15] leading-tight mb-2 sm:mb-4">
              Shop by Category &amp; Subcategory
            </h1>
            <p className="text-xs sm:text-base text-[#5A4E44] leading-relaxed">
              Explore all four RISHARAA showroom departments below and select any subcategory to
              view its products immediately.
            </p>
          </motion.div>

          {/* Filter Bar + Search Input */}
          <ScrollReveal className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4" delay={0.05}>
            <div className="flex items-center gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#F6EDE3] border border-[#EADCD0] overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => handleCategoryTabClick('all')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-[#241D18] text-white shadow-xs'
                    : 'text-[#5A4E44] hover:text-[#231B15]'
                }`}
              >
                All (4)
              </button>
              {CATEGORIES.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => handleCategoryTabClick(category.slug)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    selectedCategory === category.slug
                      ? 'bg-[#241D18] text-white shadow-xs'
                      : 'text-[#5A4E44] hover:text-[#231B15]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search across categories & subcategories */}
            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="w-4 h-4 text-[#7C6F63] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories, subcategories, brands..."
                aria-label="Search categories and products"
                className="w-full pl-9 pr-9 py-2 sm:py-2.5 rounded-full bg-[#FFFBF5] border border-[#E7DCCB] text-xs sm:text-sm text-[#231B15] placeholder:text-[#8E8174] focus:outline-none focus:border-[#E8A829] focus:ring-2 focus:ring-[#E8A829]/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C6F63] hover:text-[#231B15]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Four Major Category Sections */}
      <div className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 py-7 sm:py-12 lg:py-16 space-y-10 sm:space-y-16 lg:space-y-20">
        {visibleCategories.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-[#EFE7DA] px-4">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#231B15] mb-2">
              No matching categories found
            </h2>
            <p className="text-xs sm:text-sm text-[#5A4E44] mb-5">
              Try a different keyword or reset your search filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                handleCategoryTabClick('all');
              }}
              className="px-5 py-2.5 rounded-full bg-[#F2BA49] text-[#231B15] text-xs sm:text-sm font-semibold hover:bg-[#E5A72B] transition-colors"
            >
              Show All Categories
            </button>
          </div>
        ) : (
          visibleCategories.map((category, sectionIdx) => {
            const activeSub = activeSubcategories[category.slug] || 'All';
            const q = searchQuery.trim().toLowerCase();

            const categoryProducts = PRODUCTS.filter((product) => {
              if (product.categorySlug !== category.slug) return false;
              if (activeSub !== 'All' && product.subcategory !== activeSub) return false;
              if (!q) return true;
              return (
                product.name.toLowerCase().includes(q) ||
                product.subcategory.toLowerCase().includes(q) ||
                product.brand.toLowerCase().includes(q) ||
                product.description.toLowerCase().includes(q) ||
                category.name.toLowerCase().includes(q)
              );
            });

            // Keep mobile concise when viewing "All Categories" by previewing 2 items per category on small screens with quick View All link
            const limitMobilePreview =
              selectedCategory === 'all' && activeSub === 'All' && !q && categoryProducts.length > 2;

            return (
              <section
                key={category.slug}
                aria-labelledby={`cat-heading-${category.slug}`}
                className="scroll-mt-20"
              >
                {/* Category Hero Split Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={SCROLL_VIEWPORT}
                  transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                  className={`grid grid-cols-1 lg:grid-cols-12 rounded-xl sm:rounded-2xl overflow-hidden border border-[#231B15]/8 ${category.cardBgClass} mb-4 sm:mb-8`}
                >
                  <div className="lg:col-span-5 h-40 sm:aspect-[4/3] sm:h-auto lg:aspect-auto overflow-hidden">
                    <SafeImage
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="lg:col-span-7 p-4 sm:p-10 flex flex-col justify-center">
                    <div className="text-[11px] sm:text-xs font-medium text-[#4A4038] mb-1 sm:mb-2">
                      Dept 0{sectionIdx + 1} · {category.associationLabel}:{' '}
                      <span className="font-semibold text-[#231B15]">
                        {category.associatedEntities.join(' · ')}
                      </span>
                    </div>

                    <h2
                      id={`cat-heading-${category.slug}`}
                      className="font-serif text-xl sm:text-4xl font-semibold text-[#231B15] leading-tight mb-1.5 sm:mb-3"
                    >
                      {category.name}
                    </h2>

                    <p className="text-xs sm:text-base text-[#4A4038] leading-relaxed max-w-2xl mb-3.5 sm:mb-6 line-clamp-2 sm:line-clamp-none">
                      {category.description}
                    </p>

                    {/* Interactive Subcategory Selector (Single horizontal row on mobile, wrap on desktop) */}
                    <div className="space-y-2">
                      <div className="text-[11px] sm:text-xs font-semibold text-[#231B15]">
                        Select a Subcategory:
                      </div>
                      <div className="flex overflow-x-auto sm:flex-wrap items-center gap-1.5 sm:gap-2 pb-1 sm:pb-0 no-scrollbar">
                        <button
                          type="button"
                          onClick={() => handleSubcategoryClick(category.slug, 'All')}
                          className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-medium transition-all duration-150 whitespace-nowrap shrink-0 ${
                            activeSub === 'All'
                              ? 'bg-[#241D18] text-white shadow-xs'
                              : 'bg-white/85 text-[#231B15] hover:bg-white border border-[#231B15]/10'
                          }`}
                        >
                          All {category.name.split('&')[0].trim()}
                        </button>
                        {category.subcategories.map((sub) => {
                          const isSelected = activeSub === sub;
                          return (
                            <button
                              key={sub}
                              type="button"
                              onClick={() => handleSubcategoryClick(category.slug, sub)}
                              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-medium transition-all duration-150 whitespace-nowrap shrink-0 ${
                                isSelected
                                  ? 'bg-[#F2BA49] text-[#231B15] font-semibold shadow-xs'
                                  : 'bg-white/85 text-[#231B15] hover:bg-white border border-[#231B15]/10'
                              }`}
                            >
                              {sub}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Filtered Subcategory Product Grid */}
                <div
                  id={`cat-products-${category.slug}`}
                  className="scroll-mt-20 flex items-center justify-between gap-2 mb-3.5 sm:mb-5"
                >
                  <div className="text-xs sm:text-sm text-[#57534E] truncate">
                    <span className="font-semibold text-[#1C1917] tabular-nums">
                      {categoryProducts.length}
                    </span>{' '}
                    {categoryProducts.length === 1 ? 'item' : 'items'} in{' '}
                    <span className="font-semibold text-[#1C1917]">
                      {activeSub === 'All' ? category.name : activeSub}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCategoryTabClick(category.slug)}
                    className="inline-flex items-center gap-1 text-[11px] sm:text-sm font-semibold text-[#9A6A12] hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{selectedCategory === 'all' ? 'View All' : 'Full Catalog'}</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>

                {categoryProducts.length === 0 ? (
                  <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#EAE4DB] text-center">
                    <p className="text-xs sm:text-sm text-[#57534E] mb-3">
                      No items match your current search inside &ldquo;{activeSub}&rdquo;.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        handleSubcategoryClick(category.slug, 'All');
                        setSearchQuery('');
                      }}
                      className="text-xs sm:text-sm font-semibold text-[#9A6A12] hover:text-[#1C1917]"
                    >
                      Reset subcategory filter
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                      {categoryProducts.map((product, pIdx) => (
                        <div
                          key={product.id}
                          className={limitMobilePreview && pIdx >= 2 ? 'hidden sm:block' : 'block'}
                        >
                          <ProductCard
                            product={product}
                            onViewDetails={onSelectProduct}
                            showDescription
                            index={pIdx}
                          />
                        </div>
                      ))}
                    </div>

                    {limitMobilePreview && (
                      <div className="sm:hidden mt-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleCategoryTabClick(category.slug)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#E5C17A] text-xs font-semibold text-[#231B15]"
                        >
                          <span>
                            View all {categoryProducts.length} in {category.name.split('&')[0].trim()}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#B87B14]" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </section>
            );
          })
        )}
      </div>
    </div>
  );
};
