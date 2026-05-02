import type { Transition, Variants } from 'framer-motion';

export const pageVariants: Variants = {
  initial:  { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0 },
  exit:     { opacity: 0, y: -24 },
};

export const pageTransition: Transition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1], // custom ease-out-expo
};

// Stagger container for lists (product grids, etc.)
export const staggerContainer: Variants = {
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

// Slide in from right (drawer / cart panel)
export const slideInRight: Variants = {
  initial: { x: '100%' },
  animate: { x: 0,      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { x: '100%', transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] } },
};

// Scale up (modals)
export const scaleUp: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1,    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};
