"use client";

import { motion, useReducedMotion } from "motion/react";

type RevealVariant = "up" | "fade" | "scale" | "blur" | "diagonal";

const variants: Record<
  RevealVariant,
  { initial: Record<string, string | number>; animate: Record<string, string | number> }
> = {
  up: { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } },
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  scale: { initial: { opacity: 0, y: 14, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 } },
  blur: {
    initial: { opacity: 0, y: 12, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  diagonal: {
    initial: {
      opacity: 0,
      y: 28,
      rotate: -0.4,
      clipPath: "polygon(0 18%, 100% 0%, 100% 100%, 0% 100%)",
      filter: "blur(6px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      rotate: 0,
      clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
      filter: "blur(0px)",
    },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}) {
  const reduce = useReducedMotion();
  const motionVariant = variants[variant];

  return (
    <motion.div
      className={className}
      initial={reduce ? false : motionVariant.initial}
      whileInView={motionVariant.animate}
      viewport={{ once: true, margin: "-60px", amount: 0.2 }}
      transition={{
        duration: variant === "diagonal" ? 0.75 : 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
