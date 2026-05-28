import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionReveal } from "./SectionReveal";
import { TickerText } from "./TickerText";

const faqs = [
  { q: "How do you scope a project?", a: "Send me your brief and I'll scope it out and ask the right questions. You approve before any work starts — no surprises mid-project." },
  { q: "What's your typical timeline?", a: "It depends on scope. A focused marketing site sits in a different bracket to a heavy motion or 3D build. Most projects land between 3 and 10 weeks." },
  { q: "Do you work with agencies?", a: "Yes — white-label or credited, whichever works. I'm comfortable slotting into existing workflows, design handoffs, and client calls." },
  { q: "Will you travel for kickoffs or installs?", a: "Absolutely. Happy to be on-site for kickoffs, workshops, or launches anywhere it makes sense." },
  { q: "What about post-launch support?", a: "Every project ships with a handover doc and a negotiated support window. Ongoing retainers are available for sites that need regular updates." },
  { q: "Can I hire you for just R&D or prototyping?", a: "Yes — scoping, spiking, and early-stage prototyping are all fair game. Not every engagement needs to end in a production build." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative px-6 md:px-10 py-32 md:py-48">
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="label opacity-60 mb-6">
          03 — Frequently Asked
        </SectionReveal>

        <SectionReveal className="flex items-end justify-between gap-6 flex-wrap mb-12" delay={0.05}>
          <TickerText
            as="h2"
            className="font-display text-[18vw] md:text-[12vw] leading-none tracking-tight"
          >
            FAQ
          </TickerText>


          <span className="label opacity-70 pb-4">Can't see yours? · Drop me a message</span>
        </SectionReveal>

        <div className="hairline opacity-20" />
        <ul>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-foreground/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-baseline gap-6 py-6 text-left group"
                >
                  <span className="label opacity-50 w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl md:text-4xl flex-1">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-3xl md:text-4xl opacity-70"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-14 pr-12 max-w-2xl text-base md:text-lg opacity-75 leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
