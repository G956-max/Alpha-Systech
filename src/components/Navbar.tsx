import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, Ruler, Sparkles, PhoneCall, Heart, MessageCircle, MapPin, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import ConfirmModal from './ConfirmModal';
import SizeGuideModal from './SizeGuideModal';

export default function Navbar() {
  const { isLoggedIn, role, logout } = useAuth();
  const { cartItems, wishlistItems } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/categories?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Erode Market Announcement Bar */}
      <div className="bg-[#1e1b4b] text-indigo-100 text-[11px] border-b border-indigo-900">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left Location & Market Badge */}
          <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
            <span className="bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={11} /> Erode Wholesale Market
            </span>
            <span className="flex items-center gap-1 text-indigo-200">
              <MapPin size={12} className="text-amber-300" />
              53/A, Eswaran Temple, Kamarajar St - 1, Erode - 638001
            </span>
            <span className="hidden lg:inline text-indigo-700">|</span>
            <span className="hidden lg:flex items-center gap-1 text-emerald-300 font-semibold">
              <Truck size={12} /> All-India Parcel &amp; Transport Dispatch
            </span>
          </div>

          {/* Right Direct WhatsApp Orders */}
          <div className="flex items-center gap-4 text-indigo-200">
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="hover:text-white flex items-center gap-1 text-[11px] font-bold"
            >
              <Ruler size={13} className="text-amber-300" />
              Size Guide
            </button>

            <span className="text-indigo-700">|</span>

            <a
              href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex,%20I%20want%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300 flex items-center gap-1 text-[11px] font-bold text-green-300"
            >
              <MessageCircle size={13} />
              <span>WhatsApp Orders: 9655147000 / 9655148000</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-indigo-100 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left: Brand Logo */}
            <div 
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-900 via-indigo-800 to-amber-500 flex items-center justify-center text-white font-serif font-black text-2xl shadow-md shadow-indigo-900/20">
                A
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-[20px] font-black text-slate-900 tracking-tight">
                    SRI AADHI NAYAGA TEX
                  </span>
                  <span className="bg-amber-100 text-amber-900 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider border border-amber-300">
                    ERODE WHOLESALE
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">
                  Textiles &amp; Saree Market • Wholesale &amp; Retail
                </span>
              </div>
            </div>

            {/* Center: Category Links */}
            <div className="hidden xl:flex items-center space-x-6">
              <Link 
                to="/" 
                className={`text-xs uppercase tracking-wider font-bold transition-colors ${location.pathname === '/' ? 'text-indigo-700 font-black' : 'text-slate-700 hover:text-indigo-600'}`}
              >
                Home
              </Link>

              <Link 
                to="/categories?q=Sarees" 
                className="text-xs uppercase tracking-wider font-bold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                Sarees
              </Link>

              <Link 
                to="/categories?q=Nighties" 
                className="text-xs uppercase tracking-wider font-bold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                Nighties
              </Link>

              <Link 
                to="/categories?q=Inskirts" 
                className="text-xs uppercase tracking-wider font-bold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                Inskirts &amp; Blouses
              </Link>

              <Link 
                to="/categories?q=Lungis" 
                className="text-xs uppercase tracking-wider font-bold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                Lungis
              </Link>

              <Link 
                to="/categories?q=Churidars" 
                className="text-xs uppercase tracking-wider font-bold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                Churidars
              </Link>

              <Link 
                to="/categories?q=Tops" 
                className="text-xs uppercase tracking-wider font-bold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                Tops &amp; Kurtis
              </Link>

              <Link 
                to="/categories?q=Vetti" 
                className="text-xs uppercase tracking-wider font-bold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                Vetti &amp; Sattai
              </Link>

              <Link 
                to="/contact" 
                className={`text-xs uppercase tracking-wider font-bold transition-colors ${location.pathname === '/contact' ? 'text-indigo-700 font-black' : 'text-slate-700 hover:text-indigo-600'}`}
              >
                Shop Address &amp; Orders
              </Link>
            </div>

            {/* Right: Search, Wishlist, Bag & User */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Bar */}
              <div className="hidden md:flex relative">
                <input 
                  type="text" 
                  placeholder="Search Sarees, Nighties, Lungis, Vetti..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="bg-indigo-50/50 hover:bg-indigo-50 focus:bg-white border border-indigo-200 text-xs rounded-full pl-4 pr-9 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-52 lg:w-64 transition-all"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 h-4 w-4" />
              </div>

              {/* Wishlist */}
              <button
                onClick={() => navigate('/wishlist')}
                title="Wishlist"
                className="p-2 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors relative"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 bg-rose-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              {/* WhatsApp Order & Call Enquiries (Only WhatsApp & Call Orders) */}
              <a 
                href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex,%20I%20want%20to%20place%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3.5 py-2 rounded-full transition-all shadow-sm text-xs font-bold"
                title="WhatsApp Order: 9655147000"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">WhatsApp Order</span>
              </a>

              <a 
                href="tel:9655148000"
                className="hidden md:flex items-center gap-1.5 bg-slate-900 hover:bg-black text-white px-3.5 py-2 rounded-full transition-all shadow-sm text-xs font-bold"
                title="Call Enquiry: 9655148000"
              >
                <PhoneCall className="h-3.5 w-3.5 text-amber-400" />
                <span>Call Enquiry</span>
              </a>
              
              {/* Profile */}
              <button 
                onClick={handleProfileClick}
                className={`p-2 rounded-full transition-colors border border-gray-200 ${location.pathname === '/profile' || location.pathname === '/admin' ? 'text-indigo-900 bg-indigo-100' : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50'}`}
                title={isLoggedIn ? (role === 'admin' ? "Admin Portal" : "My Account") : "My Account"}
              >
                <User className="h-5 w-5" />
              </button>

              {/* Mobile Menu */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 text-slate-700 hover:text-indigo-600 transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="xl:hidden bg-white border-t border-indigo-100 overflow-hidden shadow-2xl"
            >
              <div className="px-4 py-5 space-y-2.5 text-xs">
                <div className="relative mb-3">
                  <input 
                    type="text" 
                    placeholder="Search Sarees, Nighties, Lungis, Vetti..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="w-full bg-indigo-50/60 border border-indigo-200 text-xs rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 h-4 w-4" />
                </div>

                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg font-bold text-slate-800">
                  Home
                </Link>
                <Link to="/categories?q=Sarees" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg font-bold text-slate-800">
                  Sarees (Cotton, Soft Silk, Pattu, Fancy)
                </Link>
                <Link to="/categories?q=Nighties" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg font-bold text-slate-800">
                  Cotton &amp; Feeding Nighties
                </Link>
                <Link to="/categories?q=Inskirts" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg font-bold text-slate-800">
                  Inskirts (Petticoats) &amp; Blouses
                </Link>
                <Link to="/categories?q=Lungis" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg font-bold text-slate-800">
                  Erode Handloom Cotton Lungis
                </Link>
                <Link to="/categories?q=Churidars" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg font-bold text-slate-800">
                  Readymade Churidars &amp; Materials
                </Link>
                <Link to="/categories?q=Tops" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg font-bold text-slate-800">
                  Tops &amp; Kurtis
                </Link>
                <Link to="/categories?q=Vetti" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg font-bold text-slate-800">
                  Vetti &amp; Sattai (Dhoti &amp; Shirt Sets)
                </Link>
                <Link to="/categories?q=Lining" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg font-bold text-slate-800">
                  Lining Materials &amp; Innerwear
                </Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg font-bold text-indigo-700">
                  Erode Shop Address &amp; Wholesale Orders
                </Link>

                <div className="pt-3 border-t border-indigo-100 flex flex-col gap-2">
                  <a
                    href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-green-600 text-white py-2.5 rounded-xl font-bold text-xs"
                  >
                    <MessageCircle size={15} /> WhatsApp Orders: 9655147000
                  </a>
                  <a
                    href="tel:9655148000"
                    className="flex items-center justify-center gap-1.5 bg-slate-900 text-white py-2.5 rounded-xl font-bold text-xs"
                  >
                    <PhoneCall size={14} className="text-amber-400" /> Call Enquiries: 9655148000 / 9655147000
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

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
