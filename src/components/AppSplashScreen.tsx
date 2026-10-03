import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Truck, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

interface AppSplashScreenProps {
  onComplete?: () => void;
}

export default function AppSplashScreen({ onComplete }: AppSplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const loadingPhrases = [
    'Connecting to Erode Wholesale Market...',
    'Loading Handloom Sarees & Pure Cotton...',
    'Preparing Direct Weaver Wholesale Rates...',
    'Daily All-India Transport Ready!'
  ];

  useEffect(() => {
    // Smooth progress counter animation (takes ~1.8 seconds)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 450);
          return 100;
        }
        const increment = Math.floor(Math.random() * 6) + 4;
        const next = prev + increment;
        return next > 100 ? 100 : next;
      });
    }, 70);

    const textInterval = setInterval(() => {
      setLoadingTextIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 550);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-[#011c15] via-[#064e3b] to-[#033a2d] text-white overflow-hidden select-none font-sans perspective-1000"
    >
      {/* Skip Button in Top Right */}
      <button
        onClick={onComplete}
        className="absolute top-4 right-4 z-20 text-[11px] font-bold text-emerald-200/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
      >
        Skip <ChevronRight size={13} />
      </button>

      {/* 3D Background Floating Ambient Light Spheres */}
      <motion.div 
        animate={{ 
          scale: [1, 1.35, 1],
          rotate: [0, 90, 0],
          opacity: [0.25, 0.5, 0.25]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1.3, 1, 1.3],
          rotate: [0, -90, 0],
          opacity: [0.2, 0.45, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-300/25 rounded-full blur-3xl pointer-events-none"
      />

      {/* Floating 3D Sparkle Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: 50, 
            x: (i % 2 === 0 ? 1 : -1) * (i * 22), 
            opacity: 0 
          }}
          animate={{ 
            y: [-30, -140], 
            opacity: [0, 0.9, 0],
            scale: [0.6, 1.3, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 2.2 + i * 0.3, 
            repeat: Infinity, 
            delay: i * 0.25,
            ease: 'easeOut'
          }}
          className="absolute text-emerald-300/70 pointer-events-none"
        >
          <Sparkles size={14 + (i % 3) * 6} />
        </motion.div>
      ))}

      {/* Main 3D Animated Card Box */}
      <div className="relative z-10 w-full max-w-[340px] px-6 flex flex-col items-center text-center">
        
        {/* 3D Rotating Brand Emblem */}
        <div className="relative mb-6 perspective-1000">
          
          {/* Outer Pulsing Rotating Dashed Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-4 rounded-3xl border-2 border-dashed border-emerald-300/50"
          />

          {/* Inner Counter-Rotating Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-2 rounded-2xl border border-emerald-400/40"
          />

          {/* Glowing Aura Ring */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.85, 0.4]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-emerald-400 via-green-300 to-amber-300 blur-lg opacity-60"
          />

          {/* Central 3D Rotating Logo Monogram Box */}
          <motion.div
            animate={{ 
              rotateY: [0, 360],
              rotateX: [0, 15, -15, 0]
            }}
            transition={{ 
              rotateY: { duration: 6, repeat: Infinity, ease: 'linear' },
              rotateX: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="relative w-22 h-22 rounded-2xl bg-gradient-to-tr from-emerald-950 via-emerald-800 to-emerald-500 border-2 border-emerald-300/80 shadow-2xl flex items-center justify-center preserve-3d"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.span 
              animate={{ 
                textShadow: [
                  '0 0 10px rgba(167,243,208,0.5)',
                  '0 0 30px rgba(52,211,153,0.95)',
                  '0 0 10px rgba(167,243,208,0.5)'
                ]
              }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="font-serif font-black text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white via-emerald-100 to-emerald-300 drop-shadow-lg"
            >
              A
            </motion.span>
          </motion.div>
        </div>

        {/* 3D Animated Text Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-1.5 mb-5"
        >
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-400/20 via-green-400/30 to-emerald-400/20 border border-emerald-300/40 px-3 py-0.5 rounded-full text-emerald-200 text-[10px] font-black uppercase tracking-widest shadow-sm">
            <Sparkles size={11} className="text-emerald-300" /> ஈரோடு • Erode Wholesale Market
          </div>

          <h1 className="text-2xl font-serif font-black tracking-tight leading-tight text-white drop-shadow-md">
            SRI AADHI NAYAGA
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-green-100 to-amber-200 text-xl font-sans font-extrabold tracking-wider animate-gradient-text">
              TEX • WHOLESALE
            </span>
          </h1>

          <p className="text-[11px] text-emerald-200/90 font-medium tracking-wide">
            Direct Weaver &amp; Manufacturer Rates
          </p>
        </motion.div>

        {/* Dynamic Progress Bar with Glowing Shimmer */}
        <div className="w-full space-y-2 mb-4">
          <div className="flex items-center justify-between text-[11px] font-bold text-emerald-200">
            <span className="truncate pr-2">{loadingPhrases[loadingTextIndex]}</span>
            <span className="text-emerald-300 font-mono font-black">{progress}%</span>
          </div>

          <div className="w-full h-2.5 bg-emerald-950/90 rounded-full overflow-hidden border border-emerald-400/40 p-0.5 shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-200 relative overflow-hidden shadow-sm"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            >
              {/* Shimmer light beam sweep */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent w-24"
              />
            </motion.div>
          </div>
        </div>

        {/* 3D Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3 text-[10px] text-emerald-200/90 pt-1"
        >
          <span className="flex items-center gap-1 font-semibold">
            <ShieldCheck size={12} className="text-emerald-400" /> Direct Weave
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-semibold">
            <Truck size={12} className="text-emerald-400" /> All-India Parcel
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-semibold">
            <CheckCircle2 size={12} className="text-emerald-400" /> Daily Bales
          </span>
        </motion.div>

      </div>
    </motion.div>
  );
}
