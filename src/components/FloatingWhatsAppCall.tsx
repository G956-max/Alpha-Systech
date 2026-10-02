import { MessageCircle, PhoneCall } from 'lucide-react';

export default function FloatingWhatsAppCall() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5">
      {/* Tooltip badge */}
      <div className="hidden sm:flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-slate-700">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>WhatsApp Orders &amp; Call Enquiries Only</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Call Hotline Button */}
        <a
          href="tel:9655148000"
          className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-4 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-2xl border border-slate-700 hover:scale-105 transition-all"
          title="Call Shop: 9655148000"
        >
          <PhoneCall size={16} className="text-amber-400" />
          <span className="hidden md:inline">Call: 9655148000</span>
        </a>

        {/* WhatsApp Order Button */}
        <a
          href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex!%20I%20want%20to%20place%20an%20order%20or%20enquire%20about%20wholesale%20stock."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-3 rounded-full font-black text-xs uppercase tracking-wider shadow-2xl hover:scale-105 transition-all shadow-green-600/40"
          title="Order via WhatsApp: 9655147000"
        >
          <MessageCircle size={18} />
          <span>WhatsApp Order (9655147000)</span>
        </a>
      </div>
    </div>
  );
}
