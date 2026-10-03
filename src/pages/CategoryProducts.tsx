import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';

export default function CategoryProducts() {
  const { categoryName } = useParams<{ categoryName: string }>();

  return (
    <div className="p-3 min-h-screen bg-[#F7FCF9] font-sans text-slate-900 pb-4">
      {/* Header Banner */}
      <div className="mb-3 bg-gradient-to-b from-[#064E3B] via-[#047857] to-[#065F46] text-white p-4 rounded-2xl border border-emerald-700/60 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="bg-emerald-400 text-emerald-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
            Wholesale Lots
          </span>
          <Link
            to="/categories"
            className="text-emerald-200 hover:text-white text-xs font-bold flex items-center gap-1 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30"
          >
            <ArrowLeft size={12} /> Back
          </Link>
        </div>

        <h1 className="text-xl font-serif font-black tracking-tight leading-tight">
          {categoryName} Stock Lots
        </h1>
        <p className="text-emerald-100 text-xs leading-relaxed font-light">
          Direct Erode textile inventory from Sri Aadhi Nayaga Tex with all-India parcel transport.
        </p>
      </div>
      
      {/* 2-Column Product Grid with exact 3D floating animation as categories */}
      <ProductGrid 
        categoryFilter={categoryName} 
        title={`${categoryName} Collection`}
      />
    </div>
  );
}
