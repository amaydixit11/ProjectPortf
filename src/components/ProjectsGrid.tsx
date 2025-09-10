// src/components/about/ProjectsGrid.tsx
import React from "react";

interface ProjectItem {
  name: string;
  description: string;
  techStack: string[];
  repo: string; // GitHub repo name or URL
  status: "Public" | "Private";
}

const projectsData: ProjectItem[] = [
  {
    name: "Hermes",
    description: "Universal API Gateway & Service Mesh Dashboard. Combines Kong, Postman, Grafana functionality for microservices management.",
    techStack: ["Next.js", "Go", "Envoy", "Istio", "PostgreSQL", "Docker", "Kubernetes"],
    repo: "hermes",
    status: "Public"
  },
  {
    name: "AcadMap",
    description: "Crowd-sourced course resource website for IIT Bhilai.",
    techStack: ["Next.js", "TailwindCSS", "TypeScript", "Supabase", "Shadcn/ui"],
    repo: "acadmap",
    status: "Public"
  },
  {
    name: "amdiFSV",
    description: "Disk space visualization tool.",
    techStack: ["Rust", "Tauri", "Next.js"],
    repo: "amdiFSV",
    status: "Public"
  },
  {
    name: "Lifeline",
    description: "Graphical database project with dynamic relationships.",
    techStack: ["Neo4j", "NestJS", "Next.js", "D3.js"],
    repo: "lifeline",
    status: "Public"
  },
  {
    name: "ChatViz",
    description: "WhatsApp Chat Analyzer (in progress). Privacy-focused analysis without storing messages.",
    techStack: ["Next.js", "FastAPI", "Firebase"],
    repo: "ChatViz",
    status: "Public"
  },
  {
    name: "UniVC",
    description: "Related to Verifiable Credentials from MOSIP work.",
    techStack: ["NestJS", "APIs for revocation"],
    repo: "UniVC",
    status: "Public"
  },
  {
    name: "BitTorrentClient",
    description: "Peer-to-peer networking project.",
    techStack: ["Go or Python?"], // Assuming based on your interests
    repo: "BitTorrentClient",
    status: "Public"
  },
  {
    name: "LifeLog",
    description: "Personal quantified self-tracking project.",
    techStack: ["Unknown, personal analytics"],
    repo: "LifeLog",
    status: "Private"
  },
  // Add the rest from your list, e.g., DSL501_ML_Project, quantified, etc. I prioritized key ones; expand as needed.
];

export const ProjectsGrid: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
              {project.name} ({project.status})
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};