import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  ChevronRight, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ArrowLeft,
  Info,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CartItem {
  id: string;
  name: string;
  price: number;
  category: string;
  variant: string;
  imageUrl: string;
  quantity: number;
}

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { clearCart } = useStore();
  
  // Use products from location.state if available (passed from Buy Now or Cart)
  const stateItems = location.state?.items;
  
  // Mock cart data (fallback if not in state)
  const [cartItems] = useState<CartItem[]>(stateItems || [
    {
      id: '1',
      name: 'MacBook Pro M3 Max',
      price: 289900,
      category: 'Apple',
      variant: '14-inch, Space Black',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
      quantity: 1
    }
  ]);

  const [paymentMethod] = useState<'Online'>('Online');
  const [selectedUpi, setSelectedUpi] = useState<'gpay' | 'phonepe' | 'paytm' | null>(null);
  const [upiId, setUpiId] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = 0;
  const taxes = subtotal * 0.08;
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shippingCost + taxes - discount;

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === 'ARTISAN10') {
      setDiscountApplied(true);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to complete your order.");
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        customerId: user.uid,
        customerEmail: user.email,
        customerName: user.displayName || user.email?.split('@')[0],
        items: cartItems,
        subtotal,
        shippingCost,
        taxes,
        discount,
        total,
        status: 'Processing',
        paymentMethod: selectedUpi ? `UPI (${selectedUpi.toUpperCase()})` : 'Card',
        upiDetails: selectedUpi ? upiId : null,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'orders'), orderData);
      
      // If items came from cart (not just Buy Now), clear cart
      if (!stateItems) {
        clearCart();
      }
      
      alert('Order placed successfully!');
      navigate('/profile'); // Redirect to profile to see the order
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'orders');
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2C2C] font-sans">
      <div className="w-full flex flex-col-reverse lg:flex-row min-h-screen">
        
        {/* LEFT SIDE: Checkout Form */}
        <div className="flex-grow lg:w-3/5 p-6 sm:p-10 lg:p-16 lg:border-r border-gray-200">
          <div className="max-w-xl ml-auto">
            {/* Header / Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-10 uppercase tracking-widest">
              <Link to="/cart" className="hover:text-[#2C2C2C] transition-colors">Cart</Link>
              <ChevronRight size={12} />
              <span className="text-[#2C2C2C]">Information</span>
              <ChevronRight size={12} />
              <span>Payment</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Contact Section */}
              <section className="space-y-6">
                <div className="flex justify-between items-end">
                  <h2 className="text-xl font-serif font-bold">Contact</h2>
                  <Link to="/login" className="text-xs font-bold underline underline-offset-4 hover:text-gray-500 transition-colors">Log in</Link>
                </div>
                <div className="space-y-4">
                  <div className="relative group">
                    <input 
                      type="email" 
                      required
                      placeholder="Email"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#2C2C2C] transition-all"
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border border-gray-200 rounded-md checked:bg-[#2C2C2C] checked:border-[#2C2C2C] transition-all" />
                      <div className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-[#2C2C2C] transition-colors">Email me with news and offers</span>
                  </label>
                </div>
              </section>

              {/* Delivery Section */}
              <section className="space-y-6">
                <h2 className="text-xl font-serif font-bold">Delivery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 relative">
                    <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm appearance-none focus:outline-none focus:border-[#2C2C2C] transition-all">
                      <option>India</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  <input type="text" required placeholder="First name" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#2C2C2C] transition-all" />
                  <input type="text" required placeholder="Last name" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#2C2C2C] transition-all" />
                  <input type="text" required placeholder="Address" className="sm:col-span-2 w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#2C2C2C] transition-all" />
                  <input type="text" placeholder="Apartment, suite, etc. (optional)" className="sm:col-span-2 w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#2C2C2C] transition-all" />
                  <input type="text" required placeholder="City" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#2C2C2C] transition-all" />
                  <div className="relative">
                    <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm appearance-none focus:outline-none focus:border-[#2C2C2C] transition-all">
                      <option>State</option>
                      <option>Andhra Pradesh</option>
                      <option>Arunachal Pradesh</option>
                      <option>Assam</option>
                      <option>Bihar</option>
                      <option>Chhattisgarh</option>
                      <option>Goa</option>
                      <option>Gujarat</option>
                      <option>Haryana</option>
                      <option>Himachal Pradesh</option>
                      <option>Jharkhand</option>
                      <option>Karnataka</option>
                      <option>Kerala</option>
                      <option>Madhya Pradesh</option>
                      <option>Maharashtra</option>
                      <option>Manipur</option>
                      <option>Meghalaya</option>
                      <option>Mizoram</option>
                      <option>Nagaland</option>
                      <option>Odisha</option>
                      <option>Punjab</option>
                      <option>Rajasthan</option>
                      <option>Sikkim</option>
                      <option>Tamil Nadu</option>
                      <option>Telangana</option>
                      <option>Tripura</option>
                      <option>Uttar Pradesh</option>
                      <option>Uttarakhand</option>
                      <option>West Bengal</option>
                      <option>Andaman and Nicobar Islands</option>
                      <option>Chandigarh</option>
                      <option>Delhi</option>
                      <option>Jammu and Kashmir</option>
                      <option>Ladakh</option>
                      <option>Lakshadweep</option>
                      <option>Puducherry</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  <input type="text" required placeholder="ZIP code" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#2C2C2C] transition-all" />
                  
                  <div className="sm:col-span-2 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input type="checkbox" className="peer appearance-none w-5 h-5 border border-gray-200 rounded-md checked:bg-[#2C2C2C] checked:border-[#2C2C2C] transition-all" />
                        <div className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-[#2C2C2C] transition-colors">Save this information for next time</span>
                    </label>
                  </div>
                </div>
              </section>

              {/* Payment Section */}
              <section className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-serif font-bold">Payment</h2>
                  <p className="text-xs text-gray-500">All transactions are secure and encrypted.</p>
                </div>
                
                <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                  <div className="p-5 space-y-6 bg-[#FAF9F6]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-4 border-[#2C2C2C] rounded-full transition-all"></div>
                        <span className="text-sm font-bold">Online Payment (UPI, Card, Wallets)</span>
                      </div>
                      <div className="flex gap-2">
                        {/* Mock Payment Logos */}
                        <div className="px-2 py-0.5 bg-white border border-gray-100 rounded text-[10px] font-bold text-blue-600">GPay</div>
                        <div className="px-2 py-0.5 bg-white border border-gray-100 rounded text-[10px] font-bold text-purple-600">PhonePe</div>
                        <div className="px-2 py-0.5 bg-white border border-gray-100 rounded text-[10px] font-bold text-sky-500">Paytm</div>
                      </div>
                    </div>

                    {/* UPI Options */}
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pay via UPI</p>
                      <div className="grid grid-cols-3 gap-3">
                        <button 
                          type="button" 
                          onClick={() => setSelectedUpi('gpay')}
                          className={`flex flex-col items-center justify-center gap-2 p-4 bg-white border rounded-2xl transition-all group ${selectedUpi === 'gpay' ? 'border-[#2C2C2C] bg-blue-50/30' : 'border-gray-200 hover:border-[#2C2C2C]'}`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${selectedUpi === 'gpay' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'}`}>G</div>
                          <span className="text-[10px] font-bold">Google Pay</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setSelectedUpi('phonepe')}
                          className={`flex flex-col items-center justify-center gap-2 p-4 bg-white border rounded-2xl transition-all group ${selectedUpi === 'phonepe' ? 'border-[#2C2C2C] bg-purple-50/30' : 'border-gray-200 hover:border-[#2C2C2C]'}`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${selectedUpi === 'phonepe' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'}`}>P</div>
                          <span className="text-[10px] font-bold">PhonePe</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setSelectedUpi('paytm')}
                          className={`flex flex-col items-center justify-center gap-2 p-4 bg-white border rounded-2xl transition-all group ${selectedUpi === 'paytm' ? 'border-[#2C2C2C] bg-sky-50/30' : 'border-gray-200 hover:border-[#2C2C2C]'}`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${selectedUpi === 'paytm' ? 'bg-sky-600 text-white' : 'bg-sky-50 text-sky-600 group-hover:bg-sky-100'}`}>Py</div>
                          <span className="text-[10px] font-bold">Paytm</span>
                        </button>
                      </div>

                      {selectedUpi && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-3">
                          <div className="relative">
                            <input 
                              type="text" 
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder={`Enter ${selectedUpi.toUpperCase()} Number or UPI ID`}
                              className="w-full bg-white border border-[#2C2C2C] rounded-xl px-4 py-4 text-sm focus:outline-none transition-all"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                              <span className="text-[10px] font-bold text-[#2C2C2C] uppercase tracking-widest px-2 py-1 bg-[#FAF9F6] rounded-md border border-gray-100">
                                Verify
                              </span>
                            </div>
                          </div>
                          <p className="text-[10px] text-gray-400 font-medium italic px-1">
                            A payment request will be sent to your {selectedUpi.toUpperCase()} app.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="relative py-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-[#FAF9F6] px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or pay with card</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="col-span-2 relative">
                        <input type="text" placeholder="Card number" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#2C2C2C] transition-all" />
                        <ShieldCheck size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      <input type="text" placeholder="Expiration date (MM / YY)" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#2C2C2C] transition-all" />
                      <div className="relative">
                        <input type="text" placeholder="Security code" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#2C2C2C] transition-all" />
                        <Info size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      <input type="text" placeholder="Name on card" className="col-span-2 w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#2C2C2C] transition-all" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Action Buttons */}
              <div className="pt-8 space-y-6">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2C2C2C] text-white py-5 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-black/10 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Pay Now'}
                </button>
                <div className="text-center">
                  <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#2C2C2C] transition-colors">
                    <ArrowLeft size={16} />
                    Return to cart
                  </Link>
                </div>
              </div>
            </form>

            {/* Footer Links */}
            <div className="pt-20 pb-10 flex flex-wrap gap-6 border-t border-gray-200 mt-20">
              <Link to="#" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#2C2C2C]">Refund policy</Link>
              <Link to="#" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#2C2C2C]">Shipping policy</Link>
              <Link to="#" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#2C2C2C]">Privacy policy</Link>
              <Link to="#" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#2C2C2C]">Terms of service</Link>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Order Summary */}
        <div className="lg:w-2/5 bg-white lg:bg-transparent p-6 sm:p-10 lg:p-16 border-b lg:border-b-0 border-gray-200">
          <div className="max-w-md mx-auto lg:mx-0">
            <div className="space-y-8">
              {/* Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-[#2C2C2C]">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.variant}</p>
                    </div>
                    <span className="text-sm font-bold text-[#2C2C2C]">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Discount Field */}
              <div className="flex gap-3 py-6 border-y border-gray-100">
                <input 
                  type="text" 
                  placeholder="Discount code or gift card" 
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-grow bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2C2C2C] transition-all"
                />
                <button 
                  onClick={handleApplyDiscount}
                  className="bg-[#FAF9F6] border border-gray-200 text-[#2C2C2C] px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all"
                >
                  Apply
                </button>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-bold">₹{shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated taxes</span>
                  <span className="font-bold">₹{taxes.toLocaleString()}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount (10%)</span>
                    <span className="font-bold">-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-end pt-4">
                  <div className="space-y-0.5">
                    <span className="text-lg font-serif font-bold">Total</span>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Including ₹{taxes.toLocaleString()} in taxes</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-gray-400 font-medium uppercase">INR</span>
                    <span className="text-2xl font-bold tracking-tight">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-10 grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  <ShieldCheck size={16} className="text-gray-300" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  <Truck size={16} className="text-gray-300" />
                  <span>Insured Alpha Systech shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
