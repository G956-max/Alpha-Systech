import { MessageCircle, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloatingWhatsAppCall() {
  return (
    <div className="fixed bottom-24 right-3 z-40 flex flex-col items-end gap-2 pointer-events-auto select-none">
      {/* WhatsApp Quick Order Floating Pill with Floating Micro-animation */}
      <motion.a
        href="https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex!%20I%20want%20to%20place%20an%20order%20or%20enquire%20about%20wholesale%20stock."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ 
          y: [0, -5, 0],
          opacity: 1
        }}
        transition={{ 
          y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 0.4 }
        }}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2.5 rounded-full font-bold text-xs shadow-xl shadow-emerald-700/35 border border-white/40 transition-colors"
        title="WhatsApp Order: 9655147000"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <MessageCircle size={16} />
        <span className="text-[11px] font-black tracking-wide">WhatsApp</span>
      </motion.a>

      {/* Quick Call Button */}
      <motion.a
        href="tel:9655148000"
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.08 }}
        className="flex items-center justify-center w-10 h-10 bg-emerald-950/95 text-white rounded-full shadow-lg border border-emerald-500/40 hover:bg-black transition-colors"
        title="Call Hotline: 9655148000"
      >
        <PhoneCall size={16} className="text-emerald-300" />
      </motion.a>
    </div>
  );
}
