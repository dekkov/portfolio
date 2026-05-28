import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { ClientOnly } from "@/components/ClientOnly";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Projects } from "@/components/site/Projects";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Loader } from "@/components/site/Loader";
import { FluidLayer } from "@/components/site/FluidLayer";
import { Cursor } from "@/components/site/Cursor";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hoang Tran — Software Engineer · Full-Stack & AI" },
      {
        name: "description",
        content:
          "Software engineer based in Seattle, WA. Building polished, interactive web experiences across full-stack, AI, and serverless.",
      },
      { property: "og:title", content: "Hoang Tran — Software Engineer" },
      {
        property: "og:description",
        content: "Polished, interactive web experiences. Selected work and contact.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <ClientOnly>
        <SmoothScroll />
        <FluidLayer />
        <Cursor />
        <Loader />
      </ClientOnly>

      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-center" />
    </>
  );
}
