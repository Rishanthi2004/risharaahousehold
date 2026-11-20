import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  ShoppingBag,
  ChevronDown,
  ArrowRight,
  Home,
  LayoutGrid,
  Package,
  Info,
  Phone,
  Heart,
} from 'lucide-react';
import { useRouter, PageRoute } from '../context/RouterContext';
import { useShortlist } from '../context/ShortlistContext';
import { useWishlist } from '../context/WishlistContext';
import { CATEGORIES, CategorySlug } from '../data/catalog';
import { RisharaaMark } from './BrandLogoMark';
import { SafeImage } from './SafeImage';

interface NavLinkItem {
  label: string;
  mobileLabel: string;
  path: PageRoute;
  hasDropdown?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavLinkItem[] = [
  { label: 'Home', mobileLabel: 'Home', path: '/', icon: Home },
  { label: 'About Us', mobileLabel: 'About', path: '/about', icon: Info },
  { label: 'Categories', mobileLabel: 'Categories', path: '/categories', hasDropdown: true, icon: LayoutGrid },
  { label: 'Products', mobileLabel: 'Products', path: '/products', icon: Package },
  { label: 'Contact Us', mobileLabel: 'Contact', path: '/contact', icon: Phone },
];

const MOBILE_BOTTOM_ITEMS: NavLinkItem[] = [
  NAV_ITEMS[0], // Home
  NAV_ITEMS[2], // Categories
  NAV_ITEMS[3], // Products
  NAV_ITEMS[1], // About
  NAV_ITEMS[4], // Contact
];

export const Navbar: React.FC = () => {
  const { route, navigate } = useRouter();
  const { totalCount, openDrawer } = useShortlist();
  const { totalCount: wishlistCount, openDrawer: openWishlist } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatExpanded, setMobileCatExpanded] = useState(true);
  const [desktopCatOpen, setDesktopCatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDesktopCatOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDesktopCatOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      window.removeEventListener('keydown', onKeyDown);
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleOpenDropdown = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setDesktopCatOpen(true);
  };

