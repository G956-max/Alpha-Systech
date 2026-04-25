import React, { useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import FiltersSidebar from '../components/FiltersSidebar';
import { SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [conditions, setConditions] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="bg-[#1a202c] py-20 text-white mb-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-4 tracking-tight">Technical Categories</h1>
              <p className="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed">
                Browse our specialized inventory organized by performance tier and hardware architecture.
              </p>
            </div>
            
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl border border-white/10 transition-all active:scale-95 self-start"
            >
              <SlidersHorizontal size={18} />
              <span className="text-sm font-bold uppercase tracking-widest">Filter</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-[101] lg:hidden shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-[#1a202c]">Filters</h2>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <FiltersSidebar 
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  conditions={conditions}
                  setConditions={setConditions}
                />
              </div>
              
              <button 
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full bg-[#1a202c] text-white py-4 rounded-xl font-bold uppercase tracking-widest mt-6"
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <FiltersSidebar 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              conditions={conditions}
              setConditions={setConditions}
            />
          </div>
          
          {/* Right Product Grid */}
          <div className="flex-1">
            <ProductGrid 
              categoryFilter={selectedCategory}
              priceFilter={priceRange}
              conditionFilter={conditions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
