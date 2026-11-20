import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { CATEGORIES, PRODUCTS, CategorySlug, Product } from '../data/catalog';
import { useRouter } from '../context/RouterContext';
import { ProductCard } from '../components/ProductCard';
import { ScrollReveal, SCROLL_VIEWPORT } from '../components/ScrollReveal';

interface ProductsPageProps {
  onSelectProduct: (product: Product) => void;
}

type SortOption = 'featured' | 'name-asc' | 'name-desc';

export const ProductsPage: React.FC<ProductsPageProps> = ({ onSelectProduct }) => {
  const { route } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | 'all'>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  useEffect(() => {
    const paramCategory = route.params.category as CategorySlug | undefined;
    const paramBrand = route.params.brand;

    if (paramCategory && CATEGORIES.some((c) => c.slug === paramCategory)) {
      setSelectedCategory(paramCategory);
    } else if (!paramCategory && !paramBrand) {
      setSelectedCategory('all');
    }

    if (paramBrand) {
      setSelectedBrand(paramBrand);
    } else if (!paramBrand && !paramCategory) {
      setSelectedBrand('all');
    }
  }, [route.params.category, route.params.brand]);

  const allBrandNames = useMemo(() => {
    const unique = Array.from(new Set(PRODUCTS.map((p) => p.brand)));
    return unique.sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all' && product.categorySlug !== selectedCategory) {
        return false;
      }
      if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
        return false;
      }
      if (!q) return true;
      return (
        product.name.toLowerCase().includes(q) ||
        product.categoryName.toLowerCase().includes(q) ||
        product.subcategory.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q)
      );
    });

    const sorted = [...list];
    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
      default:
        sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
        break;
    }
    return sorted;
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery.trim() !== '';

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="bg-[#FFFBF5] min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-[#EFE6D8]">
        <div className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SCROLL_VIEWPORT}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] text-[#D4921D] mb-1 sm:mb-2">
              Showroom Catalog
            </p>
            <h1 className="font-serif text-2xl sm:text-5xl font-semibold text-[#231B15] leading-tight mb-1.5 sm:mb-3">
              All RISHARAA Products
            </h1>
            <p className="text-xs sm:text-[15px] text-[#5A4E44] leading-relaxed">
              Browse our multi-category showroom collection by department, brand, or keyword.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search Toolbar */}
      <section className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-3 sm:pb-4">
        <ScrollReveal className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#EFE7DA] space-y-3 sm:space-y-4">
          {/* Top Row: Search full width + Brand & Sort side-by-side on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-2.5 sm:gap-3.5">
            <div className="col-span-2 md:col-span-5 relative">
              <Search className="w-4 h-4 text-[#7C6F63] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, categories, or brands..."
                aria-label="Search products"
                className="w-full pl-9 pr-8 py-2 sm:py-2.5 rounded-xl bg-[#FFFBF5] border border-[#E7DCCB] text-xs sm:text-sm text-[#231B15] placeholder:text-[#8E8174] focus:outline-none focus:border-[#E8A829] focus:ring-2 focus:ring-[#E8A829]/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7C6F63] hover:text-[#231B15]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="col-span-1 md:col-span-4">
              <label htmlFor="brand-filter" className="sr-only">
                Filter by Brand
              </label>
              <select
                id="brand-filter"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#FFFBF5] border border-[#E7DCCB] text-xs sm:text-sm text-[#231B15] focus:outline-none focus:border-[#E8A829] focus:ring-2 focus:ring-[#E8A829]/20"
              >
                <option value="all">All Brands</option>
                {allBrandNames.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1 md:col-span-3">
              <label htmlFor="sort-products" className="sr-only">
                Sort products
              </label>
              <select
                id="sort-products"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#FFFBF5] border border-[#E7DCCB] text-xs sm:text-sm text-[#231B15] focus:outline-none focus:border-[#E8A829] focus:ring-2 focus:ring-[#E8A829]/20"
              >
                <option value="featured">Sort: Featured</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          {/* Bottom Row: Category Filter Tabs + Result Count */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-[#F4EDE3]">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full">
              <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7C6F63] mr-0.5 shrink-0" />
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-[#241D18] text-white'
                    : 'bg-[#F6EDE3] text-[#5A4E44] hover:text-[#231B15]'
                }`}
              >
                All
              </button>
              {CATEGORIES.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    selectedCategory === category.slug
                      ? 'bg-[#241D18] text-white'
                      : 'bg-[#F6EDE3] text-[#5A4E44] hover:text-[#231B15]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-[11px] sm:text-xs text-[#5A4E44] shrink-0">
              <span>
                <strong className="text-[#231B15] tabular-nums">{filteredProducts.length}</strong>{' '}
                {filteredProducts.length === 1 ? 'item' : 'items'}
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 font-semibold text-[#B87B14] hover:text-[#231B15] transition-colors"
                >
                  <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Product Grid */}
      <section className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-10 sm:pb-16 lg:pb-20">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 sm:py-16 px-5 bg-white rounded-2xl border border-[#EFE7DA]">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#231B15] mb-2">
              No matching products found
            </h2>
            <p className="text-xs sm:text-sm text-[#5A4E44] max-w-md mx-auto mb-5">
              Try clearing a brand or category filter, or search using terms like &ldquo;Cooker&rdquo;,
              &ldquo;Sofa&rdquo;, &ldquo;Fan&rdquo;, or &ldquo;Suitcase&rdquo;.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-full bg-[#F2BA49] text-[#231B15] text-xs sm:text-sm font-semibold hover:bg-[#E5A72B] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onSelectProduct}
                showDescription
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
