import { Hero } from "@/components/hero/Hero";
import { Impact } from "@/components/sections/Impact";
import { Marquee } from "@/components/Marquee";
import { Work } from "@/components/sections/Work";
import { AIEdge } from "@/components/sections/AIEdge";
import { About } from "@/components/sections/About";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Impact />
      <Marquee />
      <Work />
      <AIEdge />
      <About />
      <Writing />
      <Contact />
    </main>
  );
}
