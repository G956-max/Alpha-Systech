import React from 'react';
import { Share2, Mail, MapPin } from 'lucide-react';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const requireAuth = useRequireAuth();
  const navigate = useNavigate();

  const handleLinkClick = (e: React.MouseEvent, path: string = '#') => {
    e.preventDefault();
    if (path !== '#') {
      navigate(path);
    } else {
      requireAuth();
    }
  };

  return (
    <footer className="bg-white text-[#1a202c] pt-16 pb-8 border-t border-gray-100">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 pr-8">
            <h3 className="font-sans text-[22px] font-bold mb-4 tracking-tight">Alpha Systech</h3>
            <p className="text-gray-500 text-xs leading-relaxed max-w-sm mb-6">
              Direct hardware sourcing for modern enterprise and professionals. Quality guaranteed through rigorous verification.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-[#1a202c] transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
              <button className="text-gray-400 hover:text-[#1a202c] transition-colors">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-6 uppercase tracking-wider text-xs">COMPANY</h4>
            <ul className="space-y-3 text-gray-500 text-xs">

              <li><a href="#" onClick={(e) => handleLinkClick(e)} className="hover:text-[#1a202c] transition-colors">Procurement</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e)} className="hover:text-[#1a202c] transition-colors">Warranty Policy</a></li>
            </ul>
          </div>
          
          {/* Customer Support Links */}
          <div>
            <h4 className="font-semibold mb-6 uppercase tracking-wider text-xs">CUSTOMER SUPPORT</h4>
            <ul className="space-y-3 text-gray-500 text-xs">
              <li><a href="#" onClick={(e) => handleLinkClick(e, '/contact')} className="hover:text-[#1a202c] transition-colors">Contact Sales</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e)} className="hover:text-[#1a202c] transition-colors">Technical Service</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e)} className="hover:text-[#1a202c] transition-colors">Shipping Info</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e)} className="hover:text-[#1a202c] transition-colors">Refund/Support</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Alpha Systech. All rights reserved.
          </p>
          <div className="flex items-center space-x-2">
            <MapPin className="h-3 w-3" />
            <span>Global Sourcing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
