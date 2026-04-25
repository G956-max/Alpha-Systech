import { Laptop, Cpu, MemoryStick, HardDrive } from 'lucide-react';

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

  return (
    <div className="w-full sm:w-64 shrink-0 pr-8 bg-[#FAFAFA]">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#1a202c]">Filters</h2>
        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Refine Results</p>
      </div>

      {/* Categories */}
      <div className="mb-10 space-y-2">
        <button 
          onClick={() => setSelectedCategory(selectedCategory === 'Laptops' ? null : 'Laptops')}
          className={`flex items-center space-x-3 w-full p-2 border-l-2 shadow-sm rounded-r-md transition-colors ${selectedCategory === 'Laptops' ? 'bg-white border-[#1a202c]' : 'hover:bg-white border-transparent'}`}
        >
          <Laptop className={`h-4 w-4 ${selectedCategory === 'Laptops' ? 'text-[#1a202c]' : 'text-gray-400'}`} />
          <span className={`text-sm tracking-wide ${selectedCategory === 'Laptops' ? 'font-semibold text-[#1a202c] uppercase' : 'font-medium text-gray-500 uppercase'}`}>Laptops</span>
        </button>
        <button 
          onClick={() => setSelectedCategory(selectedCategory === 'Processors' ? null : 'Processors')}
          className={`flex items-center space-x-3 w-full p-2 border-l-2 rounded-r-md transition-colors ${selectedCategory === 'Processors' ? 'bg-white border-[#1a202c]' : 'hover:bg-white border-transparent'}`}
        >
          <Cpu className={`h-4 w-4 ${selectedCategory === 'Processors' ? 'text-[#1a202c]' : 'text-gray-400'}`} />
          <span className={`text-sm tracking-wide ${selectedCategory === 'Processors' ? 'font-semibold text-[#1a202c] uppercase' : 'font-medium text-gray-500 uppercase'}`}>Processors</span>
        </button>
        <button 
          onClick={() => setSelectedCategory(selectedCategory === 'Memory' ? null : 'Memory')}
          className={`flex items-center space-x-3 w-full p-2 border-l-2 rounded-r-md transition-colors ${selectedCategory === 'Memory' ? 'bg-white border-[#1a202c]' : 'hover:bg-white border-transparent'}`}
        >
          <MemoryStick className={`h-4 w-4 ${selectedCategory === 'Memory' ? 'text-[#1a202c]' : 'text-gray-400'}`} />
          <span className={`text-sm tracking-wide ${selectedCategory === 'Memory' ? 'font-semibold text-[#1a202c] uppercase' : 'font-medium text-gray-500 uppercase'}`}>Memory</span>
        </button>
        <button 
          onClick={() => setSelectedCategory(selectedCategory === 'Storage' ? null : 'Storage')}
          className={`flex items-center space-x-3 w-full p-2 border-l-2 rounded-r-md transition-colors ${selectedCategory === 'Storage' ? 'bg-white border-[#1a202c]' : 'hover:bg-white border-transparent'}`}
        >
          <HardDrive className={`h-4 w-4 ${selectedCategory === 'Storage' ? 'text-[#1a202c]' : 'text-gray-400'}`} />
          <span className={`text-sm tracking-wide ${selectedCategory === 'Storage' ? 'font-semibold text-[#1a202c] uppercase' : 'font-medium text-gray-500 uppercase'}`}>Storage</span>
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-10">
        <h3 className="text-sm font-semibold text-[#1a202c] mb-4">Max Price: ${priceRange}</h3>
        <input 
          type="range" 
          min="100" 
          max="5000" 
          step="100"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-4"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>$100</span>
          <span>$5000</span>
        </div>
      </div>

      {/* Condition */}
      <div>
        <h3 className="text-sm font-semibold text-[#1a202c] mb-4">Condition</h3>
        <div className="space-y-3 pt-1">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <div className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${conditions.includes('Brand New') ? 'border-[#1a202c] bg-[#1a202c]' : 'border-gray-300 group-hover:border-[#1a202c]'}`}>
               {conditions.includes('Brand New') && (
                 <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                 </svg>
               )}
            </div>
            <input type="checkbox" className="hidden" checked={conditions.includes('Brand New')} onChange={() => toggleCondition('Brand New')} />
            <span className="text-sm text-gray-600">Brand New</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer group">
            <div className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${conditions.includes('Refurbished') ? 'border-[#1a202c] bg-[#1a202c]' : 'border-gray-300 group-hover:border-[#1a202c]'}`}>
               {conditions.includes('Refurbished') && (
                 <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                 </svg>
               )}
            </div>
            <input type="checkbox" className="hidden" checked={conditions.includes('Refurbished')} onChange={() => toggleCondition('Refurbished')} />
            <span className="text-sm text-gray-600">Refurbished</span>
          </label>
        </div>
      </div>
    </div>
  );
}
