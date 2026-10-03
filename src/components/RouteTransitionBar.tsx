import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function RouteTransitionBar() {
  const location = useLocation();
  const [navKey, setNavKey] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setNavKey(k => k + 1);
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div 
          key={navKey}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed top-0 left-0 right-0 z-[100] pointer-events-none flex justify-center"
        >
          <div className="w-full max-w-[480px] relative h-[4.5px] overflow-hidden bg-emerald-950/30">
            {/* Glowing Laser Sweep */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                duration: 0.42, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="w-full h-full bg-gradient-to-r from-emerald-400 via-amber-300 via-yellow-200 to-green-400 shadow-[0_0_25px_#10b981,0_0_15px_#fbbf24,0_2px_10px_#34d399]"
            />
            {/* Pulsing leading spark */}
            <motion.div
              initial={{ left: '0%' }}
              animate={{ left: '100%' }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 w-16 h-full bg-white blur-[2px] shadow-[0_0_12px_#ffffff]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
