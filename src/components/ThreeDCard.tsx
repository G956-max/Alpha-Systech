import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  autoFloat?: boolean;
  onClick?: () => void;
}

export default function ThreeDCard({
  children,
  className = '',
  depth = 12,
  autoFloat = true,
  onClick
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt angles based on pointer position relative to center
    const tiltX = -((y - centerY) / centerY) * depth;
    const tiltY = ((x - centerX) / centerX) * depth;
    
    setRotateX(tiltX);
    setRotateY(tiltY);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      className={`perspective-1000 ${className}`}
      style={{ touchAction: 'manipulation' }}
    >
      <motion.div
        whileTap={{ 
          scale: 0.94, 
          rotateX: 4, 
          transition: { type: 'spring', stiffness: 450, damping: 18 } 
        }}
        animate={
          !isHovered && autoFloat
            ? {
                rotateX: [0, 4.5, 0, -4.5, 0],
                rotateY: [0, -3.5, 0, 3.5, 0],
                y: [0, -5, 0, 3, 0]
              }
            : {
                rotateX,
                rotateY,
                y: isHovered ? -5 : 0,
                scale: isHovered ? 1.03 : 1
              }
        }
        transition={
          !isHovered && autoFloat
            ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
            : { type: 'spring', stiffness: 380, damping: 22 }
        }
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        className="w-full h-full relative gpu-accel"
      >
        {children}
        
        {/* Dynamic 3D gloss reflection (works on hover and mobile) */}
        {isHovered ? (
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${50 + rotateY * 3}% ${50 - rotateX * 3}%, rgba(255,255,255,0.25) 0%, transparent 65%)`
            }}
          />
        ) : (
          /* Subtle mobile ambient light sheen */
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none z-20 opacity-30 overflow-hidden"
          >
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-[shimmer-sweep_4s_infinite]" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
