import { Sparkles, Shirt, Layers, Scissors } from 'lucide-react';

interface FiltersSidebarProps {
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  priceRange: number;
  setPriceRange: (price: number) => void;
  conditions: string[];
  setConditions: (conds: string[]) => void;
}

export default function FiltersSidebar({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  conditions,
  setConditions
}: FiltersSidebarProps) {
  
  const toggleCondition = (condition: string) => {
    if (conditions.includes(condition)) {
      setConditions(conditions.filter(c => c !== condition));
    } else {
      setConditions([...conditions, condition]);
    }
  };

  const categories = [
    { name: 'Sarees', icon: Sparkles },
    { name: 'Nighties', icon: Shirt },
    { name: 'Inskirts', icon: Layers },
    { name: 'Blouses', icon: Scissors },
  ];

  return (
    <div className="w-full sm:w-64 shrink-0 pr-8 bg-[#FAFAFA]">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#1a202c]">Textile Filters</h2>
        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Refine Catalog</p>
      </div>

      {/* Categories */}
      <div className="mb-10 space-y-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.name;
          return (
            <button 
              key={cat.name}
              onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
              className={`flex items-center space-x-3 w-full p-2 border-l-2 shadow-sm rounded-r-md transition-colors ${isSelected ? 'bg-white border-[#1a202c]' : 'hover:bg-white border-transparent'}`}
            >
              <Icon className={`h-4 w-4 ${isSelected ? 'text-[#1a202c]' : 'text-gray-400'}`} />
              <span className={`text-sm tracking-wide ${isSelected ? 'font-semibold text-[#1a202c] uppercase' : 'font-medium text-gray-500 uppercase'}`}>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Price Range */}
      <div className="mb-10">
        <h3 className="text-sm font-semibold text-[#1a202c] mb-4">Max Wholesale Price: ₹{priceRange}</h3>
        <input 
          type="range" 
          min="50" 
          max="3000" 
          step="50"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-4"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>₹50</span>
          <span>₹3,000</span>
        </div>
      </div>

      {/* Quality Grade / Packaging */}
      <div>
        <h3 className="text-sm font-semibold text-[#1a202c] mb-4">Packaging &amp; Grade</h3>
        <div className="space-y-3 pt-1">
          {['Wholesale Bundle Pack', 'Export Quality Weave'].map((cond) => (
            <label key={cond} className="flex items-center space-x-3 cursor-pointer group">
              <div className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${conditions.includes(cond) ? 'border-[#1a202c] bg-[#1a202c]' : 'border-gray-300 group-hover:border-[#1a202c]'}`}>
                {conditions.includes(cond) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input type="checkbox" className="hidden" checked={conditions.includes(cond)} onChange={() => toggleCondition(cond)} />
              <span className="text-sm text-gray-600">{cond}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
