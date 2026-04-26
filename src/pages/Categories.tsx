import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { Laptop, Cpu, MemoryStick, HardDrive, X } from 'lucide-react';

export default function Categories() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(500000);
  const [conditions, setConditions] = useState<string[]>([]);

  const toggleCondition = (condition: string) => {
    if (conditions.includes(condition)) {
      setConditions(conditions.filter(c => c !== condition));
    } else {
      setConditions([...conditions, condition]);
    }
  };

  const categories = [
    { name: 'Laptops', icon: Laptop },
    { name: 'Accessories', icon: MemoryStick },
    { name: 'Monitors', icon: HardDrive },
    { name: 'Audio', icon: Cpu },
  ];

  const hasActiveFilters = selectedCategory || priceRange < 5000 || conditions.length > 0;

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setPriceRange(500000);
    setConditions([]);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Header with Inline Filters */}
      <div className="bg-[#1a202c] text-white pb-10 pt-20 mb-10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Technical Categories'}
          </h1>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed mb-8">
            {searchQuery 
              ? `Found products matching your search criteria.`
              : 'Browse our specialized inventory organized by performance tier and hardware architecture.'}
          </p>

          {/* Filter Options — inside the banner */}
          <div className="space-y-6">
            {/* Category Pills */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(isActive ? null : cat.name)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-white text-[#1a202c] shadow-lg shadow-black/20'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/5'
                      }`}
                    >
                      <cat.icon size={16} />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price + Condition Row */}
            <div className="flex flex-col sm:flex-row gap-6 sm:items-end">
              {/* Price Range */}
              <div className="flex-1 max-w-xs">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">
                  Max Price: <span className="text-white">₹{priceRange.toLocaleString()}</span>
                </p>
                <input
                  type="range"
                  min="1000"
                  max="500000"
                  step="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1.5">
                  <span>₹1,000</span>
                  <span>₹5,00,000</span>
                </div>
              </div>

              {/* Condition */}
              <div className="flex items-center gap-3">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mr-1 hidden sm:block">Condition:</p>
                <button
                  onClick={() => toggleCondition('Brand New')}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    conditions.includes('Brand New')
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/5'
                  }`}
                >
                  Brand New
                </button>
                <button
                  onClick={() => toggleCondition('Refurbished')}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    conditions.includes('Refurbished')
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/5'
                  }`}
                >
                  Refurbished
                </button>
              </div>

              {/* Clear All */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-widest transition-colors self-end pb-1"
                >
                  <X size={14} />
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Grid — full width, no sidebar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-24">
        <ProductGrid 
          categoryFilter={selectedCategory}
          priceFilter={priceRange}
          conditionFilter={conditions}
          searchFilter={searchQuery}
        />
      </div>
    </div>
  );
}
