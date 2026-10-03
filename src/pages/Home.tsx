import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Ruler, 
  ShieldCheck, 
  Truck, 
  Boxes, 
  MessageCircle, 
  PhoneCall, 
  MapPin, 
  CheckCircle2, 
  Flame, 
  Layers, 
  ChevronRight,
  TrendingUp,
  Award,
  Copy,
  Check,
  Maximize2,
  X,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { allProducts } from '../data/products';
import CategoryGrid from '../components/CategoryGrid';
import ProductGrid from '../components/ProductGrid';
import SizeGuideModal from '../components/SizeGuideModal';
import ThreeDCard from '../components/ThreeDCard';
import ThreeDText from '../components/ThreeDText';

export default function Home() {
  const navigate = useNavigate();
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isBannerZoomOpen, setIsBannerZoomOpen] = useState(false);
  const [copiedGstin, setCopiedGstin] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyGstin = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('33JDQPD4538B1Z0');
    setCopiedGstin(true);
    setTimeout(() => setCopiedGstin(false), 2200);
  };

  const featuredTextiles = allProducts.slice(0, 8);

  return (
    <div className="bg-[#F7FCF9] min-h-screen text-slate-900 font-sans pb-4">
      
      {/* Hero Section Matching Exact User Reference Image */}
      <section className="relative w-full bg-[#022c22] text-white p-3.5 pt-4 pb-5 overflow-hidden">
        
        {/* Subtle decorative dot grid background */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(circle, #34d399 1px, transparent 1px)', 
            backgroundSize: '16px 16px' 
          }} 
        />

        <div className="relative z-10 space-y-3">
          
          {/* 1. Divine Invocation Pill */}
          <div className="flex justify-center">
            <motion.div 
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-1.5 bg-[#033b2e] border border-emerald-500/50 px-4 py-1 rounded-full text-amber-300 text-[11px] font-black uppercase tracking-wider shadow-sm"
            >
              <Sparkles size={12} className="text-amber-300" />
              <span>வெங்கடேசப்பெருமான் நங்கம்மா தாய் துணை</span>
            </motion.div>
          </div>

          {/* 2. Sub-pills: GSTIN with Copy & Surat Rates */}
          <div className="flex items-center justify-between gap-2">
            {/* GSTIN Copy Pill */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyGstin}
              className="inline-flex items-center gap-1.5 bg-[#033b2e] border border-emerald-500/40 px-3 py-1.5 rounded-full text-[11px] font-bold shadow-xs hover:border-amber-400 transition-colors"
              title="Click to copy GSTIN"
            >
              <span className="text-amber-300 font-extrabold">GSTIN:</span>
              <span className="text-emerald-100 tracking-wide font-mono">33JDQPD4538B1Z0</span>
              {copiedGstin ? (
                <Check size={12} className="text-emerald-400 animate-bounce" />
              ) : (
                <Copy size={12} className="text-emerald-300" />
              )}
            </motion.button>

            {/* Surat Wholesale Rates Pill */}
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-950/80 via-rose-900/60 to-rose-950/80 border border-rose-500/40 px-3 py-1.5 rounded-full text-[11px] font-extrabold text-rose-200 shadow-xs">
              <Flame size={13} className="text-rose-400 animate-pulse" />
              <span>சூரத் மொத்த விலைக்கே</span>
            </div>
          </div>

          {/* 3. Main Hero Banner Card (With Lord Ganesha & Glowing Neon Graphics) */}
          <ThreeDCard depth={12} autoFloat={true} onClick={() => setIsBannerZoomOpen(true)}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-400/80 bg-gradient-to-b from-[#01221a] via-[#064E3B] to-[#01221a] group cursor-pointer preserve-3d">
              {/* Continuous Shimmer Light Sweep */}
              <div className="animate-shimmer-card" />

              {/* Banner Graphic Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-emerald-950">
                <img 
                  src="/shop_main_banner.jpg" 
                  alt="Sri Aadhi Nayaga Tex Wholesale Textile Banner" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlaid Banner Badges (Matching Screenshot) */}
                <div className="absolute top-2 left-2 z-20">
                  <span className="bg-black/60 backdrop-blur-xs text-amber-200 text-[8px] font-mono font-bold px-2 py-0.5 rounded-md border border-amber-300/40 shadow-xs">
                    GSTIN : 33JDQPD4538B1Z0
                  </span>
                </div>

                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 hidden xs:block">
                  <span className="bg-black/50 text-amber-300 text-[8px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                    வெங்கடேசப்பெருமான் நங்கம்மா தாய் துணை
                  </span>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsBannerZoomOpen(true);
                  }}
                  className="absolute top-2 right-2 z-20 bg-black/70 hover:bg-black text-white text-[9px] font-bold px-2 py-1 rounded-lg border border-white/30 shadow-md flex items-center gap-1 group-hover:scale-105 transition-transform"
                >
                  <Maximize2 size={11} className="text-amber-300" />
                  <span>Zoom HD</span>
                </button>

                {/* Bottom Address Overlay */}
                <div className="absolute bottom-1 inset-x-0 text-center z-20">
                  <span className="text-[9px] text-white/90 bg-black/60 px-3 py-0.5 rounded-full border border-white/20 font-medium inline-block shadow-xs">
                    53/A, Eswaran Kovil, Kamarajar Street, Erode
                  </span>
                </div>
              </div>
            </div>
          </ThreeDCard>

          {/* 4. Under-banner Ribbon Banner */}
          <div className="flex items-center justify-center gap-1.5 text-center text-amber-300 text-[11px] font-bold pt-0.5">
            <Bookmark size={13} className="text-amber-400 shrink-0" />
            <span>மொத்தம் மற்றும் சில்லறை வியாபாரம் சூரத் விலைக்கே</span>
          </div>

          {/* 5. Two Big Action CTA Buttons (WhatsApp & Call Shop) */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <motion.a 
              href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex,%20I%20want%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.94 }}
              animate={{ 
                boxShadow: [
                  '0 4px 15px rgba(5, 150, 105, 0.4)',
                  '0 6px 24px rgba(5, 150, 105, 0.7)',
                  '0 4px 15px rgba(5, 150, 105, 0.4)'
                ]
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-[#059669] hover:bg-[#047857] text-white py-3 px-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 border border-emerald-400/40 shadow-lg"
            >
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </motion.a>

            <motion.a 
              href="tel:965537000"
              whileTap={{ scale: 0.94 }}
              className="bg-[#FFB703] hover:bg-[#F7A600] text-slate-950 py-3 px-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 border border-amber-300"
            >
              <PhoneCall size={17} className="text-slate-950" />
              <span>Call Shop</span>
            </motion.a>
          </div>

          {/* 6. 4-Grid Quick Contact Cards (2x2 on Dark Green) */}
          <div className="grid grid-cols-2 gap-2 pt-1.5">
            {/* Direct Shop Call */}
            <motion.a
              href="tel:965537000"
              whileTap={{ scale: 0.96 }}
              className="p-2.5 bg-[#033b2e] rounded-xl border border-emerald-500/30 flex items-center gap-2.5 shadow-sm hover:border-amber-400/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
                <PhoneCall size={15} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[9px] font-extrabold text-emerald-300 uppercase tracking-wider truncate">
                  DIRECT SHOP CALL
                </h4>
                <p className="text-[11px] text-white font-black leading-tight truncate">
                  96553 7000 / 9800
                </p>
              </div>
            </motion.a>

            {/* WhatsApp Orders */}
            <motion.a
              href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.96 }}
              className="p-2.5 bg-[#033b2e] rounded-xl border border-emerald-500/30 flex items-center gap-2.5 shadow-sm hover:border-emerald-400 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0 border border-[#25D366]/30">
                <MessageCircle size={16} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[9px] font-extrabold text-emerald-300 uppercase tracking-wider truncate">
                  WHATSAPP ORDERS
                </h4>
                <p className="text-[11px] text-white font-black leading-tight truncate">
                  9655147000
                </p>
              </div>
            </motion.a>

            {/* Erode Location */}
            <motion.a
              href="https://maps.google.com/?q=53/A,+Eswaran+Kovil,+Kamarajar+Street,+Erode"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.96 }}
              className="p-2.5 bg-[#033b2e] rounded-xl border border-emerald-500/30 flex items-center gap-2.5 shadow-sm hover:border-amber-400/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
                <MapPin size={15} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[9px] font-extrabold text-emerald-300 uppercase tracking-wider truncate">
                  ERODE LOCATION <span className="text-amber-400">(MAP 📍)</span>
                </h4>
                <p className="text-[11px] text-white font-black leading-tight truncate">
                  53/A, Eswaran Kovil St
                </p>
              </div>
            </motion.a>

            {/* Parcel Transport */}
            <div className="p-2.5 bg-[#033b2e] rounded-xl border border-emerald-500/30 flex items-center gap-2.5 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-teal-400/20 text-teal-300 flex items-center justify-center shrink-0 border border-teal-400/30">
                <Truck size={15} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[9px] font-extrabold text-emerald-300 uppercase tracking-wider truncate">
                  PARCEL TRANSPORT
                </h4>
                <p className="text-[11px] text-white font-black leading-tight truncate">
                  Daily All-India Bales
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Trust Badges in White Container Below Hero (Matching User Screenshot) */}
      <section className="px-3 py-4 bg-white border-b border-emerald-100 shadow-xs">
        <div className="grid grid-cols-2 gap-3">
          {/* Erode Market Rates */}
          <div className="flex flex-col items-center text-center p-2">
            <div className="w-11 h-11 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center mb-2 shadow-xs">
              <ShieldCheck size={20} />
            </div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">
              ERODE MARKET RATES
            </h4>
            <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">
              Lowest wholesale &amp; retail prices
            </p>
          </div>

          {/* Wholesale Bundles */}
          <div className="flex flex-col items-center text-center p-2">
            <div className="w-11 h-11 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-2 shadow-xs">
              <Boxes size={20} />
            </div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">
              WHOLESALE BUNDLES
            </h4>
            <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">
              Packs of 5, 10 &amp; full bales available
            </p>
          </div>
        </div>
      </section>

      {/* Fullscreen HD Zoom Modal for Main Banner */}
      <AnimatePresence>
        {isBannerZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsBannerZoomOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative max-w-xl w-full" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setIsBannerZoomOpen(false)}
                className="absolute -top-10 right-0 text-white bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl">
                <img 
                  src="/shop_main_banner.jpg" 
                  alt="Sri Aadhi Nayaga Tex Wholesale Full HD Banner"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="text-center mt-3 text-white text-xs font-bold flex items-center justify-center gap-2">
                <span>Sri Aadhi Nayaga Tex • 53/A, Eswaran Kovil St, Erode</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories Section */}
      <section className="px-3 py-4">
        <CategoryGrid title="Wholesale Categories" />
      </section>

      {/* Featured Stock Section with exact same 3D floating animation as categories */}
      <section className="px-3 py-4 bg-white border-y border-emerald-100">
        <ProductGrid title="Featured Textiles" count={8} />
      </section>

      {/* Wholesale Bulk Orders Mobile Banner with 3D Depth */}
      <section className="p-3 my-3">
        <ThreeDCard depth={14} autoFloat={true}>
          <div className="rounded-2xl p-4 bg-gradient-to-br from-[#01221a] via-[#064E3B] to-[#047857] text-white shadow-2xl border-2 border-emerald-400/50 space-y-3 relative overflow-hidden preserve-3d">
            {/* Animated Laser / Shimmer Light Sweep */}
            <div className="animate-shimmer-card" />

            <div className="flex items-center justify-between">
              <div 
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400/30 to-emerald-400/30 text-amber-300 border border-amber-300/40 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm"
                style={{ transform: 'translateZ(20px)' }}
              >
                <Boxes size={11} className="text-amber-300 animate-bounce" /> 
                <span>Wholesale &amp; Reseller Orders</span>
              </div>

              <motion.span 
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="text-amber-400 text-sm select-none"
              >
                ★
              </motion.span>
            </div>

            <h3 
              className="text-base font-serif font-black leading-snug text-3d-white"
              style={{ transform: 'translateZ(15px)' }}
            >
              Looking for Wholesale Textile Bundles in Erode?
            </h3>

            <p className="text-xs text-emerald-100 font-light leading-relaxed">
              We supply retail textile shops, resellers &amp; online sellers across Tamil Nadu and All-India with daily bales of Sarees, Nighties, Lungis, Inskirts, and Churidars.
            </p>

            <div 
              className="space-y-1.5 text-[11px] text-emerald-100 bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-400/30"
              style={{ transform: 'translateZ(10px)' }}
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-300 shrink-0" />
                <span>Direct Handloom &amp; Mill Sourcing (Erode Looms)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-300 shrink-0" />
                <span>Daily Parcel &amp; Transport Dispatch (All-India)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-300 shrink-0" />
                <span>Video Call Selection &amp; Sample Bales Available</span>
              </div>
            </div>

            <div 
              className="grid grid-cols-2 gap-2 pt-1"
              style={{ transform: 'translateZ(25px)' }}
            >
              <motion.a
                href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex,%20I%20am%20a%20shop%20owner%20looking%20for%20wholesale%20bundles."
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.94 }}
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/50 border border-white/30"
              >
                <MessageCircle size={15} />
                <span>WhatsApp: 9655147000</span>
              </motion.a>

              <motion.a
                href="tel:9655148000"
                whileTap={{ scale: 0.94 }}
                className="bg-emerald-950 text-white border border-emerald-400/40 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <PhoneCall size={14} className="text-emerald-300 animate-pulse" />
                <span>Call: 9655148000</span>
              </motion.a>
            </div>
          </div>
        </ThreeDCard>
      </section>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
