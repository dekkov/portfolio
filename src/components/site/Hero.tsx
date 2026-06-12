import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SplitReveal } from "./SplitReveal";
import { GalleryLightbox, photos } from "./GalleryLightbox";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const reduce = useReducedMotion();
  return (
    <>
      <section id="top" className="relative min-h-screen px-6 md:px-10 pt-32 pb-16 flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full">
          {/* status row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-12 md:mb-20"
          >
            <span className="label flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Available · June 2026
            </span>
            <span className="label opacity-60">Software Engineer · Full-Stack & AI</span>
            <span className="label opacity-60 ml-auto">Open to relocation · Seattle, WA</span>
          </motion.div>

          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end">
            <SplitReveal
              as="h1"
              className="font-display text-[18vw] md:text-[11vw] leading-[0.88] tracking-tight"
              italicWords={[3]}
            >
              {"Ambitious, / AI Optimist, / ​shipping ideas."}
            </SplitReveal>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.5 }}
              className="hidden md:block relative"
            >
              {/* Animated arrow hint — hand-drawn pointer aimed at the gallery card */}
              <motion.div
                className="absolute -top-16 -left-[205px] flex items-center gap-3 pointer-events-none select-none"
                animate={reduce ? undefined : { y: [0, -3, 0], rotate: [-1, 1, -1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="label text-xs whitespace-nowrap">peek inside</span>
                <motion.svg
                  width="112"
                  height="76"
                  viewBox="0 0 112 76"
                  fill="none"
                  className="text-foreground -mb-3 overflow-visible"
                >
                  <motion.path
                    d="M4 22 C 34 -4, 74 -2, 96 60"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    fill="none"
                    initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.9 }}
                  />
                  <motion.path
                    d="M-14 -6 L0 0 L-14 6"
                    transform="translate(96 60) rotate(70.5)"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 2.0 }}
                  />
                </motion.svg>
              </motion.div>

              {/* Stacked card hint */}
              <div className="relative w-[300px] h-[380px] group">
                {/* Radiating sparkle lines */}
                <motion.svg
                  aria-hidden
                  className="absolute inset-0 w-full h-full overflow-visible pointer-events-none text-foreground/70"
                  viewBox="0 0 180 220"
                  initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 2.2 }}
                >
                  {[
                    // [x1,y1,x2,y2]
                    [90, -14, 90, -34],
                    [198, -10, 214, -26],
                    [206, 110, 230, 110],
                    [198, 230, 214, 246],
                    [90, 234, 90, 254],
                    [-18, 230, -34, 246],
                    [-26, 110, -50, 110],
                  ].map(([x1, y1, x2, y2], i) => (
                    <motion.line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={
                        reduce ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }
                      }
                      animate={
                        reduce
                          ? { pathLength: 1, opacity: 0.7 }
                          : { pathLength: [0, 1, 1], opacity: [0, 0.9, 0] }
                      }
                      transition={{
                        duration: 0.75,
                        repeat: Infinity,
                        repeatDelay: 1.6,
                        delay: 2.4,
                        times: [0, 0.45, 1],
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </motion.svg>

                <div className="absolute inset-0 rounded-2xl bg-foreground/10 rotate-[6deg] translate-x-3 translate-y-2 transition-transform duration-500 group-hover:rotate-[10deg]" />
                <div className="absolute inset-0 rounded-2xl bg-foreground/15 rotate-[-4deg] -translate-x-2 translate-y-1 transition-transform duration-500 group-hover:rotate-[-8deg]" />
                <motion.button
                  type="button"
                  onClick={() => setGalleryOpen(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full h-full rounded-2xl overflow-hidden glass cursor-pointer block"
                  aria-label="Open photo gallery"
                >
                  <img
                    src={photos[0].src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                  <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-background">
                    <span className="label text-xs">Gallery</span>
                    <span className="label text-xs">{photos.length} ↗</span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
            className="mt-10 max-w-xl text-base md:text-lg leading-relaxed"
          >
            Hi there, please <em className="italic">enjoy your stay!</em> Also, remember to check out
            the gallery to your right!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.75 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Start a project
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium hover:border-foreground/60 transition"
            >
              See selected work
            </a>
            <button
              type="button"
              onClick={() => setGalleryOpen(true)}
              className="md:hidden inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium hover:border-foreground/60 transition"
            >
              View gallery →
            </button>
          </motion.div>
        </div>

        {/* stack / education strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease, delay: 0.9 }}
          className="max-w-7xl mx-auto w-full mt-20"
        >
          <div className="hairline opacity-30 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="label opacity-60 mb-2">Stack</div>
              <div className="text-sm">React · TypeScript · Next.js</div>
              <div className="text-sm">Python · R · Cloudflare · Supabase</div>
            </div>
            <div>
              <div className="label opacity-60 mb-2">Education</div>
              <div className="text-sm">Oregon State University</div>
              <div className="text-sm opacity-70">BSc Computer Science</div>
            </div>
            <div>
              <div className="label opacity-60 mb-2">Based</div>
              <div className="text-sm">Seattle, WA</div>
              <div className="text-sm opacity-70">Open to relocation</div>
            </div>
            <div>
              <div className="label opacity-60 mb-2">Focus</div>
              <div className="text-sm">Full-Stack · AI · Serverless</div>
              <div className="text-sm opacity-70">Web · Cloud</div>
            </div>
          </div>
        </motion.div>
      </section>
      <GalleryLightbox open={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </>
  );
}
