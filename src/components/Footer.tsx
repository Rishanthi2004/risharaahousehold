import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { CATEGORIES } from '../data/catalog';
import { RisharaaMark } from './BrandLogoMark';
import { ScrollReveal } from './ScrollReveal';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <footer className="bg-[#241D18] text-[#EDE4D8] border-t border-[#382E26] pb-14 md:pb-0">
      <ScrollReveal className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Showroom Overview */}
          <div className="col-span-2 lg:col-span-4 space-y-2.5 sm:space-y-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2BA49] rounded"
            >
              <RisharaaMark className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-lg sm:text-xl font-bold tracking-[0.08em] text-white">
                RISHARAA
              </span>
            </button>
            <p className="text-xs sm:text-sm font-medium text-[#F4BE5B]">
              Everything for Your Home &amp; Lifestyle
            </p>
            <p className="text-xs sm:text-sm text-[#C8BDB1] leading-relaxed max-w-sm">
              A multi-category retail showroom bringing together kitchen appliances, furniture,
              mattresses, cooling electronics, handbags, and travel luggage under one roof.
            </p>
            <p className="text-[11px] sm:text-xs text-[#A99D90]">
              EMI Payment Options available in showroom (Bajaj Finserv — Demo Feature).
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-2 space-y-2.5 sm:space-y-4">
            <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              Showroom Pages
            </h3>
            <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm text-[#C8BDB1]">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="hover:text-[#F4BE5B] transition-colors duration-150"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/about')}
                  className="hover:text-[#F4BE5B] transition-colors duration-150"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/categories')}
                  className="hover:text-[#F4BE5B] transition-colors duration-150"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/products')}
                  className="hover:text-[#F4BE5B] transition-colors duration-150"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/about', { section: 'brands' })}
                  className="hover:text-[#F4BE5B] transition-colors duration-150"
                >
                  Our Brands
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="hover:text-[#F4BE5B] transition-colors duration-150"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="col-span-1 lg:col-span-3 space-y-2.5 sm:space-y-4">
            <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              Main Categories
            </h3>
            <ul className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm text-[#C8BDB1]">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <button
                    type="button"
                    onClick={() => navigate('/categories', { cat: category.slug })}
                    className="inline-flex items-center gap-1 hover:text-[#F4BE5B] transition-colors duration-150 text-left"
                  >
                    <span>{category.name}</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-60 shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom Placeholder Info */}
          <div className="col-span-2 lg:col-span-3 space-y-2 sm:space-y-4 pt-2 border-t border-[#382E26] lg:pt-0 lg:border-t-0">
            <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              Showroom Information (Demo)
            </h3>
            <div className="space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm text-[#C8BDB1]">
              <p>[Showroom Street Address Placeholder]</p>
              <p className="text-[#E2D8CC]">Phone: [Showroom Phone Placeholder]</p>
              <p className="text-[#E2D8CC]">Email: [Showroom Email Placeholder]</p>
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#F4BE5B] hover:text-[#F8CE78] transition-colors pt-0.5"
              >
                <span>Visit Contact Page</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-7 sm:mt-12 pt-5 sm:pt-6 border-t border-[#382E26] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 text-[11px] sm:text-xs text-[#A99D90]">
          <p>&copy; {new Date().getFullYear()} RISHARAA Retail Showroom. Demo storefront content.</p>
          <p className="hidden sm:block">Showroom catalog &amp; placeholder contact details are structured for easy customization.</p>
        </div>
      </ScrollReveal>
    </footer>
  );
};
