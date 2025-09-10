"use client";

import React, { useState } from "react";
import { ProjectCard } from "@/components/projectCard";
import { Widgets } from "@/components/projects/Widgets";
import { projectsData } from "@/data/projects";
import { highlightText } from "@/utils/highlightText";
import { Project } from "@/types/projects";

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Merge featured projects into all projects
  const allProjects = projectsData.projects;

  return (
    <div className="py-8 min-h-screen mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Projects
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A collection of projects ranging from infrastructure tools to
              research work, showcasing my passion for{" "}
              {highlightText("backend systems")},{" "}
              {highlightText("system design")}, and{" "}
              {highlightText("open-source development")}.
            </p>
          </div>

          {/* All Projects */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allProjects.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Collaboration Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Let's Collaborate
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Interested in collaborating on{" "}
              {highlightText("open-source projects")},{" "}
              {highlightText("system design")}, or{" "}
              {highlightText("backend infrastructure")}? I'm always excited to
              work on challenging problems and contribute to meaningful
              projects. Check out my GitHub or reach out via email.
            </p>
          </div>
        </div>

        {/* Widgets */}
        <Widgets stats={projectsData.stats} />
      </div>
    </div>
  );
};

export default Projects;
