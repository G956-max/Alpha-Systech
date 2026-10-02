import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Ruler, 
  ShoppingBag, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  RefreshCcw, 
  MapPin,
  PhoneCall,
  MessageCircle,
  Package,
  Boxes,
  Percent
} from 'lucide-react';
import { allProducts, Product } from '../data/products';
import { useStore } from '../context/StoreContext';
import CategoryGrid from '../components/CategoryGrid';
import SizeGuideModal from '../components/SizeGuideModal';

export default function Home() {
  const navigate = useNavigate();
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredTextiles = allProducts.slice(0, 8);

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-slate-900 font-sans">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white overflow-hidden py-16 lg:py-24 border-b border-indigo-900">
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1610030469668-93510cb07707?auto=format&fit=crop&q=80&w=2000")' }}
        />
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider mb-6">
                <MapPin size={13} className="text-amber-400" />
                Erode Wholesale Textile &amp; Saree Market
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white leading-tight tracking-tight mb-6">
                Sri Aadhi Nayaga Tex <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-200 to-amber-200">
                  Wholesale &amp; Retail Hub
                </span>
              </h1>

              <p className="text-indigo-100 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl font-light">
                Direct manufacturer &amp; wholesale market prices for <b className="text-white">Sarees (Cotton, Soft Silk, Pattu, Fancy), Nighties, Inskirts, Blouses, Lungis, Churidars, Tops &amp; Kurtis, Vetti &amp; Sattai, and Lining Materials</b>. 
                Orders &amp; enquiries accepted exclusively via <span className="text-amber-300 font-bold">WhatsApp &amp; Phone Call</span> with <span className="text-emerald-300 font-bold">All-India Parcel Transport</span>.
              </p>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 max-w-xl mb-8 text-xs text-indigo-200 flex items-center gap-2.5">
                <MapPin size={16} className="text-amber-400 shrink-0" />
                <span><b>Visit Store:</b> 53/A, Eswaran Temple, Kamarajar Street - 1, Erode - 638001</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 items-center">
                <button 
                  onClick={() => navigate('/categories')}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-400/25 flex items-center gap-2 group"
                >
                  Browse Wholesale Catalog
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <a 
                  href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex,%20I%20want%20to%20place%20an%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-500 text-white px-7 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-green-600/25"
                >
                  <MessageCircle size={17} />
                  WhatsApp Orders (9655147000)
                </a>

                <a 
                  href="tel:9655148000"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-4 rounded-full font-bold text-xs flex items-center gap-1.5"
                >
                  <PhoneCall size={15} />
                  9655148000
                </a>
              </div>

              {/* Live Metric Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-indigo-900/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-serif font-black text-white">Erode</div>
                  <div className="text-xs text-indigo-300 mt-1 uppercase font-semibold">Textile Hub</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif font-black text-amber-300">Wholesale</div>
                  <div className="text-xs text-indigo-300 mt-1 uppercase font-semibold">&amp; Retail Prices</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif font-black text-white">All-India</div>
                  <div className="text-xs text-indigo-300 mt-1 uppercase font-semibold">Parcel Transport</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif font-black text-emerald-300">100% Cotton</div>
                  <div className="text-xs text-indigo-300 mt-1 uppercase font-semibold">&amp; Pure Silks</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Product Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/30 group">
                <img 
                  src="https://images.unsplash.com/photo-1610030469668-93510cb07707?auto=format&fit=crop&q=80&w=800" 
                  alt="Erode Soft Cotton Saree" 
                  className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />
                
                <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                    Erode Special
                  </span>
                  <h3 className="text-xl font-serif font-bold leading-snug">
                    Erode Handloom Soft Cotton Saree
                  </h3>
                  <p className="text-xs text-indigo-200 mt-1">100% Pure Combed Cotton • Temple Border</p>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                    <div>
                      <span className="text-[11px] text-gray-300">Direct Market Rate</span>
                      <div className="text-xl font-black text-amber-300">₹650 <span className="line-through text-xs text-gray-400 font-normal">₹1,200</span></div>
                    </div>
                    <button
                      onClick={() => navigate('/product/1')}
                      className="bg-white text-slate-950 px-4 py-2 rounded-full font-bold text-xs uppercase hover:bg-amber-300 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Textile Trust Pillars */}
      <section className="bg-white border-b border-indigo-100 py-6">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-indigo-100">
            <div className="pt-4 md:pt-0 px-2 flex flex-col items-center">
              <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-2xl mb-2">
                <ShieldCheck size={22} />
              </div>
              <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider">Erode Market Rates</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Lowest wholesale &amp; retail prices</p>
            </div>

            <div className="pt-4 md:pt-0 px-2 flex flex-col items-center">
              <div className="p-2.5 bg-amber-50 text-amber-700 rounded-2xl mb-2">
                <Boxes size={22} />
              </div>
              <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider">Wholesale Bundles</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Packs of 5, 10 &amp; full bales available</p>
            </div>

            <div className="pt-4 md:pt-0 px-2 flex flex-col items-center">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-2xl mb-2">
                <Truck size={22} />
              </div>
              <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider">All-India Delivery</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Daily parcel &amp; lorry transport dispatch</p>
            </div>

            <div className="pt-4 md:pt-0 px-2 flex flex-col items-center">
              <div className="p-2.5 bg-rose-50 text-rose-700 rounded-2xl mb-2">
                <MessageCircle size={22} />
              </div>
              <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider">WhatsApp Ordering</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Direct photo selection &amp; video call</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-[#FAFAFA]">
        <div className="w-full">
          <CategoryGrid title="Sri Aadhi Nayaga Tex Categories" />
        </div>
      </section>

      {/* Featured Items Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-white border-t border-indigo-100">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Bestselling Stock
                </span>
                <span className="text-xs text-gray-500 font-semibold">Daily Wear &amp; Festive Collection</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
                Featured Textiles &amp; Dresses
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 border border-indigo-200 px-4 py-2.5 rounded-full transition-colors flex items-center gap-1.5"
              >
                <Ruler size={14} /> Measurement Chart
              </button>
              
              <button 
                onClick={() => navigate('/categories')}
                className="text-xs font-bold text-white bg-slate-900 hover:bg-black px-5 py-2.5 rounded-full transition-colors"
              >
                View All 12 Categories &rarr;
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {featuredTextiles.map((item) => {
              const discountPct = Math.round(((item.retailPrice - item.price) / item.retailPrice) * 100);

              return (
                <div 
                  key={item.id}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="group cursor-pointer flex flex-col bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl hover:border-indigo-400 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] w-full bg-indigo-50/40 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Discount & Category Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow">
                        {discountPct}% OFF
                      </span>
                      <span className="bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow border border-gray-200">
                        {item.category}
                      </span>
                    </div>

                    {item.isBestseller && (
                      <div className="absolute top-3 right-3 bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow uppercase">
                        Fast Moving
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                      <span>{item.brand}</span>
                      <span className="text-emerald-700 font-bold">In Stock</span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-700 transition-colors line-clamp-2 leading-snug mb-2">
                      {item.name}
                    </h3>

                    <p className="text-[11px] text-gray-500 line-clamp-1 mb-3">
                      Fabric: {item.fabric}
                    </p>

                    {/* Sizes Tag */}
                    <div className="flex items-center gap-1 flex-wrap mb-4">
                      {item.sizes.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="text-lg font-black text-slate-900">
                          ₹{item.price.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          MRP: <span className="line-through">₹{item.retailPrice.toLocaleString()}</span>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/919655147000?text=${encodeURIComponent(`Vanakkam Sri Aadhi Nayaga Tex! I want to order/enquire: ${item.name} (Code: #${item.id}) at wholesale rate ₹${item.price}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-green-600 hover:bg-green-700 text-white px-3.5 py-1.5 rounded-full transition-colors shadow-sm flex items-center gap-1 text-[11px] font-bold"
                        title="Order via WhatsApp"
                      >
                        <MessageCircle size={14} />
                        <span>Order</span>
                      </a>
                    </div>

                    {/* Wholesale Bundle Price */}
                    <div className="mt-2 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded font-medium flex justify-between">
                      <span>Bundle (Pack of {item.bundleQuantity}):</span>
                      <span className="font-bold text-emerald-900">₹{item.wholesalePrice.toLocaleString()}/pc</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wholesale Bulk Orders Banner */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white border-y border-indigo-900">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl space-y-4">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Wholesale &amp; Reseller Orders
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-black leading-tight">
              Looking for Wholesale Textile Bundles in Erode?
            </h3>
            <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
              We supply retail clothing shops, resellers, and online sellers across Tamil Nadu and All-India with daily bales and bundles of Sarees, Nighties, Lungis, Inskirts, and Churidars. Direct manufacturer prices with fast parcel transport booking.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex,%20I%20am%20a%20shop%20owner%20looking%20for%20wholesale%20bundles."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
              >
                <MessageCircle size={16} />
                WhatsApp 9655147000
              </a>
              <a
                href="tel:9655148000"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <PhoneCall size={16} />
                Call 9655148000
              </a>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 max-w-sm w-full space-y-4 text-xs">
            <h4 className="font-serif font-bold text-base text-amber-300">Shop Location &amp; Highlights:</h4>
            <div className="space-y-2.5 text-indigo-100">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span>53/A, Eswaran Temple, Kamarajar Street - 1, Erode - 638001</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                <span>Direct Handloom &amp; Powerloom Sourcing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                <span>Daily Parcel Delivery Across All India</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                <span>Video Call Selection Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
