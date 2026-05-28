import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function SectionReveal({
  children,
  delay = 0,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "header" | "li" | "h2" | "h3" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[As as "div"];
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
