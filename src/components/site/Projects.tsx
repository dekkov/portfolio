import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { TickerText } from "./TickerText";
import faasrImg from "@/assets/faasr.png";
import imcImg from "@/assets/imc.png";
import monologueImg from "@/assets/monologue.png";
import citedImg from "@/assets/Cited.png";

const projects = [
  {
    n: "01",
    title: "FaaSr",
    tag: "Serverless · OSS",
    client: "Python · R · AWS Lambda",
    href: "https://faasr.io/",
    img: faasrImg,
  },
  {
    n: "02",
    title: "Prosperity Trading Academy",
    tag: "Web · Edu",
    client: "Next.js · TypeScript · Tailwind",
    href: "https://prosperity-academy.vercel.app/",
    img: imcImg,
  },
  {
    n: "03",
    title: "Portland Internal Monologue",
    tag: "3D · Hackathon Winner",
    client: "React · TypeScript · Vite",
    href: "https://claude-x-portland.vercel.app/",
    img: monologueImg,
  },
  {
    n: "04",
    title: "Cited",
    tag: "Web",
    client: "TBD",
    href: "#",
    img: citedImg,
  },
];

export function Projects() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackW = trackRef.current.scrollWidth;
      const viewportW = window.innerWidth;
      setTravel(Math.max(0, trackW - viewportW));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  return (
    <section id="projects" className="relative">
      {/* Heading */}
      <div className="px-6 md:px-10 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="label opacity-60 mb-6">02 — Selected Work</div>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <TickerText
              as="h2"
              className="font-display text-[18vw] md:text-[12vw] leading-none tracking-tight"
            >
              Projects
            </TickerText>


            <span className="label opacity-70 pb-4">scroll to explore →</span>
          </div>
        </div>
      </div>

      {/* Horizontal scroll wrapper: tall outer, pinned inner */}
      {reduce ? (
        <div className="px-6 md:px-10 pb-32 space-y-8 max-w-7xl mx-auto">
          {projects.map((p) => (
            <Card key={p.n} {...p} />
          ))}
        </div>
      ) : (
        <div ref={wrapRef} className="relative" style={{ height: `calc(100vh + ${travel}px)` }}>
          <div className="sticky top-0 h-screen overflow-hidden flex items-center">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-6 md:gap-10 px-6 md:px-10 will-change-transform"
            >
              {projects.map((p) => (
                <Card key={p.n} {...p} />
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}

function Card({
  n,
  title,
  tag,
  client,
  href,
  img,
}: {
  n: string;
  title: string;
  tag: string;
  client: string;
  href: string;
  img: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group shrink-0 w-[78vw] md:w-[58vw] lg:w-[48vw] block"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-foreground/5">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute top-4 left-4 label bg-background/70 backdrop-blur px-2 py-1 rounded">
          {tag}
        </div>
        <div className="absolute top-4 right-4 label opacity-80 text-background mix-blend-difference">
          {n}
        </div>
        <div className="absolute bottom-4 right-4 label bg-foreground text-background px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition translate-y-1 group-hover:translate-y-0">
          View project ↗
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl md:text-3xl">{title}</h3>
        <span className="label opacity-60 shrink-0">{client}</span>
      </div>
    </a>
  );
}
