// components/Widgets.tsx
import React from "react";
import { Code, Zap, Star } from "lucide-react";
import { ProjectsData } from "@/types/projects";

interface WidgetsProps {
  stats: ProjectsData['stats'];
}

const ProjectStatsWidget: React.FC<{ stats: ProjectsData['stats'] }> = ({ stats }) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Code size={18} />
        Project Stats
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Total Projects</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {stats.totalProjects}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Public Repos</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {stats.publicRepos}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Contributions</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {stats.contributions}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Languages</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {stats.languages}
          </span>
        </div>
      </div>
    </div>
  );
};

const TechStackWidget: React.FC = () => {
  const techStack = [
    { name: "Go", color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300" },
    { name: "TypeScript", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
    { name: "React", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
    { name: "Python", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300" },
    { name: "Rust", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300" },
    { name: "PostgreSQL", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" },
    { name: "Kubernetes", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" },
    { name: "Next.js", color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Zap size={18} />
        Primary Tech Stack
      </h3>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech, index) => (
          <span key={index} className={`text-xs px-2 py-1 rounded ${tech.color}`}>
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const CurrentFocusWidget: React.FC = () => {
  const currentFocus = [
    {
      title: "ML Adaptive Indexes",
      subtitle: "Research & Database Systems",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      titleColor: "text-purple-900 dark:text-purple-100",
      subtitleColor: "text-purple-700 dark:text-purple-300",
    },
    {
      title: "Databases",
      subtitle: "Low Level Systems",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      titleColor: "text-blue-900 dark:text-blue-100",
      subtitleColor: "text-blue-700 dark:text-blue-300",
    },
    {
      title: "System Design Learning",
      subtitle: "Scalability & Performance",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      titleColor: "text-green-900 dark:text-green-100",
      subtitleColor: "text-green-700 dark:text-green-300",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Star size={18} />
        Current Focus
      </h3>
      <div className="space-y-3">
        {currentFocus.map((focus, index) => (
          <div key={index} className={`p-3 rounded-lg ${focus.bgColor}`}>
            <div className={`font-medium text-sm ${focus.titleColor}`}>
              {focus.title}
            </div>
            <div className={`text-xs ${focus.subtitleColor}`}>
              {focus.subtitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Widgets: React.FC<WidgetsProps> = ({ stats }) => {
  return (
    <div className="space-y-6">
      <ProjectStatsWidget stats={stats} />
      <CurrentFocusWidget />
      <TechStackWidget />
    </div>
  );
};

