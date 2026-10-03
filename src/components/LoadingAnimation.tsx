import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function PageLoadingSpinner({ message = 'Loading Erode Stock...' }: { message?: string }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      {/* Animated Loom / Thread Spinner */}
      <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
        {/* Outer rotating gradient ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-500 border-r-emerald-300"
        />

        {/* Counter-rotating inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border border-dashed border-emerald-400/50"
        />

        {/* Pulsing center emblem */}
        <motion.div
          animate={{ scale: [0.85, 1.1, 0.85] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-700 to-green-400 text-white font-serif font-black flex items-center justify-center text-sm shadow-sm"
        >
          A
        </motion.div>
      </div>

      <motion.p
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-xs font-bold text-emerald-800 flex items-center gap-1.5"
      >
        <Sparkles size={13} className="text-emerald-600" />
        <span>{message}</span>
      </motion.p>
      <span className="text-[10px] text-gray-400 mt-0.5">Sri Aadhi Nayaga Tex Wholesale</span>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 w-full">
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className="bg-white rounded-2xl border border-emerald-50 p-2 overflow-hidden shadow-xs space-y-2 relative"
        >
          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-emerald-100/30 to-transparent" />

          {/* Image skeleton */}
          <div className="aspect-[3/4] w-full bg-emerald-50/60 rounded-xl animate-pulse" />

          {/* Details skeleton */}
          <div className="space-y-1.5 pt-1">
            <div className="h-2.5 bg-emerald-50 rounded w-1/3 animate-pulse" />
            <div className="h-3.5 bg-emerald-100/60 rounded w-4/5 animate-pulse" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-4 bg-emerald-100/80 rounded w-1/2 animate-pulse" />
              <div className="w-6 h-6 bg-emerald-200/60 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
