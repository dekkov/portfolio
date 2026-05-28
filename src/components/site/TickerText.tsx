import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div" | "p";
  /** Total scramble duration per letter, ms */
  duration?: number;
  /** Delay between each letter starting, ms */
  letterStagger?: number;
};

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=/<>";

export function TickerText({
  children,
  className,
  as: As = "h2",
  duration = 500,
  letterStagger = 35,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [out, setOut] = useState<string>(() =>
    children.split("").map((c) => (c.trim() ? randomGlyph() : c)).join(""),
  );

  useEffect(() => {
    if (reduce) {
      setOut(children);
      return;
    }
    if (!inView) return;

    const chars = children.split("");
    const settleAt = chars.map((_, i) => i * letterStagger + duration);
    const startedAt = performance.now();
    let raf = 0;

    const tick = (t: number) => {
      const elapsed = t - startedAt;
      const next = chars
        .map((c, i) => {
          if (!c.trim()) return c;
          if (elapsed >= settleAt[i]) return c;
          if (elapsed < i * letterStagger) return " ".repeat(0) || randomGlyph();
          return randomGlyph();
        })
        .join("");
      setOut(next);

      const done = elapsed >= settleAt[settleAt.length - 1];
      if (!done) raf = requestAnimationFrame(tick);
      else setOut(children);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, children, duration, letterStagger, reduce]);

  const Tag = As as "h2";
  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      <span aria-hidden>{out}</span>
      <span className="sr-only">{children}</span>
    </Tag>
  );
}

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}
