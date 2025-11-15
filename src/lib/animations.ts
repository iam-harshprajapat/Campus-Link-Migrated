import { Variants } from "framer-motion"

export const appear: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 20,
    },
  },
}

export const fade_bottom: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1], // smooth curve (Apple/Linear-style)
    },
  },
  exit: {
    opacity: 0,
    y: -60,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}



export const staggerParent: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,   // tighter + smoother
      delayChildren: 0.05,
    },
  },
}

