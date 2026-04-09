'use client';

import React from 'react';
import {
  Code2,
  GitBranch,
  MessageSquare,
  Trophy,
  TrendingUp,
  Star,
  Activity,
  BookOpen,
} from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, subtitle, color = 'text-primary' }) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-800 ${color}`}>
        {icon}
      </div>
      {subtitle && (
        <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
          <TrendingUp size={12} />
          {subtitle}
        </span>
      )}
    </div>
    <div className="space-y-1">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {label}
      </p>
    </div>
  </div>
);

export const StatsDashboard: React.FC = () => {
  const stats = [
    {
      icon: <Code2 size={24} />,
      label: 'LeetCode Problems Solved',
      value: '209',
      subtitle: '66E · 130M · 13H',
      color: 'text-green-600',
    },
    {
      icon: <GitBranch size={24} />,
      label: 'GitHub Public Repositories',
      value: '23',
      subtitle: 'Active',
      color: 'text-purple-600',
    },
    {
      icon: <MessageSquare size={24} />,
      label: 'ChatGPT Conversations',
      value: '5,180',
      subtitle: 'Since Dec 2022',
      color: 'text-blue-600',
    },
    {
      icon: <Trophy size={24} />,
      label: 'Contributions (2024)',
      value: '1,200+',
      subtitle: 'Growing',
      color: 'text-orange-600',
    },
    {
      icon: <Star size={24} />,
      label: 'Programming Languages',
      value: '9',
      subtitle: 'Proficient',
      color: 'text-yellow-600',
    },
    {
      icon: <Activity size={24} />,
      label: 'Open Source Projects',
      value: '11',
      subtitle: 'Shipped',
      color: 'text-pink-600',
    },
    {
      icon: <BookOpen size={24} />,
      label: 'Blog Posts Published',
      value: '4',
      subtitle: 'More coming',
      color: 'text-indigo-600',
    },
    {
      icon: <TrendingUp size={24} />,
      label: 'CGPA',
      value: '9.08',
      subtitle: 'IIT Bhilai',
      color: 'text-teal-600',
    },
  ];

  return (
    <section className="py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Stats & Impact
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            A snapshot of my learning journey and technical contributions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              subtitle={stat.subtitle}
              color={stat.color}
            />
          ))}
        </div>

        {/* Learning Journey Callout */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600">
              <MessageSquare size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                My AI-Assisted Learning Journey
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Over <span className="font-semibold text-primary">5,180 conversations</span> with AI since December 2022, 
                spanning ML/AI (2,931), system design (674), competitive programming (1,107), and more. 
                This portfolio represents projects and insights born from years of continuous learning and building.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
