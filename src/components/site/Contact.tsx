import { SectionReveal } from "./SectionReveal";
import { TickerText } from "./TickerText";

export function Contact() {
  return (
    <section id="contact" className="relative px-6 md:px-10 py-32 md:py-48">
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="label opacity-60 mb-6">03 — Contact</SectionReveal>

        <SectionReveal delay={0.05}>
          <TickerText
            as="h2"
            className="font-display text-[20vw] md:text-[14vw] leading-[0.85] tracking-tight"
          >
            Get in touch
          </TickerText>
        </SectionReveal>

        <div className="mt-16 grid md:grid-cols-2 gap-16">
          <SectionReveal delay={0.1}>
            <a
              href="mailto:trhoang220703@gmail.com"
              className="font-display text-3xl md:text-4xl underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground transition"
            >
              trhoang220703@gmail.com
            </a>
            <p className="mt-6 text-sm opacity-70 max-w-sm">
              For roles, collabs, or open source — I'll get back to you as soon as I can.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="label opacity-60 mb-3">Socials</div>
            <div className="flex flex-col gap-3">
              <a
                href="https://linkedin.com/in/hoangtran1"
                target="_blank"
                rel="noreferrer"
                className="label hover:opacity-60 transition"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/dekkov"
                target="_blank"
                rel="noreferrer"
                className="label hover:opacity-60 transition"
              >
                GitHub ↗
              </a>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
