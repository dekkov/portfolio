import { motion } from "motion/react";
import { SplitReveal } from "./SplitReveal";

const ease = [0.22, 1, 0.36, 1] as const;

const clients = ["FAASR", "PROSPERITY", "CLAUDE HACK", "BGA", "CLOUDFLARE", "SUPABASE"];

export function Hero() {
  return (
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
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
            Available · June 2026
          </span>
          <span className="label opacity-60">Software Engineer · Full-Stack & AI</span>
          <span className="label opacity-60 ml-auto">Remote · Seattle, WA</span>
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
            className="hidden md:block w-[180px] h-[220px] rounded-2xl overflow-hidden glass"
          >
            <div className="w-full h-full bg-gradient-to-br from-[oklch(0.85_0.05_220)] to-[oklch(0.88_0.06_160)]" />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.6 }}
          className="mt-10 max-w-xl text-base md:text-lg leading-relaxed"
        >
          Chill guy in Seattle building <em className="italic">polished, interactive</em>
          {" "}products across full-stack, AI, and serverless.
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
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium hover:border-foreground/60 transition"
          >
            See selected work
          </a>
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
            <div className="text-sm opacity-70">Remote-friendly</div>
          </div>
          <div>
            <div className="label opacity-60 mb-2">Focus</div>
            <div className="text-sm">Full-Stack · AI · Serverless</div>
            <div className="text-sm opacity-70">Web · Cloud</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 opacity-50">
          {clients.map((c) => (
            <span key={c} className="label text-xs">{c}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
