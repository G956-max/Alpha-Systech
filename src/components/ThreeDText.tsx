import React from 'react';
import { motion } from 'motion/react';

interface ThreeDTextProps {
  text: string;
  variant?: 'emerald' | 'gold' | 'white';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span';
  animated?: boolean;
}

export default function ThreeDText({
  text,
  variant = 'emerald',
  className = '',
  as = 'h1',
  animated = true
}: ThreeDTextProps) {
  const shadowClass = 
    variant === 'emerald' ? 'text-3d-emerald' : 
    variant === 'gold' ? 'text-3d-gold' : 
    'text-3d-white';

  const gradientClass = 
    variant === 'emerald' ? 'bg-gradient-to-r from-emerald-950 via-emerald-600 via-green-400 to-emerald-900' :
    variant === 'gold' ? 'bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600' :
    'bg-gradient-to-r from-white via-emerald-100 to-green-200';

  const Tag = as;

  return (
    <div className="perspective-800 inline-block">
      <motion.div
        animate={
          animated
            ? {
                rotateX: [0, 6, 0, -6, 0],
                rotateY: [0, -5, 0, 5, 0],
              }
            : undefined
        }
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="inline-block"
      >
        <Tag 
          className={`font-serif font-black tracking-tight ${shadowClass} ${gradientClass} bg-clip-text text-transparent animate-gradient-text ${className}`}
          style={{ transform: 'translateZ(15px)' }}
        >
          {text}
        </Tag>
      </motion.div>
    </div>
  );
}
