import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, Menu, X, Ruler, Sparkles, PhoneCall, Heart, MessageCircle, MapPin, Truck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import ConfirmModal from './ConfirmModal';
import SizeGuideModal from './SizeGuideModal';



export default function Navbar() {
  const { isLoggedIn, role, logout } = useAuth();
  const { wishlistItems } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProfileClick = () => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
  };

  const handleLogoutConfirm = () => {
    logout();
    navigate('/');
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/categories?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
      setIsSearchOpen(false);
    }
  };

  const tickerItems = [
    '🔥 DIRECT WEAVER & POWERLOOM WHOLESALE RATES',
    '✨ ERODE WHOLESALE TEXTILE & SAREE MARKET',
    '🚚 DAILY ALL-INDIA PARCEL & LORRY TRANSPORT',
    '💬 WHATSAPP ORDERS: 9655147000 / 9655148000',
    '⭐ BEST QUALITY PURE COTTON SAREES & NIGHTIES BALES',
    '📍 53/A, ESWARAN TEMPLE, KAMARAJAR ST - 1, ERODE'
  ];

  return (
    <>
      {/* Top Divine Invocation & Quick Hotline Header (Matching Exact Reference) */}
      <div className="bg-[#012217] text-white py-2 px-3 border-b border-emerald-900/80 flex flex-col items-center justify-center gap-1.5 text-center relative z-50">
        {/* Golden Divine Invocation Pill */}
        <motion.div 
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950 font-black text-[11px] px-3.5 py-0.5 rounded-full shadow-md border border-amber-200"
        >
          <Sparkles size={11} className="text-amber-900" />
          <span>வெங்கடேசப்பெருமான் நங்கம்மா தாய் துணை</span>
          <Sparkles size={11} className="text-amber-900" />
        </motion.div>

        {/* Quick links & numbers */}
        <div className="flex items-center justify-center gap-2.5 text-[10px] text-emerald-200 font-semibold pt-0.5 flex-wrap">
          <button 
            onClick={() => setIsSizeGuideOpen(true)}
            className="inline-flex items-center gap-1 text-emerald-200 hover:text-white transition-colors"
          >
            <Ruler size={11} className="text-amber-300" />
            <span>Size Guide</span>
          </button>
          <span className="text-emerald-700">|</span>
          <a 
            href="tel:965537000"
            className="inline-flex items-center gap-1 hover:text-white transition-colors font-bold text-amber-300"
          >
            <PhoneCall size={11} className="text-amber-300" />
            <span>Call: 96553 7000 / 96553 9800</span>
          </a>
        </div>

        {/* WhatsApp direct link */}
        <a 
          href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] text-[#25D366] hover:text-emerald-300 font-bold transition-colors"
        >
          <MessageCircle size={12} className="text-[#25D366]" />
          <span>WhatsApp: 9655147000</span>
        </a>
      </div>

      {/* Main Mobile Header (Matching Exact Reference Layout) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-[0_4px_20px_rgba(6,78,59,0.08)]">
        <div className="px-3 py-2 flex items-center justify-between gap-2">
          
          {/* Brand Logo & Dual-Language Title */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer min-w-0 group"
            onClick={() => navigate('/')}
          >
            {/* Round Medallion Avatar with Gold Rim */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#064E3B] via-emerald-800 to-amber-500 flex items-center justify-center text-amber-300 font-serif font-black text-xl shadow-md border-2 border-amber-400 shrink-0">
              <span className="drop-shadow-xs">A</span>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="font-serif text-[14px] font-black tracking-tight text-slate-900 leading-tight">
                  SRI AADHI NAYAGA TEX
                </h1>
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase shadow-xs">
                  SURAT RATES
                </span>
              </div>

              <p className="text-[9px] text-emerald-800 font-extrabold tracking-wide uppercase truncate mt-0.5">
                ஸ்ரீ ஆதி நாயகா டெக்ஸ் • WHOLESALE &amp; RETAIL ERODE
              </p>
            </div>
          </div>

          {/* Right Action Icons: Wishlist & Drawer */}
          <div className="flex items-center gap-1 shrink-0">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => navigate('/wishlist')}
              className="p-2 text-slate-700 hover:text-rose-600 rounded-full transition-colors relative"
              title="Wishlist"
            >
              <Heart size={19} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistItems.length}
                </span>
              )}
            </motion.button>

            <motion.button 
              whileTap={{ scale: 0.88 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-emerald-800 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} className="text-emerald-800" /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Continuous Laser Border */}
        <div className="h-[2px] w-full animate-laser" />

        {/* Expandable Mobile Search Bar with Slide-Down Animation */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="px-3 pb-2.5 overflow-hidden border-t border-emerald-50 bg-emerald-50/20"
            >
              <form onSubmit={handleSearchSubmit} className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search Sarees, Nighties, Lungis, Vetti..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-white border-2 border-emerald-300 text-xs rounded-xl pl-3.5 pr-9 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                />
                <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-600 p-1">
                  <Search size={16} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="bg-white border-t border-emerald-100 shadow-2xl overflow-hidden"
            >
              <div className="p-4 space-y-3 text-xs">
                {/* Store Profile Card with 3D Border Glow */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-50/60 p-3 rounded-2xl border border-emerald-200/80 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-green-500 text-white font-bold flex items-center justify-center font-serif text-lg shadow-sm">
                      A
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Sri Aadhi Nayaga Tex</h4>
                      <p className="text-[10px] text-emerald-800 font-medium">Erode Wholesale Textile Hub</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-600 text-white font-black px-2.5 py-0.5 rounded-full shadow-xs">
                    Direct Weaver
                  </span>
                </div>

                {/* Category Links */}
                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-black uppercase text-emerald-800 tracking-wider px-2">
                    Browse Categories
                  </div>
                  {[
                    { label: 'Sarees (Cotton, Soft Silk, Pattu)', q: 'Sarees' },
                    { label: 'Pure Cotton & Feeding Nighties', q: 'Nighties' },
                    { label: 'Inskirts (Petticoats) & Blouses', q: 'Inskirts' },
                    { label: 'Erode Handloom Cotton Lungis', q: 'Lungis' },
                    { label: 'Churidars & Dress Materials', q: 'Churidars' },
                    { label: 'Tops & Kurtis Collection', q: 'Tops' },
                    { label: 'Vetti & Sattai Sets', q: 'Vetti' },
                    { label: 'Lining & Tailoring Materials', q: 'Lining' }
                  ].map((item, idx) => (
                    <motion.div key={idx} whileTap={{ scale: 0.98 }}>
                      <Link 
                        to={`/categories?q=${encodeURIComponent(item.q)}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-800 hover:bg-emerald-50 font-bold transition-colors"
                      >
                        <span>{item.label}</span>
                        <ChevronRight size={14} className="text-emerald-600" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Info & Action Buttons */}
                <div className="pt-2 border-t border-emerald-100 space-y-2">
                  <Link 
                    to="/contact" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-emerald-800 bg-emerald-50/80 font-bold"
                  >
                    <MapPin size={15} className="text-emerald-600 shrink-0" />
                    <span className="truncate">53/A, Eswaran Temple, Kamarajar St - 1, Erode</span>
                  </Link>

                  <motion.a
                    href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-xl font-bold text-xs shadow-md shadow-emerald-600/30"
                  >
                    <MessageCircle size={16} />
                    WhatsApp Orders: 9655147000
                  </motion.a>

                  <motion.a
                    href="tel:9655148000"
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 bg-emerald-950 text-white py-2.5 rounded-xl font-bold text-xs"
                  >
                    <PhoneCall size={15} className="text-emerald-300" />
                    Call Hotline: 9655148000
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        title="Logout"
        message="Are you sure you want to log out of your account?"
        confirmText="Logout"
      />
    </>
  );
}
