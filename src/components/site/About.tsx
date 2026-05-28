import { SectionReveal } from "./SectionReveal";

const stats = [
  { n: "10+", label: "Projects shipped" },
  { n: "3+", label: "Years building" },
  { n: "1", label: "Hackathon win" },
];

const experience = [
  { role: "Founding Software Engineer", org: "Clicr", years: "Feb 2026 — Apr 2026" },
  { role: "Software Developer", org: "OSU's Center for Applied Systems and Software", years: "Feb 2025 — Mar 2026" },
  { role: "Undergraduate Research Assistant", org: "OSU's College of Engineering", years: "Jun 2024 — Sep 2024" },
  { role: "Undergraduate Teaching Assistant", org: "OSU's College of Engineering", years: "Mar 2023 — Jun 2023" },
];

export function About() {
  return (
    <section id="about" className="relative px-6 md:px-10 py-32 md:py-48">
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="label opacity-60 mb-10">
          01 — Who I am
        </SectionReveal>

        <div className="grid md:grid-cols-12 gap-10">
          <SectionReveal className="md:col-span-8" delay={0.05}>
            <p className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight">
              I am a software engineer based in Seattle, shipping interactive
              products across
              <em className="italic"> full-stack, AI, and serverless </em>
              — open-source contributor, hackathon winner, and a chill guy who
              builds things that feel as good as they look.
            </p>
          </SectionReveal>

          <SectionReveal className="md:col-span-4 space-y-8" delay={0.15}>
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-4">
                <div className="font-display text-6xl">{s.n}</div>
                <div className="label opacity-60">{s.label}</div>
              </div>
            ))}
          </SectionReveal>
        </div>

        <SectionReveal className="mt-24" delay={0.1}>
          <div className="label opacity-60 mb-6">Experience</div>
          <div className="hairline opacity-20" />
          <ul>
            {experience.map((e) => (
              <li
                key={e.role + e.org}
                className="grid grid-cols-12 gap-4 py-5 border-b border-foreground/10 items-baseline"
              >
                <span className="col-span-12 md:col-span-5 font-display text-2xl md:text-3xl">
                  {e.role}
                </span>
                <span className="col-span-8 md:col-span-4 text-sm opacity-70">
                  {e.org}
                </span>
                <span className="col-span-4 md:col-span-3 text-right label">
                  {e.years}
                </span>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
