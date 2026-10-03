import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, AlertCircle, WifiOff } from 'lucide-react';
import { OFFLINE_VIDEO_DATA_URI } from '../assets/offlineVideoBase64';

export default function OfflineOverlay() {
  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? !navigator.onLine : false;
  });
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [retryMessage, setRetryMessage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setRetryMessage(null);
    };

    const handleOffline = () => {
      setIsOffline(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOffline && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [isOffline]);

  const handleRetry = async () => {
    setIsRetrying(true);
    setRetryMessage(null);

    // Give visual tactile feedback
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (navigator.onLine) {
      setIsOffline(false);
      setIsRetrying(false);
      setRetryMessage(null);
    } else {
      setIsRetrying(false);
      setRetryMessage('Still offline. Please check your connection.');
      setTimeout(() => {
        setRetryMessage(null);
      }, 3500);
    }
  };

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          key="offline-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          style={{ touchAction: 'manipulation' }}
        >
          <motion.div
            initial={{ scale: 0.92, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl border border-emerald-100 p-5 flex flex-col items-center text-center overflow-hidden relative"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-green-500" />

            {/* Offline Animation Video Display - Guaranteed 100% Offline via Embedded High-Quality Video */}
            <div className="w-full aspect-[736/492] bg-white rounded-2xl overflow-hidden border border-emerald-100 flex items-center justify-center relative mb-4 shadow-xs">
              <video
                ref={videoRef}
                src={OFFLINE_VIDEO_DATA_URI}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                preload="auto"
                className="w-full h-full object-contain"
              >
                <source src={OFFLINE_VIDEO_DATA_URI} type="video/mp4" />
                <source src="/offline-animation-enhanced.mp4" type="video/mp4" />
                {/* Visual Fallback if browser forbids video playback */}
                <div className="flex flex-col items-center justify-center p-6 text-emerald-800">
                  <WifiOff size={32} className="text-emerald-600 mb-2" />
                  <span className="text-xs font-bold text-gray-500">Offline Mode</span>
                </div>
              </video>
            </div>

            {/* Title & Description */}
            <h2 className="text-lg font-serif font-black text-slate-900 tracking-tight leading-snug mb-1">
              No Internet Connection
            </h2>

            <p className="text-xs text-gray-600 leading-relaxed mb-5 max-w-[280px]">
              Please check your network connection and try again.
            </p>

            {/* Retry Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleRetry}
              disabled={isRetrying}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-75"
            >
              <RefreshCw
                size={16}
                className={isRetrying ? 'animate-spin' : ''}
              />
              <span>{isRetrying ? 'Checking Connection...' : 'Retry'}</span>
            </motion.button>

            {/* Retry Feedback Message */}
            <AnimatePresence>
              {retryMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="mt-3.5 flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl shadow-xs"
                >
                  <AlertCircle size={13} className="shrink-0 text-amber-600" />
                  <span>{retryMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
