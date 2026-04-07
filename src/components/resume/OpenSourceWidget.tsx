import React from "react";
import { Users, ExternalLink } from "lucide-react";
import Link from "next/link";
import { projectsData } from "@/data/projects";

const OpenSourceWidget: React.FC = () => {
  const contributionCount = projectsData.stats.contributions;

  const contributions = [
    {
      project: "MOSIP Inji Stack",
      role: "Core Contributor",
      description: "mDoc format support & VC revocation mechanism",
      tech: ["NestJS", "W3C Standards", "Cryptography"],
    },
    {
      project: "OpenLake Projects",
      role: "Maintainer",
      description: "Leading multiple community initiatives",
      tech: ["Community", "Mentorship", "Events"],
    },
    {
      project: "Personal Projects",
      role: "Creator",
      description: `25+ public repositories with ${contributionCount}+ contributions`,
      tech: ["Various Tech Stacks"],
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Users size={18} />
        Open Source
      </h3>
      <div className="space-y-4">
        {contributions.map((contrib, index) => (
          <div
            key={index}
            className="pb-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
          >
            <div className="mb-2">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                {contrib.project}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {contrib.role}
              </p>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              {contrib.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {contrib.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="text-xs px-1 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="pt-2">
          <Link
            href="https://github.com/amaydixit11"
            className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
          >
            View GitHub Profile <ExternalLink size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OpenSourceWidget;
