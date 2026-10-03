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
        animate={
          !isHovered && autoFloat
            ? {
                rotateX: [0, 2.5, 0, -2.5, 0],
                rotateY: [0, -2, 0, 2, 0],
                y: [0, -3, 0, 2, 0]
              }
            : {
                rotateX,
                rotateY,
                y: isHovered ? -4 : 0,
                scale: isHovered ? 1.02 : 1
              }
        }
        transition={
          !isHovered && autoFloat
            ? { duration: 5, repeat: Infinity, ease: 'easeInOut' }
            : { type: 'spring', stiffness: 350, damping: 25 }
        }
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative"
      >
        {children}
        
        {/* Subtle 3D dynamic gloss reflection */}
        {isHovered && (
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${50 + rotateY * 3}% ${50 - rotateX * 3}%, rgba(255,255,255,0.2) 0%, transparent 65%)`
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
