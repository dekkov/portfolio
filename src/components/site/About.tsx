import { SectionReveal } from "./SectionReveal";

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

        <SectionReveal delay={0.05}>
          <p className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight max-w-5xl">
            I am endlessly curious — I dive into everything from
            <em className="italic"> competitive programming, web3, AI tooling, and
            reinforcement learning </em>
            to whatever sparks my interest next. I haven't mastered any single one,
            and I love that: every experiment makes me a sharper, more versatile
            builder.
          </p>
        </SectionReveal>

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
