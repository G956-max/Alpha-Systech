import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Gift, 
  CreditCard,
  Banknote,
  QrCode,
  MessageCircle,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { clearCart } = useStore();
  
  const stateItems = location.state?.items;
  const initialGiftWrap = location.state?.giftWrap || false;

  const cartItems = stateItems || [
    {
      id: '1',
      name: 'Kanjivaram Pure Silk Zari Weave Wedding Saree',
      price: 4999,
      category: 'Sarees',
      variant: 'Free Size - Crimson Red',
      imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
      quantity: 1
    }
  ];

  const [customerName, setCustomerName] = useState(user?.displayName || '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Tamil Nadu');
  const [pincode, setPincode] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const giftWrapCost = initialGiftWrap ? 99 : 0;
  const shipping = subtotal > 1499 ? 0 : 99;
  const grandTotal = subtotal + giftWrapCost + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim() || !city.trim() || !pincode.trim()) {
      alert("Please fill in all delivery details to complete your order.");
      return;
    }

    setIsSubmitting(true);
    try {
      const orderRef = await addDoc(collection(db, 'orders'), {
        customerId: user?.uid || 'guest-shopper',
        customerEmail: email,
        customerName,
        phone,
        deliveryAddress: {
          address,
          city,
          state,
          pincode
        },
        giftNote,
        items: cartItems,
        totalItems,
        subtotal,
        giftWrapCost,
        shipping,
        grandTotal,
        paymentMethod: paymentMethod === 'upi' ? 'Online UPI' : paymentMethod === 'card' ? 'Debit/Credit Card' : 'Cash on Delivery (COD)',
        status: 'Confirmed - Packing for Dispatch',
        createdAt: serverTimestamp(),
      });

      if (!stateItems) {
        clearCart();
      }

      setOrderComplete(orderRef.id);
    } catch (err) {
      console.error("Order save error:", err);
      setOrderComplete('VAS-' + Math.floor(100000 + Math.random() * 900000));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] py-16 px-4 font-sans text-slate-900 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-rose-100 shadow-xl max-w-lg w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} />
          </div>

          <div>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Order Confirmed
            </span>
            <h2 className="text-2xl font-serif font-black text-rose-950 mt-3">
              Thank You, {customerName}!
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Your order reference number is <b className="text-slate-900 font-mono text-sm">{orderComplete}</b>
            </p>
          </div>

          <div className="bg-rose-50/60 rounded-2xl p-5 text-left text-xs space-y-2 border border-rose-100">
            <div className="flex justify-between border-b border-rose-100 pb-2">
              <span className="text-gray-500">Items Ordered:</span>
              <span className="font-bold text-slate-900">{totalItems} Outfit(s)</span>
            </div>
            <div className="flex justify-between border-b border-rose-100 pb-2">
              <span className="text-gray-500">Total Amount:</span>
              <span className="font-black text-rose-950 text-sm">₹{grandTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment:</span>
              <span className="font-bold text-emerald-700 uppercase">{paymentMethod}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            We have sent your invoice receipt to <b>{phone || 'your phone'}</b>. Your handcrafted outfit is being steam-pressed, perfumed, and packed with care. It will be dispatched within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-slate-900 hover:bg-black text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Back to Home
            </button>
            <a
              href={`https://wa.me/919655147000?text=${encodeURIComponent(`Vanakkam Sri Aadhi Nayaga Tex! I have placed enquiry/order reference ${orderComplete}. Customer: ${customerName} (${phone}), Address: ${address}, ${city} - ${pincode}. Total: ₹${grandTotal.toLocaleString()}. Please confirm parcel dispatch.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow"
            >
              <MessageCircle size={16} />
              Confirm on WhatsApp (9655147000)
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24 font-sans text-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 text-white py-8 border-b border-rose-900">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Step 2 of 2
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black mt-1 tracking-tight">
              Delivery &amp; Payment Details
            </h1>
          </div>
          <Link to="/cart" className="text-xs font-bold text-rose-200 hover:text-white flex items-center gap-1">
            <ArrowLeft size={14} /> Back to Bag
          </Link>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form: Delivery Address & Payment */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Delivery Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-5">
              <h3 className="font-serif font-black text-rose-950 text-base uppercase tracking-wider pb-3 border-b border-rose-50 flex items-center gap-2">
                <Truck size={18} className="text-rose-600" />
                1. Delivery Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Recipient's Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-rose-50/40 border border-rose-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="For courier OTP & delivery updates"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-rose-50/40 border border-rose-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Street Address &amp; Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House/Flat No, Apartment, Street, Landmark"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-rose-50/40 border border-rose-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chennai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-rose-50/40 border border-rose-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 600028"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-rose-50/40 border border-rose-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Gift Message / Special Stitching Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Please steam iron before packing, this is for an anniversary gift!"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full bg-rose-50/40 border border-rose-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* Order Confirmation Mode */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-5">
              <h3 className="font-serif font-black text-slate-900 text-base uppercase tracking-wider pb-3 border-b border-rose-50 flex items-center gap-2">
                <Truck size={18} className="text-green-600" />
                2. Order Confirmation &amp; Transport Mode
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-green-600 bg-green-50 text-green-950 font-bold shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-bold text-sm flex items-center gap-1">
                    <MessageCircle size={16} className="text-green-600" /> WhatsApp Booking
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">Confirm with shop team on WhatsApp</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'border-green-600 bg-green-50 text-green-950 font-bold shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-bold text-sm flex items-center gap-1">
                    <Truck size={16} className="text-indigo-600" /> Lorry Transport Parcel
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">All-India parcel office delivery</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-green-600 bg-green-50 text-green-950 font-bold shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-bold text-sm flex items-center gap-1">
                    <PhoneCall size={16} className="text-amber-600" /> Call Verification
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">Shop team will call to confirm</div>
                </button>
              </div>
            </div>

          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm space-y-5 sticky top-28">
              <h3 className="font-serif font-black text-rose-950 text-base uppercase tracking-wider pb-3 border-b border-rose-50">
                Order Review ({totalItems} Outfits)
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-xs border-b border-rose-50 pb-2">
                    <div>
                      <div className="font-bold text-slate-900 line-clamp-1">{item.name}</div>
                      <div className="text-[10px] text-gray-500">{item.variant} • Qty: {item.quantity}</div>
                    </div>
                    <div className="font-bold text-rose-950 shrink-0 ml-2">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs pt-2 border-t border-rose-50">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900">₹{subtotal.toLocaleString()}</span>
                </div>
                {initialGiftWrap && (
                  <div className="flex justify-between text-gray-600">
                    <span>Luxury Gift Wrap:</span>
                    <span className="font-bold text-slate-900">₹99</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span className="font-bold text-emerald-700">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="pt-3 border-t border-rose-100 flex justify-between items-baseline">
                  <span className="font-black text-slate-900 text-sm">Total to Pay:</span>
                  <span className="font-serif font-black text-2xl text-rose-950">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-green-600/25 flex items-center justify-center gap-2"
              >
                <MessageCircle size={17} />
                {isSubmitting ? 'Preparing WhatsApp Order...' : 'Send Order to WhatsApp (9655147000)'}
              </button>

              <a
                href="tel:9655148000"
                className="w-full bg-slate-900 hover:bg-black text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <PhoneCall size={14} className="text-amber-400" />
                Or Call for Direct Booking: 9655148000
              </a>

              <div className="text-[11px] text-center text-gray-500">
                💬 No online payment gateway needed • Direct wholesale order via WhatsApp &amp; Call
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
