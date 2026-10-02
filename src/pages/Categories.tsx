import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { X, Ruler, MapPin, PhoneCall, MessageCircle } from 'lucide-react';
import SizeGuideModal from '../components/SizeGuideModal';

export default function Categories() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(3000);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const toggleFabric = (fabric: string) => {
    if (selectedFabrics.includes(fabric)) {
      setSelectedFabrics(selectedFabrics.filter(f => f !== fabric));
    } else {
      setSelectedFabrics([...selectedFabrics, fabric]);
    }
  };

  const categories = [
    'Sarees',
    'Nighties',
    'Inskirts',
    'Blouses',
    'Lungis',
    'Churidars & Materials',
    'Tops & Kurtis',
    'Vetti & Sattai',
    'Lining & Inners'
  ];

  const fabrics = ['Cotton', 'Soft Silk', 'Georgette', 'Rayon', 'Poplin', 'Linen'];

  const hasActiveFilters = selectedCategory || priceRange < 3000 || selectedFabrics.length > 0;

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setPriceRange(3000);
    setSelectedFabrics([]);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-sans text-slate-900 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white pt-12 pb-10 border-b border-indigo-900">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Erode Wholesale Catalog
                </span>
                <span className="text-xs text-indigo-300">53/A, Eswaran Temple, Kamarajar St - 1, Erode</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight">
                {searchQuery ? `Products matching "${searchQuery}"` : 'Textile & Saree Market Catalog'}
              </h1>
              <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-2xl font-light">
                Direct manufacturer prices for Sarees, Nighties, Inskirts, Blouses, Lungis, Churidars, Tops &amp; Kurtis, Vetti &amp; Sattai, and Lining Materials.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex,%20I%20want%20to%20inquire%20about%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 shadow"
              >
                <MessageCircle size={14} /> WhatsApp 9655147000
              </a>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-full text-xs font-bold uppercase transition-colors"
              >
                <Ruler size={14} /> Size Chart
              </button>
            </div>
          </div>

          {/* Interactive Filters Bar */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/10 space-y-4">
            {/* Category Pills */}
            <div>
              <span className="block text-[10px] font-bold text-amber-200 uppercase tracking-widest mb-2">
                Select Product Category:
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(isActive ? null : cat)}
                      className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 shadow-md'
                          : 'bg-white/10 hover:bg-white/20 text-indigo-100 border border-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row of Detailed Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-3 border-t border-white/10 items-end">
              {/* Max Price Slider */}
              <div>
                <div className="flex justify-between items-center mb-1 text-[11px]">
                  <span className="text-indigo-200 font-bold uppercase tracking-wider">Max Price:</span>
                  <span className="text-amber-300 font-black">₹{priceRange.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="3000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1.5 bg-indigo-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* Fabric Filter */}
              <div>
                <span className="block text-indigo-200 font-bold uppercase tracking-wider text-[11px] mb-1.5">
                  Fabric:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {fabrics.map((fab) => (
                    <button
                      key={fab}
                      onClick={() => toggleFabric(fab)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                        selectedFabrics.includes(fab)
                          ? 'bg-amber-400 text-slate-950 shadow'
                          : 'bg-white/10 hover:bg-white/20 text-indigo-100 border border-white/10'
                      }`}
                    >
                      {fab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <div className="flex items-center justify-end">
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="flex items-center gap-1 text-rose-300 hover:text-white text-xs font-bold transition-colors"
                  >
                    <X size={14} /> Reset Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Grid Area */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <ProductGrid 
          categoryFilter={selectedCategory}
          priceFilter={priceRange}
          fabricFilter={selectedFabrics}
          searchFilter={searchQuery}
        />
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
