import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/case-studies' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10">
            <svg viewBox="0 0 100 100" className="w-full h-full text-navy fill-current">
              <path d="M50 10 C 25 10 10 25 10 50 C 10 75 25 90 50 90 C 60 90 70 85 75 80 L 75 50 L 50 50 L 50 65 L 60 65 L 60 75 C 55 78 52 78 50 78 C 35 78 25 68 25 50 C 25 32 35 22 50 22 C 55 22 62 25 65 28 L 75 18 C 68 12 60 10 50 10 Z" />
              <path d="M80 30 L 70 30 L 70 20 L 80 20 Z" className="text-orange-accent fill-current" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-xl tracking-tight text-navy">
              Alpha Solutions
            </span>
            <span className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-navy/60 font-bold -mt-1">
              Powering Language Intelligence
            </span>
          </div>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-[13px] font-semibold text-navy/80 hover:text-orange-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="btn-primary !py-2.5 !px-6 text-[13px]">
            Get a Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="w-6 h-0.5 mb-1.5 bg-navy"></div>
          <div className="w-6 h-0.5 mb-1.5 bg-navy"></div>
          <div className="w-6 h-0.5 bg-navy"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-alpha-border p-8 flex flex-col space-y-6 lg:hidden shadow-2xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-navy font-bold text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
