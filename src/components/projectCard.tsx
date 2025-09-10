// components/ProjectCard.tsx
import React from "react";
import { Github, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import { Project } from "@/types/projects";
import { highlightText } from "@/utils/highlightText";

const getStatusColor = (status: string): string => {
  switch (status) {
    case "Live":
      return "text-secondary bg-green-50 dark:bg-green-900/20";
    case "In Development":
      return "text-primary bg-blue-50 dark:bg-blue-900/20";
    case "In Progress":
      return "text-orange-600 bg-orange-50 dark:bg-orange-900/20";
    case "Active Research":
      return "text-purple-600 bg-purple-50 dark:bg-purple-900/20";
    case "Complete":
      return "text-gray-600 bg-gray-50 dark:bg-gray-800";
    default:
      return "text-gray-600 bg-gray-50 dark:bg-gray-800";
  }
};

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              {project.name}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
            {highlightText(project.longDescription || project.description)}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links & Date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {project.github && (
            <Link
              href={project.github}
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              <Github size={16} />
              <span className="text-sm">Code</span>
            </Link>
          )}
          {project.demo && (
            <Link
              href={project.demo}
              className="flex items-center gap-1 text-primary hover:text-blue-700 transition-colors"
            >
              <ExternalLink size={16} />
              <span className="text-sm">Live Demo</span>
            </Link>
          )}
        </div>
        {project.startDate && (
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
            <Calendar size={12} />
            {project.startDate}
          </div>
        )}
      </div>
    </div>
  );
};
