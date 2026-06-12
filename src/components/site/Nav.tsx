import { motion } from "motion/react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-40 px-6 md:px-10 py-5"
    >
      <div className="flex items-center justify-between gap-6">
        <a href="#top" className="label">
          Hoang Tran
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="label opacity-70 hover:opacity-100 transition-opacity"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <span className="label">2026</span>
      </div>
      <div className="hairline mt-4 opacity-30" />
    </motion.header>
  );
}
