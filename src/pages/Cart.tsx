import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  ShoppingBag, 
  CheckCircle2, 
  Gift, 
  Sparkles,
  Percent,
  MessageCircle,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateCartQuantity, removeFromCart, clearCart } = useStore();
  
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setDiscountApplied(true);
    }
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const discount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const giftWrapCost = giftWrap ? 99 : 0;
  const shipping = subtotal > 1499 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal - discount + giftWrapCost + shipping;

  const whatsappOrderText = `Vanakkam Sri Aadhi Nayaga Tex! I want to order/enquire for the following wholesale items:
${cartItems.map((item, idx) => `${idx + 1}. ${item.name} (${item.variant}) - Qty: ${item.quantity} x ₹${item.price} = ₹${item.quantity * item.price}`).join('\n')}

Estimated Total: ₹${grandTotal.toLocaleString()}
Please send parcel dispatch details and confirm availability.`;

  const whatsappCartUrl = `https://wa.me/919655147000?text=${encodeURIComponent(whatsappOrderText)}`;

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24 font-sans text-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 text-white py-10 border-b border-rose-900">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                My Wardrobe Bag
              </span>
              <h1 className="text-3xl font-serif font-black mt-2 tracking-tight">
                Shopping Bag ({totalQuantity} Items)
              </h1>
              <p className="text-xs text-rose-200 mt-1">
                {subtotal > 1499 ? '🎉 You have unlocked Free Express Shipping!' : 'Add ₹' + (1499 - subtotal) + ' more for Free Shipping!'}
              </p>
            </div>

            <Link
              to="/categories"
              className="self-start sm:self-auto flex items-center gap-1.5 text-xs text-rose-200 hover:text-white font-bold"
            >
              <ArrowLeft size={14} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-8">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-rose-100 shadow-sm max-w-lg mx-auto my-12">
            <ShoppingBag className="h-16 w-16 text-rose-200 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold text-slate-900">Your Shopping Bag is Empty</h3>
            <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto mb-6">
              Explore our handcrafted sarees, designer kurtis, and royal lehengas to find your perfect festive look.
            </p>
            <button
              onClick={() => navigate('/categories')}
              className="bg-rose-950 hover:bg-rose-900 text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              Browse Dress Collections
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Bag Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-3xl p-5 border border-rose-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:border-rose-200 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-24 bg-rose-50 rounded-2xl overflow-hidden shrink-0">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{item.category}</span>
                      <h4 className="font-bold text-sm text-slate-900 mt-0.5 line-clamp-1 max-w-md">
                        {item.name}
                      </h4>
                      <div className="text-xs text-rose-700 font-bold mt-1">
                        Size &amp; Style: <span className="text-slate-700 font-normal">{item.variant}</span>
                      </div>
                      <div className="text-sm font-black text-rose-950 mt-1">
                        ₹{item.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-200 rounded-full bg-rose-50/50 p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="p-1.5 text-gray-500 hover:text-black rounded-full hover:bg-white transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="p-1.5 text-gray-500 hover:text-black rounded-full hover:bg-white transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-black text-rose-950">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-500 p-1.5 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-2">
                <Link to="/categories" className="text-xs font-bold text-rose-700 hover:underline flex items-center gap-1">
                  <ArrowLeft size={14} /> Add More Outfits
                </Link>
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-gray-400 hover:text-red-600 transition-colors"
                >
                  Empty Bag
                </button>
              </div>

              {/* Gift Packaging Checkbox */}
              <div className="bg-white rounded-3xl p-5 border border-rose-100 flex items-center justify-between mt-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-50 text-amber-700 rounded-2xl">
                    <Gift size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Add Luxury Festive Gift Wrapping (+₹99)</div>
                    <div className="text-[11px] text-gray-500">Includes handcrafted satin ribbon box &amp; personalized greeting card</div>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-5 h-5 accent-rose-600 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Bag Order Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm space-y-5">
                <h3 className="font-serif font-black text-rose-950 text-base uppercase tracking-wider pb-3 border-b border-rose-50">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Bag Subtotal ({totalQuantity} items):</span>
                    <span className="font-bold text-slate-900">₹{subtotal.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-rose-600 font-bold">
                      <span>Festive Coupon (10%):</span>
                      <span>- ₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  {giftWrap && (
                    <div className="flex justify-between text-gray-600">
                      <span>Luxury Gift Wrap:</span>
                      <span className="font-bold text-slate-900">₹99</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Charges:</span>
                    <span className="font-bold text-emerald-700">
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-rose-100 flex justify-between items-baseline">
                    <span className="font-black text-slate-900 text-sm">Estimated Total:</span>
                    <span className="font-serif font-black text-2xl text-rose-950">
                      ₹{grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="pt-2 border-t border-rose-50">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Have a Festive Promo Code? (Use FASHION10)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. FASHION10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-rose-50/50 border border-rose-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500 uppercase"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="bg-rose-950 hover:bg-black text-white px-4 py-2 rounded-full text-xs font-bold uppercase transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* WhatsApp & Call Order Actions */}
                <a
                  href={whatsappCartUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-green-600/25 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Send Order via WhatsApp (9655147000)
                </a>

                <a
                  href="tel:9655148000"
                  className="w-full bg-slate-900 hover:bg-black text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <PhoneCall size={16} className="text-amber-400" />
                  Call Shop: 9655148000 / 9655147000
                </a>

                <div className="text-[11px] text-center text-gray-500 space-y-1 pt-1">
                  <div>💬 Direct WhatsApp &amp; Phone Enquiries Only (No Online Payment)</div>
                  <div>📦 Wholesale Baler &amp; Parcel Transport across India</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
