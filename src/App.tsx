import React, { useState } from 'react';
import { MotionConfig, AnimatePresence, motion } from 'motion/react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { ShortlistProvider } from './context/ShortlistContext';
import { WishlistProvider } from './context/WishlistContext';
import { Product } from './data/catalog';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ShortlistDrawer } from './components/ShortlistDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductsPage } from './pages/ProductsPage';
import { ContactPage } from './pages/ContactPage';

const AppShell: React.FC = () => {
  const { route } = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const renderPage = () => {
    switch (route.path) {
      case '/about':
        return <AboutPage />;
      case '/categories':
        return <CategoriesPage onSelectProduct={setSelectedProduct} />;
      case '/products':
        return <ProductsPage onSelectProduct={setSelectedProduct} />;
      case '/contact':
        return <ContactPage />;
      case '/':
      default:
        return <HomePage onSelectProduct={setSelectedProduct} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF5] text-[#231B15]">
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={route.path}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <WishlistDrawer onSelectProduct={setSelectedProduct} />
      <ShortlistDrawer />
    </div>
  );
};

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider>
        <ShortlistProvider>
          <WishlistProvider>
            <AppShell />
          </WishlistProvider>
        </ShortlistProvider>
      </RouterProvider>
    </MotionConfig>
  );
}