  const handleScheduleClose = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setDesktopCatOpen(false);
    }, 150);
  };

  const handleNavClick = (path: PageRoute) => {
    setMobileOpen(false);
    setDesktopCatOpen(false);
    navigate(path);
  };

  const handleCategorySelect = (catSlug: CategorySlug, subcategory?: string) => {
    setDesktopCatOpen(false);
    setMobileOpen(false);
    if (subcategory) {
      navigate('/categories', { cat: catSlug, sub: subcategory });
    } else {
      navigate('/categories', { cat: catSlug });
    }
  };

  return (
    <>
      <header
        ref={dropdownRef}
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#EFE6D8] shadow-[0_2px_18px_rgba(35,27,21,0.06)]'
            : 'bg-[#FFFDF9] border-b border-[#F2E9DB]'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 lg:h-[74px] flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNavClick('/')}
            className="inline-flex items-center gap-2 sm:gap-2.5 text-left whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A829] rounded-md py-1"
            aria-label="RISHARAA Home"
          >
            <RisharaaMark className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200 group-hover:scale-105" />
            <span className="text-lg sm:text-xl font-bold tracking-[0.08em] text-[#231B15] leading-none">
              RISHARAA
            </span>
          </button>

          {/* Zone 2: Desktop Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = route.path === item.path;

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={handleOpenDropdown}
                    onMouseLeave={handleScheduleClose}
                  >
                    <button
                      type="button"
                      onClick={() => setDesktopCatOpen((prev) => !prev)}
                      aria-expanded={desktopCatOpen}
                      aria-haspopup="true"
                      className={`relative inline-flex items-center gap-1 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A829] rounded ${
                        isActive || desktopCatOpen
                          ? 'text-[#C68616] font-semibold'
                          : 'text-[#3F352E] hover:text-[#231B15]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          desktopCatOpen ? 'rotate-180 text-[#C68616]' : 'text-[#7C6F63]'
                        }`}
                      />
                      {isActive && (
                        <motion.span
                          layoutId="risharaa-nav-indicator"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          className="absolute left-0 right-0 -bottom-[1px] h-[2.5px] bg-[#E8A829] rounded-full"
                        />
                      )}
                    </button>
                  </div>
                );
              }

              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNavClick(item.path)}
                  onMouseEnter={() => setDesktopCatOpen(false)}
                  className={`relative py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A829] rounded ${
                    isActive
                      ? 'text-[#C68616] font-semibold'
                      : 'text-[#3F352E] hover:text-[#231B15]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="risharaa-nav-indicator"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute left-0 right-0 -bottom-[1px] h-[2.5px] bg-[#E8A829] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Wishlist + Shortlist + Mobile Menu Button) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={openWishlist}
              className="relative inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#FFFBF5] border border-[#E7DCCB] text-[#231B15] text-xs sm:text-sm font-semibold hover:bg-[#FDECEC] hover:border-[#F5C2C7] hover:text-[#D93848] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A829]"
              aria-label={`Open wishlist with ${wishlistCount} items`}
            >
              <Heart
                className={`w-4 h-4 ${
                  wishlistCount > 0 ? 'fill-[#D93848] text-[#D93848]' : 'text-[#5A4E44]'
                }`}
              />
              <span className="hidden lg:inline">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#D93848] text-white text-[10px] sm:text-[11px] font-bold tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={openDrawer}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#F2BA49] text-[#231B15] text-xs sm:text-sm font-semibold hover:bg-[#E5A72B] transition-colors duration-200 whitespace-nowrap shrink-0 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#231B15] focus-visible:ring-offset-2"
              aria-label={`Open showroom shortlist with ${totalCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#231B15]" />
              <span className="hidden sm:inline">Shortlist</span>
              {totalCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-5 px-1 sm:px-1.5 rounded-full bg-[#231B15] text-[#F2BA49] text-[11px] sm:text-xs font-bold tabular-nums">
                  {totalCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`md:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A829] ${
                mobileOpen
                  ? 'bg-[#241D18] text-[#F2BA49] border border-[#241D18]'
                  : 'bg-[#FFFBF5] text-[#231B15] border border-[#DECBB3] hover:bg-[#F6EDE1]'
              }`}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>{mobileOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>

        {/* Desktop Categories Mega Dropdown */}
        <AnimatePresence>
          {desktopCatOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={handleOpenDropdown}
              onMouseLeave={handleScheduleClose}
              className="hidden md:block absolute left-0 right-0 top-full bg-[#FAF8F5] border-b border-[#E2DACD] shadow-[0_20px_48px_rgba(28,25,23,0.12)]"
            >
              <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-7">
                <div className="grid grid-cols-4 gap-6">
                  {CATEGORIES.map((category) => {
                    const isCurrentCat =
                      route.path === '/categories' && route.params.cat === category.slug;
                    return (
                      <div
                        key={category.slug}
                        className="flex flex-col rounded-xl bg-white border border-[#EAE4DB] overflow-hidden"
                      >
                        {/* Category Header Card */}
                        <button
                          type="button"
                          onClick={() => handleCategorySelect(category.slug)}
                          className="group text-left flex items-center gap-3 p-3.5 bg-[#F6F2EB] hover:bg-[#EFE8DC] transition-colors border-b border-[#EAE4DB]"
                        >
                          <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-[#EAE3D7]">
                            <SafeImage
                              src={category.image}
                              alt={category.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div
                              className={`text-sm font-semibold leading-snug truncate transition-colors ${
                                isCurrentCat
                                  ? 'text-[#9A6A12]'
                                  : 'text-[#1C1917] group-hover:text-[#9A6A12]'
                              }`}
                            >
                              {category.name}
                            </div>
                            <div className="text-[11px] text-[#78716C] truncate">
                              {category.associatedEntities.join(' · ')}
                            </div>
                          </div>
                        </button>

                        {/* Subcategory Product Links */}
                        <ul className="p-2.5 space-y-0.5 flex-1">
                          {category.subcategories.map((sub) => {
                            const isCurrentSub = isCurrentCat && route.params.sub === sub;
                            return (
                              <li key={sub}>
                                <button
                                  type="button"
                                  onClick={() => handleCategorySelect(category.slug, sub)}
                                  className={`group w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-[13px] transition-colors text-left ${
                                    isCurrentSub
                                      ? 'bg-[#EFE6D5] text-[#1C1917] font-semibold'
                                      : 'text-[#44403C] hover:bg-[#F5F1EA] hover:text-[#1C1917]'
                                  }`}
                                >
                                  <span className="truncate">{sub}</span>
                                  <ArrowRight
                                    className={`w-3.5 h-3.5 text-[#9A6A12] shrink-0 transition-all duration-150 ${
                                      isCurrentSub
                                        ? 'opacity-100'
                                        : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                                    }`}
                                  />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* Footer bar inside dropdown */}
                <div className="mt-5 pt-4 border-t border-[#E7E0D5] flex items-center justify-between text-xs">
                  <span className="text-[#78716C]">
                    Click any category or subcategory to immediately view its matching products.
                  </span>
                  <button
                    type="button"
                    onClick={() => handleNavClick('/categories')}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#1C1917] hover:text-[#9A6A12] transition-colors whitespace-nowrap"
                  >
                    <span>View All Categories</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Full Navigation Drawer (with expandable Categories + Subcategories) */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16 }}
                onClick={() => setMobileOpen(false)}
                className="md:hidden fixed inset-0 top-14 bg-[#231B15]/40 backdrop-blur-[1px] z-30"
                aria-hidden="true"
              />
              <motion.nav
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                aria-label="Mobile Navigation Menu"
                className="md:hidden relative z-40 bg-[#FFFDF9] border-t border-[#E7DCCB] shadow-xl max-h-[75vh] overflow-y-auto"
              >
                <div className="px-3.5 py-3 space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = route.path === item.path;
                    const Icon = item.icon;

                    if (item.hasDropdown) {
                      return (
                        <div key={item.path} className="rounded-xl overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setMobileCatExpanded((prev) => !prev)}
                            aria-expanded={mobileCatExpanded}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                              isActive || mobileCatExpanded
                                ? 'bg-[#F6EDE3] text-[#231B15] font-semibold'
                                : 'text-[#4A4038] hover:bg-[#F6EDE3]/60 hover:text-[#231B15]'
                            }`}
                          >
                            <span className="inline-flex items-center gap-2.5">
                              <Icon className="w-4 h-4 text-[#C68616]" />
                              <span>{item.label}</span>
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-[#7C6F63] transition-transform duration-200 ${
                                mobileCatExpanded ? 'rotate-180 text-[#C68616]' : ''
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {mobileCatExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden bg-white border border-[#EFE7DA] rounded-xl mt-1.5 p-2.5 space-y-2.5"
                              >
                                {CATEGORIES.map((category) => (
                                  <div key={category.slug} className="space-y-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleCategorySelect(category.slug)}
                                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#F6EDE3] text-xs font-semibold text-[#231B15] text-left"
                                    >
                                      <span>{category.name}</span>
                                      <ArrowRight className="w-3.5 h-3.5 text-[#B87B14]" />
                                    </button>
                                    <div className="flex flex-wrap gap-1.5 pl-0.5">
                                      {category.subcategories.map((sub) => (
                                        <button
                                          key={sub}
                                          type="button"
                                          onClick={() => handleCategorySelect(category.slug, sub)}
                                          className="px-2.5 py-1 rounded-md bg-[#FFFBF5] border border-[#E7DCCB] text-[11px] text-[#4A4038] hover:border-[#E8A829] hover:text-[#231B15] transition-colors"
                                        >
                                          {sub}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                ))}

                                <button
                                  type="button"
                                  onClick={() => handleNavClick('/categories')}
                                  className="w-full pt-2 border-t border-[#F4EDE3] text-center text-xs font-semibold text-[#B87B14]"
                                >
                                  View All Categories &rarr;
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={item.path}
                        type="button"
                        onClick={() => handleNavClick(item.path)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-[#F6EDE3] text-[#231B15] font-semibold'
                            : 'text-[#4A4038] hover:bg-[#F6EDE3]/60 hover:text-[#231B15]'
                        }`}
                      >
                        <span className="inline-flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-[#C68616]" />
                          <span>{item.label}</span>
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-4 rounded-full bg-[#E8A829]" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Always-Visible Mobile Bottom Menu Bar */}
      <nav
        aria-label="Mobile Quick Navigation Bar"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#E7DCCB] shadow-[0_-4px_18px_rgba(35,27,21,0.08)]"
      >
        <div className="grid grid-cols-5 h-14 px-1">
          {MOBILE_BOTTOM_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = route.path === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNavClick(item.path)}
                className={`relative flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors focus-visible:outline-none ${
                  isActive ? 'text-[#B87B14] font-semibold' : 'text-[#5A4E44]'
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-3 right-3 h-[2.5px] bg-[#E8A829] rounded-b-full"
                  />
                )}
                <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-[#C68616]' : 'text-[#6B5E53]'}`} />
                <span className="leading-none truncate max-w-full">{item.mobileLabel}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
