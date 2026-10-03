import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Minus, 
  Ruler, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RefreshCcw, 
  MessageCircle, 
  Sparkles,
  Percent,
  PhoneCall,
  ArrowLeft
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { allProducts, Product } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import SizeGuideModal from '../components/SizeGuideModal';
import { PageLoadingSpinner } from '../components/LoadingAnimation';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useStore();
  
  const initialProduct = allProducts.find(p => p.id === id) || allProducts[0];
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(initialProduct?.sizes?.[0] || 'Free Size');
  const [selectedColor, setSelectedColor] = useState<string>(initialProduct?.colors?.[0] || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [isWholesaleSet, setIsWholesaleSet] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'fabric' | 'styling' | 'shipping' | 'tailoring'>('fabric');

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    if (!id) return;

    const found = allProducts.find(p => p.id === id) || allProducts[0];
    if (found) {
      setProduct(found);
      setSelectedSize(found.sizes[0] || 'Free Size');
      setSelectedColor(found.colors[0] || 'Default');
      setQuantity(1);
    }
  }, [id]);

  if (!product) {
    return <PageLoadingSpinner message="Loading Textile Specifications & Stock..." />;
  }

  const effectiveUnitPrice = isWholesaleSet ? product.wholesalePrice : product.price;
  const effectiveQuantity = isWholesaleSet ? Math.max(product.bundleQuantity, quantity) : quantity;
  const totalCost = effectiveUnitPrice * effectiveQuantity;
  const discountPct = Math.round(((product.retailPrice - product.price) / product.retailPrice) * 100);
  const isWish = isInWishlist(product.id);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} at Sri Aadhi Nayaga Tex Erode!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Product link copied!');
    }
  };

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="bg-[#F7FCF9] min-h-screen pb-6 font-sans text-slate-900">
      {/* Top Mobile Bar with Back button */}
      <div className="bg-white border-b border-emerald-100 px-3 py-2 flex items-center justify-between text-xs sticky top-14 z-30">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-1 text-slate-700 hover:text-emerald-700 font-bold"
        >
          <ArrowLeft size={16} /> <span>Back</span>
        </button>
        <span className="text-[11px] font-black text-emerald-800 uppercase tracking-wider truncate max-w-[200px]">
          {product.category}
        </span>
        <button onClick={handleShare} className="p-1 text-slate-500 hover:text-emerald-700">
          <Share2 size={16} />
        </button>
      </div>

      <div className="p-3 space-y-4">
        {/* Main Image Display */}
        <div className="bg-white border border-emerald-100 rounded-2xl overflow-hidden relative aspect-[4/5] shadow-xs flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img 
              key={activeImage}
              initial={{ opacity: 0.6, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.6 }}
              transition={{ duration: 0.25 }}
              src={images[activeImage] || product.image} 
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
          </AnimatePresence>

          {/* Continuous Fabric Sheen */}
          <div className="animate-shimmer-card opacity-30" />

          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            <span className="bg-gradient-to-r from-emerald-800 to-green-700 text-amber-300 text-[9px] font-black px-2 py-0.5 rounded-full uppercase shadow-xs border border-emerald-600/40">
              ஈரோடு மொத்த விற்பனை
            </span>
            <span className="bg-white/95 text-emerald-950 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs border border-emerald-100">
              {product.fabric.split(' ')[0]}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={() => toggleWishlist({
              id: product.id,
              name: product.name,
              price: product.price,
              category: product.category,
              imageUrl: product.image
            })}
            className="absolute top-2.5 right-2.5 p-2 bg-white/90 backdrop-blur-xs rounded-full shadow-xs text-slate-600 active:scale-90 transition-transform z-10"
          >
            <Heart size={18} className={isWish ? "text-rose-500 fill-rose-500" : ""} />
          </motion.button>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-14 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  activeImage === idx ? 'border-emerald-600 shadow-xs' : 'border-gray-200 opacity-60'
                }`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover object-top" />
              </button>
            ))}
          </div>
        )}

        {/* Details Card */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            <span>{product.brand}</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              In Stock
            </span>
          </div>

          <h1 className="text-base font-serif font-black text-slate-900 leading-snug">
            {product.name}
          </h1>

          <p className="text-xs text-gray-600 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Wholesale Pricing Status - No Price Display */}
          <div className="pt-3 border-t border-emerald-100 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span className="bg-emerald-800 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs border border-emerald-600">
                நேரடி மொத்த விலை (Direct Wholesale Rate)
              </span>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 p-3 rounded-2xl border border-emerald-200">
              <div className="text-sm font-black text-emerald-950 flex items-center gap-1.5">
                <span>விலை விபரம் அறிய WhatsApp செய்யவும்</span>
              </div>
              <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                ஈரோடு நேரடி நெசவாளர் மொத்த விலை. WhatsApp மூலம் தொடர்பு கொள்ளவும்.
              </p>
            </div>
          </div>

          {/* Wholesale Reseller Set Toggle */}
          <div className={`p-3.5 rounded-2xl border transition-all ${
            isWholesaleSet 
              ? 'bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border-emerald-400 shadow-sm' 
              : 'bg-emerald-50/50 border-emerald-200'
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-black text-xs text-emerald-950 flex items-center gap-1.5">
                  <Percent size={14} className="text-emerald-700" />
                  Wholesale Lot ({product.bundleQuantity} Pieces Bundle)
                </div>
                <div className="text-[11px] text-emerald-900 mt-1 font-semibold">
                  MOQ: <b>Pack of {product.bundleQuantity} Pieces</b>
                </div>
                <div className="text-[10px] text-emerald-700 font-bold mt-0.5">
                  சிறப்பு மொத்த விலை சலுகை • Bulk Bale Discount on WhatsApp
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsWholesaleSet(!isWholesaleSet);
                  if (!isWholesaleSet) setQuantity(product.bundleQuantity);
                  else setQuantity(1);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-xs shrink-0 ${
                  isWholesaleSet 
                    ? 'bg-emerald-700 text-white shadow-emerald-700/30' 
                    : 'bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                {isWholesaleSet ? 'Lot Active' : 'Select Lot'}
              </button>
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
                Size: <span className="text-emerald-700 font-black">{selectedSize}</span>
              </label>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[10px] font-bold text-emerald-700 flex items-center gap-1"
              >
                <Ruler size={11} /> Chart
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    selectedSize === size
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                      : 'border-emerald-100 bg-white text-slate-800'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Options */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-800 mb-1.5">
              Color: <span className="text-emerald-700 font-black">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                    selectedColor === color
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600'
                      : 'border-gray-200 bg-white text-gray-700'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-800 mb-1.5">
              Quantity {isWholesaleSet && `(Min. ${product.bundleQuantity} for wholesale)`}
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-emerald-300 rounded-xl bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(isWholesaleSet ? product.bundleQuantity : 1, quantity - 1))}
                  className="p-2 text-gray-600 hover:text-black active:scale-90 transition-transform"
                >
                  <Minus size={15} />
                </button>
                <span className="w-10 text-center text-xs font-black text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-gray-600 hover:text-black active:scale-90 transition-transform"
                >
                  <Plus size={15} />
                </button>
              </div>

              <div className="ml-auto bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-300 px-3 py-1.5 rounded-xl text-right shadow-2xs">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">மொத்த அளவு (Selected)</div>
                <div className="text-sm text-emerald-800 font-black leading-tight">{effectiveQuantity} Pieces</div>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp & Call Action Buttons */}
          <div className="space-y-2 pt-2">
            <motion.a
              whileTap={{ scale: 0.94 }}
              animate={{ scale: [1, 1.015, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              href={`https://wa.me/919655147000?text=${encodeURIComponent(
                `Vanakkam Sri Aadhi Nayaga Tex! I want to enquire wholesale price & order:
• Product: ${product.name} (Code: #${product.id})
• Category: ${product.category}
• Size: ${selectedSize}
• Color: ${selectedColor}
• Quantity: ${effectiveQuantity} ${isWholesaleSet ? 'pcs (Wholesale Bundle Lot)' : 'pcs'}
Please send wholesale rates, available colors and parcel dispatch details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-[#25D366] via-[#20ba5a] to-[#1bb052] hover:opacity-95 text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
            >
              <MessageCircle size={18} />
              <span>WhatsApp-ல் விலை அறியவும் / Order (9655147000)</span>
            </motion.a>

            <div className="grid grid-cols-2 gap-2">
              <motion.a
                whileTap={{ scale: 0.94 }}
                href="tel:9655148000"
                className="w-full bg-slate-900 hover:bg-black text-white py-2.5 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-1.5 shadow-sm"
              >
                <PhoneCall size={14} className="text-emerald-400" />
                <span>9655148000</span>
              </motion.a>

              <motion.a
                whileTap={{ scale: 0.94 }}
                href="tel:9655147000"
                className="w-full bg-emerald-950 text-white py-2.5 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-1.5 shadow-sm"
              >
                <PhoneCall size={14} className="text-emerald-300" />
                <span>9655147000</span>
              </motion.a>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5 text-[11px] text-emerald-900 flex items-start gap-2">
            <Sparkles size={14} className="text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <b>Direct Erode Booking:</b> All orders handled directly via WhatsApp with daily all-India parcel transport.
            </div>
          </div>
        </div>

        {/* Quick Guarantees Strip */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
            <ShieldCheck size={16} className="text-emerald-600 mx-auto mb-1" />
            <div className="font-bold text-[10px] text-slate-900">Direct Weave</div>
            <div className="text-[9px] text-gray-400">Pure Quality</div>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
            <Truck size={16} className="text-emerald-600 mx-auto mb-1" />
            <div className="font-bold text-[10px] text-slate-900">All-India</div>
            <div className="text-[9px] text-gray-400">Daily Parcel</div>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
            <RefreshCcw size={16} className="text-emerald-600 mx-auto mb-1" />
            <div className="font-bold text-[10px] text-slate-900">Size Swap</div>
            <div className="text-[9px] text-gray-400">Support</div>
          </div>
        </div>

        {/* Tabbed Specifications */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs">
          <div className="flex border-b border-emerald-100 gap-4 text-xs font-bold overflow-x-auto no-scrollbar pb-2 mb-3">
            {[
              { id: 'fabric', label: 'Fabric & Craft' },
              { id: 'shipping', label: 'Parcel Transport' },
              { id: 'tailoring', label: 'Custom Stitching' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-1 transition-colors whitespace-nowrap text-[11px] ${
                  activeTab === tab.id 
                    ? 'border-b-2 border-emerald-600 text-emerald-800 font-black' 
                    : 'text-gray-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'fabric' && (
            <div className="space-y-2 text-[11px] text-gray-700">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Fabric Composition:</span>
                <span className="font-bold text-slate-900">{product.fabric}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Wash &amp; Care:</span>
                <span className="font-bold text-emerald-700">{product.washCare}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Occasion:</span>
                <span className="font-bold text-slate-900">{product.occasion}</span>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="text-[11px] text-gray-600 space-y-2 leading-relaxed">
              <p>
                <b>Daily Transport Dispatch:</b> Bales and parcels dispatched daily via all major private transport services and postal courier across Tamil Nadu and All-India.
              </p>
            </div>
          )}

          {activeTab === 'tailoring' && (
            <div className="text-[11px] text-gray-600 space-y-2 leading-relaxed">
              <p>
                <b>Custom Blouse &amp; Fall-Pico:</b> WhatsApp our shop at <span className="font-bold text-slate-900">9655147000</span> for customized stitching details.
              </p>
            </div>
          )}
        </div>

        {/* Similar Outfits */}
        <div className="pt-2">
          <ProductGrid title="Similar Stock" count={4} />
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
