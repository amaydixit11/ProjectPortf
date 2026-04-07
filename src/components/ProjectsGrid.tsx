import React from "react";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "./projectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const ProjectsGrid: React.FC = () => {
  // Show only top 4 featured projects on homepage
  const featuredProjects = projectsData.projects.slice(0, 4);

  return (
    <section className="space-y-8 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Featured Projects
        </h2>
        <Link 
          href="/projects" 
          className="text-primary hover:text-blue-700 font-medium flex items-center gap-2 group transition-colors"
        >
          View all projects
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};