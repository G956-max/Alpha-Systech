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
    }, 400);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div 
          key={navKey}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed top-0 left-0 right-0 z-[100] pointer-events-none flex justify-center"
        >
          <div className="w-full max-w-[480px] relative h-[4px] overflow-hidden bg-emerald-950/20">
            {/* Glowing Laser Sweep */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                duration: 0.35, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="w-full h-full bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 shadow-[0_0_15px_#10b981,0_0_8px_#f59e0b]"
            />
            {/* Pulsing leading spark */}
            <motion.div
              initial={{ left: '0%' }}
              animate={{ left: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 w-12 h-full bg-white blur-[2px]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
