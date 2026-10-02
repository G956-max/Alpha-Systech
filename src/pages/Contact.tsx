import { useState } from 'react';
import { 
  Building2, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Send, 
  Clock, 
  MessageCircle, 
  Truck, 
  Sparkles,
  CheckCircle2,
  Package,
  Navigation
} from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    orderType: 'Wholesale Bales & Bundles for Shop',
    productInterest: 'Sarees (Cotton, Soft Silk, Fancy, Pattu)',
    quantity: '50 - 100 Pieces',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inquiryText = `Vanakkam Sri Aadhi Nayaga Tex!
Name/Shop: ${formData.name}
Phone: ${formData.phone}
City: ${formData.city}
Order Type: ${formData.orderType}
Category: ${formData.productInterest}
Quantity: ${formData.quantity}
Notes: ${formData.message || 'Wholesale order enquiry'}`;

    window.open(`https://wa.me/919655147000?text=${encodeURIComponent(inquiryText)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-24 font-sans text-slate-900">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white py-14 border-b border-indigo-900">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
          <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Erode Textile Market Shop
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black mt-3 tracking-tight">
            Sri Aadhi Nayaga Tex
          </h1>
          <p className="text-indigo-200 text-xs sm:text-sm mt-2 max-w-2xl mx-auto font-light">
            Wholesale textile and saree market shop located in Erode, Tamil Nadu. Orders and enquiries accepted exclusively via WhatsApp and Phone call with all-India parcel transport.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <a
              href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex,%20I%20want%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg shadow-green-600/25"
            >
              <MessageCircle size={16} />
              WhatsApp: 9655147000
            </a>

            <a
              href="https://wa.me/919655148000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex,%20I%20want%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg shadow-green-700/25"
            >
              <MessageCircle size={16} />
              WhatsApp: 9655148000
            </a>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Exact Address, Phones & Shop Overview */}
          <div className="lg:col-span-5 space-y-6">
            {/* Shop Address Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5 text-xs">
              <div className="flex items-center gap-2 text-indigo-900 font-serif font-bold text-base uppercase tracking-wider pb-3 border-b border-gray-100">
                <Building2 size={18} className="text-amber-500" />
                Store Location &amp; Visit Details
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl shrink-0 mt-0.5">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Shop Address:</div>
                    <p className="text-gray-700 text-xs mt-1 leading-relaxed font-medium">
                      53/A, Eswaran Temple,<br />
                      Kamarajar Street - 1,<br />
                      Erode - 638001, Tamil Nadu.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                  <div className="p-2.5 bg-green-50 text-green-700 rounded-xl shrink-0 mt-0.5">
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">WhatsApp Orders &amp; Hotline:</div>
                    <div className="font-bold text-green-700 text-sm mt-0.5">9655147000 / 9655148000</div>
                    <p className="text-[11px] text-gray-500 mt-0.5">Call or WhatsApp for direct photo catalog &amp; bale rates</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                  <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl shrink-0 mt-0.5">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Shop Working Hours:</div>
                    <p className="text-gray-600 text-xs mt-0.5">
                      Monday to Saturday: 9:00 AM - 9:00 PM<br />
                      Sunday: 10:00 AM - 8:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                  <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl shrink-0 mt-0.5">
                    <Truck size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Parcel &amp; Transport Logistics:</div>
                    <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">
                      Daily parcel booking from Erode to all cities in Tamil Nadu, Kerala, Karnataka, Andhra, Telangana, and North India via VRL, KPN, MSS, SafeXpress &amp; ST Courier.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Available Summary List */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-3 text-xs">
              <h4 className="font-serif font-bold text-base text-amber-300">
                Products Available at Wholesale Rates:
              </h4>
              <ul className="space-y-1.5 text-indigo-100 text-[11px]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                  Sarees (Cotton, Soft Silk, Fancy, Designer, Bridal, Daily Wear, Party Wear, Banarasi, Kanchipuram, Pattu)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                  Pure Cotton &amp; Alpine Nighties (Zipper &amp; Feeding)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                  Inskirts (6-Cut Heavy Cotton Petticoats)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                  Blouses (Readymade Designer &amp; Aari Work)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                  Erode Handloom Cotton Lungis (Packs of 5 &amp; 10)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                  Readymade Churidars and Churidar Dress Materials
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                  Tops and Kurtis (Rayon &amp; Cotton)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                  Vetti &amp; Sattai (Traditional Dhoti &amp; Shirt Sets)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                  Innerwears &amp; 2x2 Aster Lining Materials
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Wholesale & Retail Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm">
              <div className="mb-6">
                <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Direct Shop Booking
                </span>
                <h2 className="text-2xl font-serif font-black text-slate-900 mt-2">
                  Send Wholesale Inquiry / Order Request
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Fill in your requirements below. Our shop manager will directly reply to your WhatsApp with current stock photos and wholesale prices.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-900">Inquiry Ready for WhatsApp!</h3>
                  <p className="text-xs text-gray-600 max-w-md mx-auto">
                    Vanakkam, <b className="text-slate-900">{formData.name}</b>. Your enquiry details have been forwarded to Sri Aadhi Nayaga Tex team. You can also directly chat or call below:
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/919655147000?text=${encodeURIComponent(`Vanakkam Sri Aadhi Nayaga Tex! I am ${formData.name} (${formData.phone}), inquiring from ${formData.city} for ${formData.productInterest} (Qty: ${formData.quantity}). Notes: ${formData.message || 'Direct Order Enquiry'}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-md"
                    >
                      <MessageCircle size={16} />
                      Open WhatsApp: 9655147000
                    </a>
                    <a
                      href="tel:9655148000"
                      className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-md"
                    >
                      <PhoneCall size={15} className="text-amber-400" />
                      Call Hotline: 9655148000
                    </a>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-gray-500 hover:text-slate-900 text-xs font-semibold underline"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Your Name / Shop Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Balaji Textiles / Ramesh"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-indigo-50/40 border border-indigo-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">WhatsApp Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9655147000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-indigo-50/40 border border-indigo-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Your City &amp; State *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Madurai, Tamil Nadu"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-indigo-50/40 border border-indigo-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Order Type</label>
                      <select
                        value={formData.orderType}
                        onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                        className="w-full bg-indigo-50/40 border border-indigo-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option>Wholesale Bales &amp; Bundles for Shop</option>
                        <option>Online Reseller Catalog Sets</option>
                        <option>Retail Personal Shopping</option>
                        <option>Wedding Family Bulk Purchase</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Product Category Required</label>
                      <select
                        value={formData.productInterest}
                        onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                        className="w-full bg-indigo-50/40 border border-indigo-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option>Sarees (Cotton, Soft Silk, Fancy, Pattu)</option>
                        <option>Pure Cotton Nighties</option>
                        <option>Inskirts (Petticoats) &amp; Blouses</option>
                        <option>Erode Handloom Lungis</option>
                        <option>Churidars &amp; Dress Materials</option>
                        <option>Tops and Kurtis</option>
                        <option>Vetti &amp; Sattai Matching Sets</option>
                        <option>Lining Materials &amp; Innerwear</option>
                        <option>All Items Mixed Parcel</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 uppercase mb-1">Expected Quantity</label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full bg-indigo-50/40 border border-indigo-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option>10 - 25 Pieces (Sample Bundle)</option>
                        <option>25 - 50 Pieces (Shop Stock)</option>
                        <option>50 - 100 Pieces (Full Parcel)</option>
                        <option>100+ Pieces (Full Bale / Wholesale)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 uppercase mb-1">
                      Specific Requirements / Notes
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Mention your required colors, price range per piece, or transport delivery city..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-indigo-50/40 border border-indigo-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-colors shadow-lg shadow-amber-400/25 flex items-center justify-center gap-2"
                  >
                    <Send size={15} />
                    Send Inquiry to Sri Aadhi Nayaga Tex
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
