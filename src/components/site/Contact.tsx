import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { SectionReveal } from "./SectionReveal";
import { TickerText } from "./TickerText";

const needs = ["General", "Web", "Full-Stack", "AI", "Serverless"];

export function Contact() {
  const [need, setNeed] = useState("General");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    toast.success("Brief sent — I'll get back to you shortly.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section id="contact" className="relative px-6 md:px-10 py-32 md:py-48">
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="label opacity-60 mb-6">
          04 — Let's work together
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <TickerText
            as="h2"
            className="font-display text-[20vw] md:text-[14vw] leading-[0.85] tracking-tight"
          >
            Let's Connect
          </TickerText>

        </SectionReveal>


        <div className="grid md:grid-cols-2 gap-16 mt-16">
          <SectionReveal delay={0.1}>
            <p className="text-lg opacity-80 mb-8">
              I love to talk and work on open source projects, feel free to send me an email or connect with me through LinkedIn.
            </p>

            <form onSubmit={onSubmit} className="space-y-6">
              <Field name="name" label="Name" />
              <Field name="email" label="Email" type="email" />
              <Field name="company" label="Company / Project" />

              <div>
                <div className="label opacity-60 mb-3">What do you need?</div>
                <div className="flex flex-wrap gap-2">
                  {needs.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNeed(n)}
                      className={`px-4 py-2 rounded-full text-sm border transition ${
                        need === n
                          ? "bg-foreground text-background border-foreground"
                          : "border-foreground/20 hover:border-foreground/50"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label opacity-60 block mb-2">Brief</label>
                <textarea
                  name="brief"
                  rows={5}
                  required
                  className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground outline-none py-3 resize-none text-base"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition"
              >
                Send brief
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </button>
            </form>
          </SectionReveal>

          <SectionReveal delay={0.2} className="md:pl-10">
            <div className="label opacity-60 mb-3">Or write directly</div>
            <a
              href="mailto:trhoang220703@gmail.com"
              className="font-display text-3xl md:text-4xl underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground transition"
            >
              trhoang220703@gmail.com
            </a>
            <p className="mt-6 text-sm opacity-70 max-w-sm">
              For roles, collabs, or detailed briefs — I'll get back to you ASAP.
            </p>

            <div className="hairline opacity-20 my-10" />

            <div className="flex flex-col gap-3">
              <a href="https://linkedin.com/in/hoangtran1" target="_blank" rel="noreferrer" className="label hover:opacity-60 transition">
                LinkedIn ↗
              </a>
              <a href="https://github.com/dekkov" target="_blank" rel="noreferrer" className="label hover:opacity-60 transition">
                GitHub ↗
              </a>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

function Field({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <div>
      <label className="label opacity-60 block mb-2">{label}</label>
      <input
        name={name}
        type={type}
        required
        className="w-full bg-transparent border-b border-foreground/30 focus:border-foreground outline-none py-3 text-base"
      />
    </div>
  );
}
