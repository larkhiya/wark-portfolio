import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import ScrollReveal from "@/components/ScrollReveal";
import { ticker } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee items={ticker} />
        <About />
        <Projects />
        <Marquee items={["LET'S WORK TOGETHER", "GET IN TOUCH", "AVAILABLE 2026"]} variant="red" />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <ScrollReveal />
    </>
  );
}
