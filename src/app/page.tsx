import Hero from "@/components/Hero";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { StatsDashboard } from "@/components/StatsDashboard";
import { LatestWriting } from "@/components/LatestWriting";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <StatsDashboard />
      <LatestWriting />
    </>
  );
}
