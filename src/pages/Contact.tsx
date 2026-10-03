import { useState } from 'react';
import { 
  Building2, 
  PhoneCall, 
  MapPin, 
  Send, 
  Clock, 
  MessageCircle, 
  Truck, 
  CheckCircle2
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
    <div className="bg-[#F7FCF9] min-h-screen pb-6 font-sans text-slate-900">
      {/* Mobile Header Banner with Light Green / Emerald Gradient */}
      <div className="bg-gradient-to-b from-[#064E3B] via-[#047857] to-[#065F46] text-white p-4 pt-5 pb-5 space-y-2">
        <span className="bg-emerald-400 text-emerald-950 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
          Erode Textile Market Shop
        </span>
        <h1 className="text-xl font-serif font-black tracking-tight leading-tight">
          Sri Aadhi Nayaga Tex
        </h1>
        <p className="text-emerald-100 text-xs font-light leading-relaxed">
          Wholesale textile and saree market shop in Erode, Tamil Nadu. WhatsApp &amp; Call orders with all-India parcel transport.
        </p>

        {/* Quick Contact Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex,%20I%20want%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow"
          >
            <MessageCircle size={15} />
            <span>9655147000</span>
          </a>

          <a
            href="tel:9655148000"
            className="bg-emerald-950 text-white border border-emerald-400/30 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <PhoneCall size={14} className="text-emerald-300" />
            <span>9655148000</span>
          </a>
        </div>
      </div>

      <div className="p-3 space-y-3.5">
        {/* Shop Address Card */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs space-y-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-900 font-serif font-bold text-sm uppercase tracking-wider pb-2 border-b border-emerald-50">
            <Building2 size={16} className="text-emerald-600" />
            Store Location &amp; Visit Details
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl shrink-0 mt-0.5">
                <MapPin size={16} />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">Shop Address:</div>
                <p className="text-gray-700 text-xs mt-0.5 leading-relaxed font-medium">
                  53/A, Eswaran Temple,<br />
                  Kamarajar Street - 1,<br />
                  Erode - 638001, Tamil Nadu.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-gray-100">
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl shrink-0 mt-0.5">
                <PhoneCall size={16} />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">Direct Phone Numbers:</div>
                <div className="font-extrabold text-emerald-800 text-xs mt-0.5">9655147000 / 9655148000</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-gray-100">
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl shrink-0 mt-0.5">
                <Clock size={16} />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">Working Hours:</div>
                <p className="text-gray-600 text-xs mt-0.5">
                  Mon - Sat: 9:00 AM - 9:00 PM<br />
                  Sunday: 10:00 AM - 8:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-gray-100">
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl shrink-0 mt-0.5">
                <Truck size={16} />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">All-India Parcel Transport:</div>
                <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">
                  Daily parcel booking from Erode to all cities across South and North India via VRL, KPN, MSS, SafeXpress &amp; ST Courier.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wholesale Inquiry Form */}
        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs">
          <div className="mb-3">
            <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              Fast WhatsApp Booking
            </span>
            <h2 className="text-base font-serif font-black text-slate-900 mt-1">
              Send Order Enquiry
            </h2>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Fill details below. Our shop manager will directly reply to your WhatsApp with current stock photos.
            </p>
          </div>

          {submitted ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-sm font-serif font-bold text-slate-900">Enquiry Ready!</h3>
              <p className="text-xs text-gray-600">
                Vanakkam, <b>{formData.name}</b>. Click below to continue on WhatsApp:
              </p>
              <a
                href={`https://wa.me/919655147000?text=${encodeURIComponent(`Vanakkam Sri Aadhi Nayaga Tex! I am ${formData.name} (${formData.phone}), inquiring from ${formData.city} for ${formData.productInterest} (Qty: ${formData.quantity}). Notes: ${formData.message || 'Direct Order Enquiry'}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-bold text-xs"
              >
                <MessageCircle size={16} /> Open in WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1 text-[11px]">
                  Your Name / Shop Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meena / Sri Murugan Textiles"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-800 mb-1 text-[11px]">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1 text-[11px]">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Madurai / Bangalore"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1 text-[11px]">
                  Category of Interest
                </label>
                <select
                  value={formData.productInterest}
                  onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                  className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Sarees (Cotton, Soft Silk, Fancy, Pattu)</option>
                  <option>Nighties (Cotton, Feeding &amp; Alpine)</option>
                  <option>Inskirts (6-Cut Petticoats) &amp; Blouses</option>
                  <option>Erode Handloom Cotton Lungis</option>
                  <option>Churidars &amp; Dress Materials</option>
                  <option>Tops &amp; Kurtis</option>
                  <option>Vetti &amp; Sattai Sets</option>
                  <option>Lining &amp; Tailoring Materials</option>
                  <option>Mixed Wholesale Assortment</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1 text-[11px]">
                  Quantity Needed
                </label>
                <select
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Retail Single Items (1 to 4 Pcs)</option>
                  <option>Bundle Pack (10 to 25 Pcs)</option>
                  <option>Small Shop Stock (50 to 100 Pcs)</option>
                  <option>Full Transport Bales (200+ Pcs)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1 text-[11px]">
                  Specific Designs / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need cotton sarees under ₹500 wholesale"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all active:scale-95"
              >
                <Send size={15} /> Send WhatsApp Enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
