import React from 'react';
import { motion } from 'motion/react';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
}

export const SCROLL_VIEWPORT = {
  once: false,
  amount: 'some' as const,
  margin: '-16px 0px -24px 0px',
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  distance = 28,
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'scale':
        return { opacity: 0, scale: 0.96, y: 16 };
      case 'up':
      default:
        return { opacity: 0, y: distance };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={SCROLL_VIEWPORT}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
