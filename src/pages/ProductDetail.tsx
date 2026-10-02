import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Plus, 
  Minus, 
  Ruler, 
  Heart, 
  Share2, 
  ShoppingBag, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  RefreshCcw, 
  Scissors, 
  MessageCircle, 
  Sparkles,
  Percent,
  Layers,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { allProducts, Product } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import SizeGuideModal from '../components/SizeGuideModal';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useStore();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isWholesaleSet, setIsWholesaleSet] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'fabric' | 'styling' | 'shipping' | 'tailoring'>('fabric');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;

    const found = allProducts.find(p => p.id === id) || allProducts[0];
    if (found) {
      setProduct(found);
      setSelectedSize(found.sizes[0] || 'Free Size');
      setSelectedColor(found.colors[0] || 'Default');
      setQuantity(1);
    }
    setLoading(false);
  }, [id]);

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] text-gray-500 font-bold">
        Loading outfit details...
      </div>
    );
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
          text: `Check out this authentic textile item: ${product.name} at Sri Aadhi Nayaga Tex, Erode!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Dress link copied to clipboard!');
    }
  };

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 font-sans text-slate-900">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-rose-100 py-3 text-xs text-gray-500">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <Link to="/" className="hover:text-rose-700">Home</Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-rose-700">{product.category}</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate">{product.name}</span>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white border border-rose-100 rounded-3xl overflow-hidden relative aspect-[3/4] shadow-sm flex items-center justify-center">
              <img 
                src={images[activeImage] || product.image} 
                alt={product.name}
                className="w-full h-full object-cover object-top transition-all duration-300"
              />

              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase shadow">
                  {discountPct}% OFF
                </span>
                <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow border border-rose-100">
                  {product.fabric.split(' ')[0]}
                </span>
              </div>

              <button
                onClick={() => toggleWishlist({ id: product.id, name: product.name, price: product.price, category: product.category, imageUrl: product.image })}
                className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow text-gray-400 hover:text-red-500 transition-colors"
                title={isWish ? "Remove from Wishlist" : "Save to Wishlist"}
              >
                <Heart size={20} className={isWish ? "text-red-500 fill-red-500" : ""} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === idx ? 'border-rose-600 shadow-md' : 'border-gray-200 hover:border-gray-400 opacity-70'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Dress Specs & Purchase Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">
                <span>{product.brand} • {product.category}</span>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  In Stock &amp; Ready to Ship
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-black text-rose-950 leading-tight">
                {product.name}
              </h1>

              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                {product.description}
              </p>

              {/* Price Row */}
              <div className="mt-4 pt-3 border-t border-rose-100 flex items-baseline gap-3">
                <span className="text-3xl font-black text-rose-950">
                  ₹{effectiveUnitPrice.toLocaleString()}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.retailPrice.toLocaleString()}
                </span>
                <span className="bg-rose-100 text-rose-800 text-xs font-black px-2 py-0.5 rounded-full">
                  Save ₹{(product.retailPrice - effectiveUnitPrice).toLocaleString()}
                </span>
              </div>
              <div className="text-[11px] text-gray-400 mt-1">Inclusive of all taxes • Free shipping above ₹1,499</div>
            </div>

            {/* Wholesale Reseller Set Toggle */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-xs text-amber-950 flex items-center gap-1.5">
                  <Percent size={14} className="text-amber-700" />
                  Wholesale Boutique Set ({product.bundleQuantity} Pcs Assorted Colors)
                </div>
                <div className="text-[11px] text-amber-800 mt-0.5">
                  Get each piece at <b>₹{product.wholesalePrice.toLocaleString()}</b> instead of ₹{product.price.toLocaleString()}!
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsWholesaleSet(!isWholesaleSet);
                  if (!isWholesaleSet) setQuantity(product.bundleQuantity);
                  else setQuantity(1);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
                  isWholesaleSet 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-white text-amber-950 border border-amber-300 hover:bg-amber-100'
                }`}
              >
                {isWholesaleSet ? 'Wholesale Active' : 'Buy as Set'}
              </button>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Select Size: <span className="text-rose-700 font-black">{selectedSize}</span>
                </label>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs font-bold text-rose-700 hover:underline flex items-center gap-1"
                >
                  <Ruler size={13} /> Size Chart
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? 'border-rose-600 bg-rose-600 text-white shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-400 text-slate-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                Color Shade: <span className="text-rose-700 font-black">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      selectedColor === color
                        ? 'border-rose-600 bg-rose-50 text-rose-950 font-bold ring-1 ring-rose-600'
                        : 'border-gray-200 bg-white hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                Quantity {isWholesaleSet && `(Min. ${product.bundleQuantity} for wholesale set)`}
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-xl bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(isWholesaleSet ? product.bundleQuantity : 1, quantity - 1))}
                    className="p-2.5 text-gray-500 hover:text-black transition-colors"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-12 text-center text-sm font-black">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 text-gray-500 hover:text-black transition-colors"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <div className="text-xs text-gray-500">
                  Total Value: <b className="text-slate-900 font-black text-sm">₹{totalCost.toLocaleString()}</b>
                </div>
              </div>
            </div>

            {/* Action Buttons - Only WhatsApp & Call Orders */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/919655147000?text=${encodeURIComponent(
                  `Vanakkam Sri Aadhi Nayaga Tex! I want to order/enquire:
• Product: ${product.name} (Code: #${product.id})
• Category: ${product.category}
• Selected Size: ${selectedSize}
• Selected Color: ${selectedColor}
• Quantity: ${effectiveQuantity} ${isWholesaleSet ? 'pcs (Wholesale Bundle Set)' : 'pcs'}
• Total Value: ₹${totalCost.toLocaleString()}
Please send parcel dispatch details and available colors.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/25"
              >
                <MessageCircle size={20} />
                Order via WhatsApp (9655147000)
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:9655148000"
                  className="w-full bg-slate-900 hover:bg-black text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <PhoneCall size={16} className="text-amber-400" />
                  Call Enquiry: 9655148000
                </a>

                <a
                  href="tel:9655147000"
                  className="w-full bg-indigo-950 hover:bg-indigo-900 text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <PhoneCall size={16} className="text-green-400" />
                  Call Shop: 9655147000
                </a>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/919655148000?text=${encodeURIComponent(`Vanakkam Sri Aadhi Nayaga Tex! I want to enquire about ${product.name} (Qty: ${effectiveQuantity} pcs).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white hover:bg-green-50 text-green-700 border border-green-300 py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageCircle size={15} />
                  Secondary WhatsApp: 9655148000
                </a>

                <button
                  onClick={handleShare}
                  className="p-2.5 border border-gray-200 rounded-2xl hover:bg-gray-100 text-gray-600 transition-colors"
                  title="Share Item"
                >
                  <Share2 size={16} />
                </button>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5 mt-2">
                <Sparkles size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <b className="font-bold">Direct Wholesale &amp; Retail Booking:</b> No online payment gateway required. All orders and enquiries are handled directly by Sri Aadhi Nayaga Tex team via WhatsApp &amp; Phone with all-India parcel transport.
                </div>
              </div>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-4 border-t border-rose-100">
              <div className="bg-white p-3 rounded-2xl border border-rose-100">
                <ShieldCheck size={18} className="text-rose-600 mx-auto mb-1" />
                <div className="font-bold text-slate-900">Silk Mark Certified</div>
                <div className="text-[10px] text-gray-400">Pure Weave</div>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-rose-100">
                <Truck size={18} className="text-emerald-600 mx-auto mb-1" />
                <div className="font-bold text-slate-900">Express Delivery</div>
                <div className="text-[10px] text-gray-400">Pan-India Cargo</div>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-rose-100">
                <RefreshCcw size={18} className="text-amber-600 mx-auto mb-1" />
                <div className="font-bold text-slate-900">7-Day Exchange</div>
                <div className="text-[10px] text-gray-400">Easy Size Swap</div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed Specifications */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-sm">
          <div className="flex border-b border-rose-100 gap-8 text-xs sm:text-sm font-bold overflow-x-auto pb-3 mb-6">
            {[
              { id: 'fabric', label: 'Fabric & Embroidery Details' },
              { id: 'styling', label: 'Styling & Occasion Guide' },
              { id: 'shipping', label: 'Shipping & Size Exchange' },
              { id: 'tailoring', label: 'Custom Tailoring & Blouse Stitching' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'border-b-2 border-rose-600 text-rose-950 font-black' 
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'fabric' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-700">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-rose-50">
                  <span className="text-gray-400">Fabric Composition:</span>
                  <span className="font-bold text-slate-900">{product.fabric}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-rose-50">
                  <span className="text-gray-400">Weave / Craft:</span>
                  <span className="font-bold text-slate-900">Traditional Handloom &amp; Zari Artistry</span>
                </div>
                <div className="flex justify-between py-2 border-b border-rose-50">
                  <span className="text-gray-400">Wash &amp; Care:</span>
                  <span className="font-bold text-rose-700">{product.washCare}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-rose-50">
                  <span className="text-gray-400">Suitable Occasion:</span>
                  <span className="font-bold text-slate-900">{product.occasion}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-rose-50">
                  <span className="text-gray-400">Package Contents:</span>
                  <span className="font-bold text-slate-900">Original Garment with Quality Brand Seal</span>
                </div>
                <div className="flex justify-between py-2 border-b border-rose-50">
                  <span className="text-gray-400">Authenticity:</span>
                  <span className="font-bold text-emerald-700">100% Guaranteed Genuine Fabric</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'styling' && (
            <div className="text-xs text-gray-600 space-y-3 leading-relaxed">
              <p>
                <b>Stylist Note:</b> Pair this {product.name} with traditional temple jewelry or antique gold jhumkas. For footwear, embroidered juttis or metallic block heels complement the rich flare.
              </p>
              <p>
                <b>Recommended Occasions:</b> {product.occasion}.
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="text-xs text-gray-600 space-y-3 leading-relaxed">
              <p>
                <b>Dispatch Timeline:</b> Ships within 24 hours of order confirmation. Delivery in 2-4 business days across India.
              </p>
              <p>
                <b>7-Day Size Exchange:</b> If the size doesn't fit like a dream, our courier will pick it up from your doorstep and deliver the replacement size free of charge.
              </p>
            </div>
          )}

          {activeTab === 'tailoring' && (
            <div className="text-xs text-gray-600 space-y-3 leading-relaxed">
              <p>
                <b>Custom Blouse &amp; Fall-Pico Services:</b> For sarees and churidars, we offer customized tailoring and stitching support. WhatsApp our Erode shop at <span className="font-bold text-slate-900">9655147000 / 9655148000</span> with your measurements.
              </p>
            </div>
          )}
        </div>

        {/* Similar Outfits */}
        <div className="mt-16">
          <ProductGrid title="You May Also Love" count={4} />
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
