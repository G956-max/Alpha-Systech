import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, MessageCircle, Heart, Store, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';

export default function BottomNav() {
  const location = useLocation();
  const { wishlistItems } = useStore();
  const currentPath = location.pathname;

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
      isActive: currentPath === '/'
    },
    {
      name: 'Categories',
      path: '/categories',
      icon: LayoutGrid,
      isActive: currentPath === '/categories' || currentPath.startsWith('/category/')
    },
    {
      name: 'Order',
      path: 'https://wa.me/919655147000?text=Vanakkam%20Sri%20Aadhi%20Nayaga%20Tex,%20I%20want%20to%20place%20an%20order.',
      icon: MessageCircle,
      isExternal: true,
      highlight: true
    },
    {
      name: 'Wishlist',
      path: '/wishlist',
      icon: Heart,
      badge: wishlistItems.length > 0 ? wishlistItems.length : null,
      isActive: currentPath === '/wishlist'
    },
    {
      name: 'Shop',
      path: '/contact',
      icon: Store,
      isActive: currentPath === '/contact'
    }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 mx-auto w-full max-w-[480px] z-50 bg-white/95 backdrop-blur-xl shadow-[0_-6px_30px_rgba(6,78,59,0.18)]">
      {/* Continuous Animated Top Laser Line */}
      <div className="h-[2px] w-full animate-laser" />

      <div className="grid grid-cols-5 h-16 items-center px-1 relative">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isExternal) {
            return (
              <div key={item.name} className="flex justify-center items-center relative -top-4">
                <motion.a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.88 }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="flex flex-col items-center justify-center group relative cursor-pointer"
                >
                  {/* Outer Expanding Multi-layer Radar Shockwave Rings */}
                  <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />
                  <motion.span 
                    animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0.2, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-400 via-[#25D366] to-amber-300 blur-xs pointer-events-none"
                  />

                  {/* 3D Elevated Disc */}
                  <div 
                    className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#024e3b] via-[#059669] via-[#25D366] to-[#86efac] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.55),0_3px_10px_rgba(0,0,0,0.25)] border-[3px] border-white ring-2 ring-emerald-300/80 relative z-10 overflow-hidden"
                  >
                    {/* Glossy Top Glass Reflection */}
                    <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-full pointer-events-none" />

                    {/* Animated Wiggling WhatsApp Chat Icon */}
                    <motion.div
                      animate={{
                        rotate: [0, -10, 10, -6, 6, 0],
                        scale: [1, 1.08, 1]
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                        ease: 'easeInOut'
                      }}
                    >
                      <Icon size={25} className="fill-white/25 drop-shadow-md text-white" />
                    </motion.div>

                    {/* Online Live Beacon Dot */}
                    <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 border border-white" />
                    </span>
                  </div>

                  {/* Pulsing Animated Label */}
                  <div className="flex items-center gap-1 mt-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                    <span className="text-[10px] font-black text-emerald-950 uppercase tracking-wider">
                      Order
                    </span>
                  </div>
                </motion.a>
              </div>
            );
          }

          return (
            <motion.div
              key={item.name}
              whileTap={{ scale: 0.88 }}
              className="flex justify-center"
            >
              <Link
                to={item.path}
                className={`flex flex-col items-center justify-center py-1.5 w-full transition-all relative ${
                  item.isActive ? 'text-emerald-800 font-extrabold' : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                {/* Active Spotlight Pod */}
                <motion.div 
                  className={`relative flex flex-col items-center px-3 py-1 rounded-2xl transition-colors ${
                    item.isActive ? 'bg-emerald-50/90 border border-emerald-200/80 shadow-xs' : ''
                  }`}
                  animate={item.isActive ? { y: -2 } : { y: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                >
                  <div className="relative">
                    {item.name === 'Wishlist' && item.badge ? (
                      <motion.div
                        animate={{ scale: [1, 1.18, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Icon
                          size={20}
                          className={`transition-all duration-300 ${
                            item.isActive 
                              ? 'text-rose-600 fill-rose-100 stroke-[2.4]' 
                              : 'text-slate-600 stroke-[1.8]'
                          }`}
                        />
                      </motion.div>
                    ) : (
                      <Icon
                        size={20}
                        className={`transition-all duration-300 ${
                          item.isActive 
                            ? 'text-emerald-700 stroke-[2.4] scale-110 drop-shadow-xs' 
                            : 'text-slate-600 stroke-[1.8]'
                        }`}
                      />
                    )}

                    {/* Wishlist Badge with Spring Animation */}
                    {item.badge !== undefined && item.badge !== null && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.25, 1] }}
                        transition={{ duration: 0.4 }}
                        className="absolute -top-1.5 -right-2.5 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs border border-white"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </div>

                  <span className={`text-[10px] mt-0.5 tracking-tight ${
                    item.isActive ? 'font-black text-emerald-950' : 'font-semibold text-slate-600'
                  }`}>
                    {item.name}
                  </span>

                  {/* Active Indicator Underline */}
                  {item.isActive && (
                    <motion.span 
                      layoutId="bottomNavIndicator"
                      className="w-4 h-1 bg-gradient-to-r from-emerald-600 to-green-500 rounded-full mt-0.5 shadow-xs"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </nav>
  );
}

