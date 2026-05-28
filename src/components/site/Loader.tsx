import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const SESSION_KEY = "portfolio:loader-played";

export function Loader() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(true);
  const [progress, setProgress] = useState(0);

  // Decide whether to play
  useEffect(() => {
    if (reduce) {
      setShown(false);
      return;
    }
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        setShown(false);
        return;
      }
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode */
    }
  }, [reduce]);

  // Progress driver — ~2.2s with eased curve so it feels like a real preload
  useEffect(() => {
    if (!shown) return;
    const duration = 2200;
    const start = performance.now();
    let raf = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 2.2);
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setProgress(ease(p));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShown(false), 320);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown]);

  // Lock scroll while shown
  useEffect(() => {
    if (!shown) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [shown]);

  const pct = Math.round(progress * 100);

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] bg-background text-foreground flex flex-col"
          aria-hidden
        >
          {/* top meta row */}
          <div className="flex items-center justify-between px-6 md:px-10 py-5">
            <span className="label opacity-70">Hoang Tran</span>
            <span className="label opacity-70">Portfolio · 2026</span>
          </div>

          {/* center: percent label + progress bar */}
          <div className="flex-1 flex flex-col justify-end px-6 md:px-10 pb-10 md:pb-14">
            <div className="flex items-baseline justify-between mb-4">
              <span className="label opacity-60">Loading experience</span>
              <span className="label tabular-nums">
                {String(pct).padStart(3, "0")} / 100
              </span>
            </div>

            <div className="relative h-px w-full bg-foreground/15 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-foreground"
                style={{ width: `${pct}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            <div className="hairline opacity-20 mt-10" />
            <div className="flex items-center justify-between label opacity-50 mt-3">
              <span>Full-Stack · AI · Serverless</span>
              <span>Made with care</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
