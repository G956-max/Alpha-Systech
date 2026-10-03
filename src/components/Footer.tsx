import { useState } from 'react';
import { Mail, MapPin, PhoneCall, Truck, ShieldCheck, MessageCircle, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';
import SizeGuideModal from './SizeGuideModal';

export default function Footer() {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#064E3B] text-emerald-100 pt-8 pb-10 border-t border-emerald-900 text-xs font-sans">
        <div className="px-4 space-y-6">
          {/* Brand Header */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-300 text-emerald-950 font-serif font-black flex items-center justify-center text-xl shadow-md shrink-0">
              A
            </div>
            <div>
              <h3 className="font-serif font-black text-base text-white tracking-tight">
                SRI AADHI NAYAGA TEX
              </h3>
              <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">
                Erode Wholesale Textile &amp; Saree Market
              </p>
            </div>
          </div>

          <p className="text-emerald-200/90 text-xs leading-relaxed font-light">
            Erode manufacturer &amp; wholesale prices for Sarees, Nighties, Inskirts, Blouses, Lungis, Churidars, Tops, Vetti and Lining Materials. Daily All-India Parcel Dispatch.
          </p>

          {/* Quick Action Contact Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow"
            >
              <MessageCircle size={15} />
              <span>9655147000</span>
            </a>

            <a
              href="tel:9655148000"
              className="bg-emerald-950/80 text-white border border-emerald-700/60 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <PhoneCall size={14} className="text-emerald-300" />
              <span>9655148000</span>
            </a>
          </div>

          {/* Store Address Card */}
          <div className="bg-emerald-950/50 rounded-2xl p-3.5 border border-emerald-800/60 space-y-2 text-[11px]">
            <div className="flex items-start gap-2 text-emerald-100">
              <MapPin size={15} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <b>Sri Aadhi Nayaga Tex</b><br />
                53/A, Eswaran Temple, Kamarajar Street - 1,<br />
                Erode - 638001, Tamil Nadu.
              </span>
            </div>

            <div className="pt-2 border-t border-emerald-800/50 flex items-center justify-between text-[10px] text-emerald-300">
              <span className="flex items-center gap-1">
                <Truck size={12} /> All-India Parcel Dispatch
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} /> Direct Weaver Rates
              </span>
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
              Quick Categories
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Sarees',
                'Nighties',
                'Inskirts',
                'Lungis',
                'Churidars',
                'Tops',
                'Vetti',
                'Lining'
              ].map((c) => (
                <Link
                  key={c}
                  to={`/categories?q=${encodeURIComponent(c)}`}
                  className="bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 px-2.5 py-1 rounded-lg text-[10px] font-medium border border-emerald-700/40"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-4 border-t border-emerald-900/80 text-[10px] text-emerald-300/70 text-center space-y-1">
            <p>&copy; {new Date().getFullYear()} Sri Aadhi Nayaga Tex, Erode. All rights reserved.</p>
            <p>Mobile Wholesale Shopping Portal • WhatsApp Orders Only</p>
          </div>
        </div>
      </footer>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </>
  );
}
