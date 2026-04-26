import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Shield, Banknote, Headphones } from 'lucide-react';
import CategoryGrid from '../components/CategoryGrid';
import { allProducts } from '../data/products';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center bg-[#1a202c]">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-center bg-cover mix-blend-overlay opacity-60"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2000")' }}
        />
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#1a202c] text-white text-xs font-bold px-3 py-1 mb-6 tracking-widest uppercase border border-gray-600">
              Premium Inventory
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6 font-sans leading-tight">
              Quality Imported Laptops at Affordable Prices
            </h1>
            <p className="text-gray-300 text-sm md:text-base md:leading-relaxed mb-10 max-w-xl">
              Directly sourced enterprise-grade hardware. Rigorously tested, verified, and ready for professional high-performance workflows.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/categories')}
                className="bg-white text-[#1a202c] px-8 py-3.5 font-bold text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors"
              >
                Browse Laptops
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-[#FAFAFA]">
        <div className="w-full">
          <CategoryGrid title="Shop by Category" />
        </div>
      </section>
      
      {/* Top Products Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-[#1a202c] mb-10 font-serif">Top Products</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {allProducts.slice(0, 16).map((product) => (
              <div 
                key={product.id} 
                onClick={() => navigate(`/product/${product.id}`)}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100 mb-3">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 text-[10px] font-bold text-[#1a202c]">
                    ${product.price}
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-[10px] font-bold text-[#1a202c] leading-tight mb-1 group-hover:underline line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-[8px] text-gray-400 font-medium uppercase tracking-tighter">
                    {product.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
