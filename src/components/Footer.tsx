import { useState } from 'react';
import { Mail, MapPin, PhoneCall, Truck, ShieldCheck, MessageCircle, Ruler, Boxes } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import SizeGuideModal from './SizeGuideModal';

export default function Footer() {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#0f172a] text-gray-400 pt-16 pb-12 border-t border-indigo-950 text-xs font-sans">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            
            {/* Logo and Description */}
            <div className="md:col-span-2 pr-0 sm:pr-8 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-800 via-indigo-700 to-amber-500 text-white font-serif font-black flex items-center justify-center text-xl shadow-md">
                  A
                </div>
                <div>
                  <h3 className="font-serif font-black text-lg text-white tracking-tight">
                    SRI AADHI NAYAGA TEX
                  </h3>
                  <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    Erode Wholesale Textile &amp; Saree Market
                  </p>
                </div>
              </div>

              <p className="text-gray-400 text-xs leading-relaxed max-w-sm font-light">
                Wholesale textile and saree market shop located in Erode, Tamil Nadu. Direct manufacturer prices for Sarees, Nighties, Inskirts, Blouses, Lungis, Churidars, Tops &amp; Kurtis, Vetti &amp; Sattai, and Lining Materials. We accept wholesale bulk orders with All-India delivery.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
                >
                  <MessageCircle size={14} />
                  WhatsApp: 9655147000
                </a>

                <a
                  href="tel:9655148000"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <PhoneCall size={14} className="text-amber-300" />
                  9655148000
                </a>
              </div>
            </div>
            
            {/* Products List 1 */}
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-wider text-xs text-white">
                TEXTILE PRODUCTS
              </h4>
              <ul className="space-y-2.5 text-gray-300">
                <li><Link to="/categories?q=Sarees" className="hover:text-amber-300 transition-colors">Cotton &amp; Soft Silk Sarees</Link></li>
                <li><Link to="/categories?q=Sarees" className="hover:text-amber-300 transition-colors">Fancy, Designer &amp; Pattu Sarees</Link></li>
                <li><Link to="/categories?q=Nighties" className="hover:text-amber-300 transition-colors">Pure Cotton &amp; Feeding Nighties</Link></li>
                <li><Link to="/categories?q=Inskirts" className="hover:text-amber-300 transition-colors">6-Cut Cotton Inskirts (Petticoats)</Link></li>
                <li><Link to="/categories?q=Blouses" className="hover:text-amber-300 transition-colors">Readymade &amp; Designer Blouses</Link></li>
              </ul>
            </div>
            
            {/* Products List 2 */}
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-wider text-xs text-white">
                WHOLESALE CATEGORIES
              </h4>
              <ul className="space-y-2.5 text-gray-300">
                <li><Link to="/categories?q=Lungis" className="hover:text-amber-300 transition-colors">Erode Handloom Cotton Lungis</Link></li>
                <li><Link to="/categories?q=Churidars" className="hover:text-amber-300 transition-colors">Readymade Churidars &amp; Materials</Link></li>
                <li><Link to="/categories?q=Tops" className="hover:text-amber-300 transition-colors">Tops &amp; Daily Kurtis</Link></li>
                <li><Link to="/categories?q=Vetti" className="hover:text-amber-300 transition-colors">Vetti &amp; Sattai Matching Sets</Link></li>
                <li><Link to="/categories?q=Lining" className="hover:text-amber-300 transition-colors">2x2 Aster Lining Materials</Link></li>
              </ul>
            </div>

            {/* Shop Address & Hours */}
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-wider text-xs text-white">
                ERODE SHOP ADDRESS
              </h4>
              <div className="space-y-3 text-[11px]">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    53/A, Eswaran Temple,<br />
                    Kamarajar Street - 1,<br />
                    Erode - 638001, Tamil Nadu.
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white font-bold pt-1">
                  <PhoneCall size={14} className="text-green-400" />
                  <span>Orders: 9655147000 / 9655148000</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail size={14} />
                  <span>orders@sriaadhinayagatex.com</span>
                </div>
              </div>
            </div>

          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500 gap-4">
            <p>
              &copy; {new Date().getFullYear()} Sri Aadhi Nayaga Tex. 53/A, Eswaran Temple, Kamarajar Street - 1, Erode - 638001. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-gray-400">
                <Truck size={14} className="text-amber-400" />
                All-India Parcel &amp; Transport Delivery
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <ShieldCheck size={14} className="text-emerald-400" />
                Direct Erode Wholesale Rates
              </span>
            </div>
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
