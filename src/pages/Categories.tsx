import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { X, Ruler, MessageCircle, SlidersHorizontal } from 'lucide-react';
import SizeGuideModal from '../components/SizeGuideModal';

export default function Categories() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchQuery || null);
  const [priceRange, setPriceRange] = useState<number>(3000);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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
    'Churidars',
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
    <div className="bg-[#F7FCF9] min-h-screen font-sans text-slate-900 pb-4">
      {/* Mobile Top Header Banner with Emerald/Green theme */}
      <div className="bg-gradient-to-b from-[#064E3B] via-[#047857] to-[#065F46] text-white p-4 pt-5 pb-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="bg-emerald-400 text-emerald-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
            Erode Catalog
          </span>
          <button
            onClick={() => setIsSizeGuideOpen(true)}
            className="flex items-center gap-1 text-[10px] font-bold text-emerald-200 bg-emerald-950/50 border border-emerald-400/30 px-2.5 py-1 rounded-full"
          >
            <Ruler size={12} /> Size Chart
          </button>
        </div>

        <h1 className="text-xl font-serif font-black tracking-tight leading-tight">
          {searchQuery ? `"${searchQuery}" Results` : 'Wholesale Textile Catalog'}
        </h1>
        <p className="text-emerald-100/90 text-xs mt-1 leading-relaxed">
          Direct Erode weaver prices for Sarees, Nighties, Inskirts, Lungis, Churidars &amp; Sets.
        </p>

        {/* WhatsApp Direct Order Bar */}
        <div className="mt-3">
          <a
            href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex,%20I%20want%20to%20inquire%20about%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-2 px-3 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-1.5 shadow"
          >
            <MessageCircle size={15} /> WhatsApp Enquiry: 9655147000
          </a>
        </div>
      </div>

      {/* Horizontal Category Selection Pills */}
      <div className="bg-white border-b border-emerald-100 p-3 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">
            Filter By Category:
          </span>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${
              showFilters ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-gray-50 text-gray-600 border-gray-200'
            }`}
          >
            <SlidersHorizontal size={11} /> {showFilters ? 'Hide Filters' : 'Fabric Filter'}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
              selectedCategory === null
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-slate-700 hover:bg-emerald-100 border border-emerald-100'
            }`}
          >
            All Stock
          </button>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(isActive ? null : cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50/80 text-slate-700 hover:bg-emerald-100 border border-emerald-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Expandable Fabric Filters */}
        {showFilters && (
          <div className="mt-3 pt-3 border-t border-emerald-100 space-y-3 bg-emerald-50/40 p-2.5 rounded-xl">
            {/* Fabric Pills */}
            <div>
              <span className="block text-slate-700 font-bold uppercase tracking-wider text-[10px] mb-1">
                Filter by Fabric:
              </span>
              <div className="flex flex-wrap gap-1">
                {fabrics.map((fab) => (
                  <button
                    key={fab}
                    onClick={() => toggleFabric(fab)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                      selectedFabrics.includes(fab)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-600 border border-emerald-200'
                    }`}
                  >
                    {fab}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <div className="pt-1 flex justify-end">
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 text-rose-600 text-[10px] font-bold"
                >
                  <X size={12} /> Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2-Column Product Grid Area */}
      <div className="p-3">
        <ProductGrid 
          categoryFilter={selectedCategory}
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
