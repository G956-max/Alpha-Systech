import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-alpha-border pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="col-span-1 lg:col-span-1">
          <Link to="/" className="flex items-center space-x-3 mb-8 group inline-block">
            <div className="relative flex items-center justify-center w-10 h-10">
              <svg viewBox="0 0 100 100" className="w-full h-full text-navy fill-current">
                <path d="M50 10 C 25 10 10 25 10 50 C 10 75 25 90 50 90 C 60 90 70 85 75 80 L 75 50 L 50 50 L 50 65 L 60 65 L 60 75 C 55 78 52 78 50 78 C 35 78 25 68 25 50 C 25 32 35 22 50 22 C 55 22 62 25 65 28 L 75 18 C 68 12 60 10 50 10 Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-xl tracking-tight text-navy">
                Alpha Solutions
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-navy/60 font-bold -mt-1">
                Powering Language Intelligence
              </span>
            </div>
          </Link>
          <p className="text-navy/50 text-[13px] leading-relaxed max-w-xs font-medium mb-8">
            Delivering high-quality language and LLM services that empower AI, media, education, and global businesses to communicate without borders.
          </p>
          <div className="flex space-x-4">
             {['in', 'f', 't', 'ig'].map(s => (
               <a key={s} href="#" className="w-9 h-9 rounded-full border border-alpha-border flex items-center justify-center text-navy/40 hover:border-orange-accent hover:text-orange-accent transition-all">
                  <span className="font-bold text-sm tracking-tighter uppercase">{s}</span>
               </a>
             ))}
          </div>
        </div>

        <div>
          <h4 className="font-sans font-semibold text-navy mb-8 text-sm uppercase tracking-widest">Quick Links</h4>
          <ul className="space-y-4 text-[13px] text-navy/60 font-medium">
            <li><Link to="/" className="hover:text-orange-accent transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-orange-accent transition-colors">Services</Link></li>
            <li><Link to="/case-studies" className="hover:text-orange-accent transition-colors">Industries</Link></li>
            <li><Link to="/about" className="hover:text-orange-accent transition-colors">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-orange-accent transition-colors">Why Us</Link></li>
            <li><Link to="/contact" className="hover:text-orange-accent transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="font-sans font-semibold text-navy mb-8 text-sm uppercase tracking-widest">Services</h4>
           <ul className="space-y-4 text-[13px] text-navy/60 font-medium">
             <li><Link to="/services" className="hover:text-orange-accent transition-colors">Translation</Link></li>
             <li><Link to="/services" className="hover:text-orange-accent transition-colors">Transcription</Link></li>
             <li><Link to="/services" className="hover:text-orange-accent transition-colors">Proofreading</Link></li>
             <li><Link to="/services" className="hover:text-orange-accent transition-colors">Subtitling</Link></li>
             <li><Link to="/services" className="hover:text-orange-accent transition-colors">Voice Collection</Link></li>
           </ul>
        </div>

        <div>
          <h4 className="font-sans font-semibold text-navy mb-8 text-sm uppercase tracking-widest">Contact Us</h4>
          <ul className="space-y-6">
            <li className="flex items-start">
               <span className="text-orange-accent mr-3 mt-1">📞</span>
               <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase text-navy/30 tracking-wider">Phone</p>
                  <p className="text-[13px] font-bold text-navy">+91 12345 67890</p>
               </div>
            </li>
            <li className="flex items-start">
               <span className="text-orange-accent mr-3 mt-1">📧</span>
               <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase text-navy/30 tracking-wider">Email</p>
                  <p className="text-[13px] font-bold text-navy">info@alphasolutions.in</p>
               </div>
            </li>
            <li className="flex items-start">
               <span className="text-orange-accent mr-3 mt-1">📍</span>
               <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase text-navy/30 tracking-wider">Location</p>
                  <p className="text-[13px] font-bold text-navy">Chennai, India</p>
               </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-alpha-border flex flex-col md:flex-row justify-between items-center text-[11px] text-navy/30 font-bold uppercase tracking-[0.2em]">
        <p>© 2026 Alpha Solutions. All Rights Reserved.</p>
        <div className="flex space-x-8 mt-6 md:mt-0">
          <Link to="#" className="hover:text-navy transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-navy transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
