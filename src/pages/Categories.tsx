import React, { useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import FiltersSidebar from '../components/FiltersSidebar';

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [conditions, setConditions] = useState<string[]>([]);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="bg-[#1a202c] py-20 text-white mb-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Technical Categories</h1>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed">
            Browse our specialized inventory organized by performance tier and hardware architecture.
          </p>
        </div>
      </div>
      
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
