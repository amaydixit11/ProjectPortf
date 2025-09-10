import Hero from "@/components/Hero";
import About from "./about/page";
import { ProjectsGrid } from "@/components/ProjectsGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsGrid /> {/* New section added */}
    </>
  );
}
