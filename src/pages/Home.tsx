import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Shield, Banknote, Headphones } from 'lucide-react';
import CategoryGrid from '../components/CategoryGrid';

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

      {/* Trust Badges Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-white border-b border-gray-100">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <ShieldCheck className="w-10 h-10 text-[#1a202c]" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-[#1a202c] mb-3">Tested & Verified</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">Every unit undergoes a 50-point diagnostic check.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Shield className="w-10 h-10 text-[#1a202c]" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-[#1a202c] mb-3">Warranty Available</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">Optional extended protection on all imports.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Banknote className="w-10 h-10 text-[#1a202c]" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-[#1a202c] mb-3">Affordable Pricing</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">Premium specs at 40-60% below retail MSRP.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Headphones className="w-10 h-10 text-[#1a202c]" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-[#1a202c] mb-3">Customer Support</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">Direct technical assistance for procurement.</p>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-24 bg-[#F8F9FA]">
        <div className="w-full flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a202c] mb-10 leading-tight">
              Authority in Technical Precision
            </h2>
            <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
              <p>
                Alpha Systech is more than a retailer; we are a specialized procurement agency for high-end international hardware. Founded on the principles of corporate stability and technical excellence, we serve IT professionals and enterprises who demand performance without the premium of new retail costs.
              </p>
              <p>
                Our sourcing network spans global markets, allowing us to bring enterprise-grade laptops—the kind built for decade-long durability—to the local market at unprecedented values.
              </p>
            </div>
            <a 
              href="#" 
              className="inline-block mt-12 text-[#1a202c] font-bold text-sm tracking-widest uppercase border-b-2 border-[#1a202c] pb-2 hover:text-gray-600 hover:border-gray-600 transition-colors"
            >
              Our Procurement Process
            </a>
          </div>
          <div className="lg:w-1/2 flex gap-4">
            <div className="flex-1 aspect-[4/5] overflow-hidden bg-gray-200 rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" 
                alt="Technical precision" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 aspect-[4/5] overflow-hidden bg-gray-200 rounded-sm relative">
               <img 
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800" 
                alt="Server Room" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/5 flex items-end p-6">
                 <span className="text-gray-800 font-bold text-sm tracking-widest uppercase bg-white/90 px-4 py-2">Server Room</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
