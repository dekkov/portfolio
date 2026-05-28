import { motion, useInView, useReducedMotion } from "motion/react";
import { Fragment, useRef, type ReactNode } from "react";

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div" | "p";
  lineStagger?: number;
  wordStagger?: number;
  delay?: number;
  italicWords?: number[];
  lineSplit?: string | RegExp;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function SplitReveal({
  children,
  className,
  as: As = "h2",
  lineStagger = 0.08,
  wordStagger = 0.05,
  delay = 0,
  italicWords = [],
  lineSplit = "/",
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  if (reduce) {
    return <As className={className}>{children.replace(/\//g, " ")}</As>;
  }

  const lines = children.split(lineSplit).map((s) => s.trim()).filter(Boolean);
  let runningWordIdx = 0;

  const Tag = As as "h2";

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {lines.map((line, li) => {
        const words = line.split(/\s+/);
        return (
          <span key={li} className="block">
            {words.map((w, wi) => {
              const isItalic = italicWords.includes(runningWordIdx);
              const idx = runningWordIdx;
              runningWordIdx++;
              return (
                <Fragment key={wi}>
                  <span className="inline-block overflow-hidden align-bottom pb-[0.12em]">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "115%" }}
                      animate={inView ? { y: "0%" } : { y: "115%" }}
                      transition={{
                        duration: 1,
                        ease,
                        delay: delay + li * lineStagger + idx * wordStagger,
                      }}
                    >
                      {isItalic ? <em className="italic">{w}</em> : (w as ReactNode)}
                    </motion.span>
                  </span>
                  {wi < words.length - 1 && " "}
                </Fragment>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
