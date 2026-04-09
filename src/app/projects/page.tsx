'use client';

import React, { useState, useMemo } from 'react';
import { ProjectCard } from '@/components/projectCard';
import { Widgets } from '@/components/projects/Widgets';
import { projectsData } from '@/data/projects';
import { highlightText } from '@/utils/highlightText';
import { Project } from '@/types/projects';
import { Filter, ArrowUpDown } from 'lucide-react';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status'>('date');

  const allProjects = projectsData.projects;

  // Extract unique categories and statuses
  const categories = [
    'All',
    ...Array.from(
      new Set(
        allProjects
          .map((p) => p.category)
          .filter((category): category is string => Boolean(category))
      )
    ),
  ];
  const statuses = ['All', ...Array.from(new Set(allProjects.map(p => p.status)))];

  const filteredProjects = useMemo(() => {
    let filtered = allProjects;

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Filter by status
    if (activeStatus !== 'All') {
      filtered = filtered.filter(p => p.status === activeStatus);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      // Default: sort by date (newest first)
      return (b.startDate || '').localeCompare(a.startDate || '');
    });

    return filtered;
  }, [allProjects, activeCategory, activeStatus, sortBy]);

  return (
    <div className="py-8 min-h-screen mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Projects
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A collection of projects ranging from infrastructure tools to
              research work, showcasing my passion for{' '}
              {highlightText('backend systems')},{' '}
              {highlightText('system design')}, and{' '}
              {highlightText('open-source development')}.
            </p>
          </div>

          {/* Filters */}
          <div className="space-y-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            {/* Category Filters */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Filter size={16} />
                Category
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      activeCategory === category
                        ? 'bg-primary text-white font-medium'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filters */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </div>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setActiveStatus(status)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      activeStatus === status
                        ? 'bg-secondary text-white font-medium'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-secondary'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <ArrowUpDown size={16} />
                Sort by:
              </div>
              <div className="flex gap-2">
                {(['date', 'name', 'status'] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors capitalize ${
                      sortBy === option
                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
              Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{filteredProjects.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-gray-100">{allProjects.length}</span> projects
            </div>
          </div>

          {/* All Projects */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No projects match the selected filters.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setActiveStatus('All');
                  }}
                  className="mt-4 text-primary hover:text-blue-700 font-medium transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Collaboration Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Let&apos;s Collaborate
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Interested in collaborating on{' '}
              {highlightText('open-source projects')},{' '}
              {highlightText('system design')}, or{' '}
              {highlightText('backend infrastructure')}? I&apos;m always excited to
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
