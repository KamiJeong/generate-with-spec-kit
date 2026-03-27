export const motion = {
  duration: {
    fast: 0.15,
    normal: 0.25,
    slow: 0.4
  },
  easing: {
    ease: [0.4, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    spring: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
} as const;
