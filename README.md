# Portfolio — Hoang Tran

Personal portfolio site. Software engineer based in Seattle, WA — building polished, interactive products across full-stack, AI, and serverless.

Live site sections: Hero · About · Selected Work · FAQ · Contact.

## Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19 + Vite 7)
- **Runtime target:** Cloudflare (via `@cloudflare/vite-plugin`, `wrangler.jsonc`)
- **Styling:** Tailwind CSS v4, `tw-animate-css`, custom OKLCH theme tokens
- **Motion / 3D:** `motion`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `@whatisjery/react-fluid-distortion`, Lenis smooth scroll
- **UI primitives:** Radix UI + shadcn-style components in `src/components/ui`
- **Tooling:** TypeScript, ESLint, Prettier, Bun

## Scripts

```bash
bun install        # install deps
bun run dev        # start dev server (Vite)
bun run build      # production build
bun run preview    # preview production build
bun run lint       # eslint
bun run format     # prettier
```

`npm` / `pnpm` also work — `bun.lock` is the canonical lockfile.

## Project layout

```
src/
├── assets/                  # images
├── components/
│   ├── site/                # page sections (Hero, About, Projects, FAQ, Contact, Footer, Nav, Loader, …)
│   ├── ui/                  # shadcn-style primitives
│   ├── ClientOnly.tsx
│   └── SmoothScroll.tsx
├── hooks/
├── lib/
├── routes/                  # TanStack Router file-based routes
│   ├── __root.tsx
│   └── index.tsx
├── router.tsx
├── server.ts                # TanStack Start server entry
├── start.ts
└── styles.css
```

## Deployment

Configured for Cloudflare Workers via `wrangler.jsonc` and `@cloudflare/vite-plugin`. After `bun run build`, deploy with `wrangler deploy`.

## Contact

- Email: trhoang220703@gmail.com
- GitHub: [@dekkov](https://github.com/dekkov)
- LinkedIn: [hoangtran1](https://linkedin.com/in/hoangtran1)
