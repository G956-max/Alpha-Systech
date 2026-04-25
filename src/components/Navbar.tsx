import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { useRequireAuth } from '../hooks/useRequireAuth';
import ConfirmModal from './ConfirmModal';

export default function Navbar() {
  const { isLoggedIn, role, logout } = useAuth();
  const { cartItems } = useStore();
  const requireAuth = useRequireAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isLoginActive = location.pathname === '/login';

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

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left: Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <span className="font-sans text-[22px] font-bold text-[#1a202c] tracking-tight">Alpha Systech</span>
            </div>

            {/* Center: Links */}
            <div className="hidden md:flex space-x-10">
              <Link 
                to="/" 
                className={`text-sm tracking-wide font-medium relative pb-1 ${location.pathname === '/' ? 'text-[#1a202c]' : 'text-gray-500 hover:text-[#1a202c]'}`}
              >
                Home
                {location.pathname === '/' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1a202c] rounded-t-sm" />
                )}
              </Link>
              <Link 
                to="/categories" 
                className={`text-sm tracking-wide font-medium relative pb-1 ${location.pathname === '/categories' ? 'text-[#1a202c]' : 'text-gray-500 hover:text-[#1a202c]'}`}
              >
                Laptops
              </Link>

              <Link 
                to="/contact" 
                className={`text-sm tracking-wide font-medium relative pb-1 ${location.pathname === '/contact' ? 'text-[#1a202c]' : 'text-gray-500 hover:text-[#1a202c]'}`}
              >
                Contact
              </Link>
            </div>

            {/* Right: Search, Icons & Login */}
            <div className="flex items-center space-x-6">
              <div className="hidden lg:flex relative">
                <input 
                  type="text" 
                  placeholder="Search for Laptops..." 
                  className="bg-gray-50 border border-gray-200 text-sm rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 w-64"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              <div className="flex items-center space-x-4 border-l border-gray-100 pl-6">
                <button onClick={() => navigate('/cart')} className="text-gray-600 hover:text-black transition-colors relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#2C2C2C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                
                {!isLoggedIn ? (
                  <button 
                    onClick={() => navigate('/login')}
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    <User className="h-5 w-5" />
                  </button>
                ) : (
                  <button 
                    onClick={handleProfileClick} 
                    className={`transition-colors ${location.pathname === '/profile' ? 'text-black bg-gray-100 p-2 rounded-full' : 'text-gray-600 hover:text-black p-2'}`}
                    title={role === 'admin' ? "Admin Dashboard" : "Profile"}
                  >
                    <User className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
      />
    </>
  );
}
