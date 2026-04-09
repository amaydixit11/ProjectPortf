'use client';

import React from 'react';
import {
  Code2,
  Database,
  Server,
  Cpu,
  Wrench,
  Brain,
  Globe,
} from 'lucide-react';

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  color: string;
  skills: { name: string; level: number }[];
}

const skillsData: SkillCategory[] = [
  {
    icon: <Code2 size={20} />,
    title: 'Languages',
    color: 'from-blue-500 to-blue-600',
    skills: [
      { name: 'Go', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'C/C++', level: 85 },
      { name: 'Rust', level: 70 },
      { name: 'TypeScript', level: 80 },
      { name: 'JavaScript', level: 85 },
    ],
  },
  {
    icon: <Server size={20} />,
    title: 'Backend & Frameworks',
    color: 'from-green-500 to-green-600',
    skills: [
      { name: 'Next.js', level: 85 },
      { name: 'FastAPI', level: 80 },
      { name: 'Node.js', level: 80 },
      { name: 'NestJS', level: 70 },
      { name: 'gRPC', level: 75 },
      { name: 'Spring Boot', level: 65 },
    ],
  },
  {
    icon: <Database size={20} />,
    title: 'Databases & Storage',
    color: 'from-purple-500 to-purple-600',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 75 },
      { name: 'SQLite', level: 80 },
      { name: 'Redis', level: 70 },
      { name: 'Neo4j', level: 65 },
      { name: 'Vector DBs', level: 75 },
    ],
  },
  {
    icon: <Cpu size={20} />,
    title: 'Systems & Distributed',
    color: 'from-orange-500 to-orange-600',
    skills: [
      { name: 'libp2p', level: 75 },
      { name: 'CRDTs', level: 80 },
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 65 },
      { name: 'CI/CD', level: 80 },
      { name: 'Linux', level: 85 },
    ],
  },
  {
    icon: <Brain size={20} />,
    title: 'AI & Machine Learning',
    color: 'from-pink-500 to-pink-600',
    skills: [
      { name: 'LLMs', level: 80 },
      { name: 'RAG Systems', level: 85 },
      { name: 'PyTorch', level: 65 },
      { name: 'Scikit-learn', level: 70 },
      { name: 'Vector Embeddings', level: 80 },
      { name: 'Meta-Learning', level: 75 },
    ],
  },
  {
    icon: <Wrench size={20} />,
    title: 'Tools & DevOps',
    color: 'from-teal-500 to-teal-600',
    skills: [
      { name: 'GitHub Actions', level: 85 },
      { name: 'Git', level: 90 },
      { name: 'Grafana', level: 65 },
      { name: 'Prometheus', level: 60 },
      { name: 'Supabase', level: 75 },
      { name: 'Firebase', level: 65 },
    ],
  },
];

export const SkillsVisualization: React.FC = () => {
  return (
    <section className="py-12">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Technical Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Proficiency across languages, frameworks, and systems
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((category) => (
            <div
              key={category.title}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} text-white`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill) => {
                  const clampedLevel = Math.max(0, Math.min(100, skill.level));
                  return (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {clampedLevel}%
                        </span>
                      </div>
                      <div
                        className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={clampedLevel}
                        aria-label={`${skill.name} proficiency: ${clampedLevel}%`}
                      >
                        <div
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-500`}
                          style={{ width: `${clampedLevel}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200 dark:border-green-800 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600">
              <Globe size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Open Source & Leadership
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Led <span className="font-semibold">OpenLake</span> (IIT Bhilai&apos;s open-source society) as Coordinator for 1 year. 
                Mentored contributors, organized workshops, and maintained organizational repositories. 
                Active contributor to various open-source projects with focus on distributed systems and developer tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
