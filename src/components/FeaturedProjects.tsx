import React from 'react';
import Link from 'next/link';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { projectsData } from '@/data/projects';
import { highlightText } from '@/utils/highlightText';

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Live':
      return 'text-green-600 bg-green-50 dark:bg-green-900/20';
    case 'Beta':
      return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
    case 'Complete':
      return 'text-gray-600 bg-gray-50 dark:bg-gray-800';
    case 'In Development':
      return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
    case 'Active':
      return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20';
    case 'Research':
      return 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20';
    default:
      return 'text-gray-600 bg-gray-50 dark:bg-gray-800';
  }
};

export const FeaturedProjects: React.FC = () => {
  // Select top 3 featured projects
  const featuredProjects = projectsData.projects.filter(
    (p) => ['ACORDE', 'Kudos', 'BitTorrent Client'].includes(p.name)
  );

  return (
    <section className="py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Featured Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              A curated selection of my most impactful work
            </p>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-primary hover:text-blue-700 font-medium transition-colors"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 hover:border-primary/50"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                {highlightText(project.description)}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="text-xs text-gray-500 dark:text-gray-500 px-2 py-1">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                {project.github && (
                  <Link
                    href={project.github}
                    className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={14} />
                    Code
                  </Link>
                )}
                {project.demo && project.demo !== project.github && (
                  <Link
                    href={project.demo}
                    className="flex items-center gap-1 text-sm text-primary hover:text-blue-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={14} />
                    Demo
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
