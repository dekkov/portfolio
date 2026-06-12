import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import icpcImg from "@/assets/icpc2026.jpg";
import vibeImg from "@/assets/vibelol.jpg";
import cassAwardImg from "@/assets/cassaward.jpg";
import cassHangoutImg from "@/assets/casshangout.jpg";

export const photos = [
  {
    src: icpcImg,
    alt: "OSU ICPC 2026 team",
    caption: "OSU ICPC 2026 team",
  },
  {
    src: vibeImg,
    alt: "Watching anime at the office",
    caption: "Watching anime at the office",
  },
  {
    src: cassAwardImg,
    alt: "Receiving the CASS Uber Newbie Award",
    caption: "Receiving the CASS Uber Newbie Award",
  },
  {
    src: cassHangoutImg,
    alt: "Hanging out with CASS at a Korean restaurant",
    caption: "Hanging out with CASS at a Korean restaurant",
  },
];

type Props = {
  open: boolean;
  onClose: () => void;
  initialIndex?: number;
};

export function GalleryLightbox({ open, onClose, initialIndex = 0 }: Props) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const go = (next: number, dir: number) => {
    setDirection(dir);
    setIndex(((next % photos.length) + photos.length) % photos.length);
  };
  const prev = () => go(index - 1, -1);
  const next = () => go(index + 1, 1);

  useEffect(() => {
    if (!open) return;
    setIndex(initialIndex);
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80 || info.velocity.x < -400) next();
    else if (info.offset.x > 80 || info.velocity.x > 400) prev();
  };

  const photo = photos[index];

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <button
            aria-label="Close gallery"
            onClick={onClose}
            className="absolute inset-0 bg-background/40 backdrop-blur-xl"
          />

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-xl hover:scale-105 transition"
          >
            ×
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 z-10 label opacity-70">
            {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </div>

          {/* Prev / Next */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full glass flex items-center justify-center hover:scale-105 transition"
          >
            ←
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full glass flex items-center justify-center hover:scale-105 transition"
          >
            →
          </button>

          {/* Slide */}
          <div className="relative z-[5] w-full max-w-5xl flex flex-col items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? -60 : 60 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={onDragEnd}
                className="cursor-grab active:cursor-grabbing"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  draggable={false}
                  className="max-h-[72vh] w-auto max-w-full rounded-2xl shadow-2xl select-none"
                />
              </motion.div>
            </AnimatePresence>
            <p className="mt-5 label opacity-80 text-center">{photo.caption}</p>
          </div>

          {/* Thumbnails */}
          <div className="relative z-[5] mt-6 flex gap-2 max-w-full overflow-x-auto px-2">
            {photos.map((p, i) => (
              <button
                key={p.src}
                onClick={() => go(i, i > index ? 1 : -1)}
                aria-label={`View ${p.alt}`}
                className={`shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden transition-all ${
                  i === index ? "ring-2 ring-foreground opacity-100" : "opacity-50 hover:opacity-90"
                }`}
              >
                <img src={p.src} alt="" className="w-full h-full object-cover" draggable={false} />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
