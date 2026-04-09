'use client';

import React from 'react';
import {
  GraduationCap,
  Briefcase,
  Trophy,
  Code,
  GitBranch,
  Rocket,
} from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const timelineData: TimelineEvent[] = [
  {
    date: 'Apr 2026 - Present',
    title: 'Pre-Final Year @ IIT Bhilai',
    description:
      'CGPA 9.08 in Data Science & AI. Focused on distributed systems, database internals, and production ML pipelines. Building ACORDE, Kudos, and various AI-powered tools.',
    icon: <GraduationCap size={20} />,
    color: 'from-blue-500 to-blue-600',
  },
  {
    date: '2025',
    title: 'Major Project Year',
    description:
      'Built BitTorrent Client from scratch in Go. Started Kudos (token-economy social platform) and ACORDE (CRDT-based distributed sync engine). Created GitIntel, RAGfolio, B+ Tree implementation, and more.',
    icon: <Code size={20} />,
    color: 'from-purple-500 to-purple-600',
  },
  {
    date: '2024-2025',
    title: 'OpenLake Coordinator',
    description:
      'Led OpenLake (IIT Bhilai\'s open-source society) for 1 year. Set technical roadmaps, organized workshops and hackathons, mentored juniors into productive contributors. Led Leaderboard-Pro project.',
    icon: <Briefcase size={20} />,
    color: 'from-green-500 to-green-600',
  },
  {
    date: '2024',
    title: 'Dual Internships: MOSIP & FOSSEE',
    description:
      'Double selection at MOSIP through C4GT (Sprint + DMP cohorts) — worked on digital identity infrastructure implementing ISO/IEC 18013-5 mDoc format and W3C Verifiable Credentials. FOSSEE Summer Fellowship at IIT Bombay working on OSDAG.',
    icon: <Trophy size={20} />,
    color: 'from-orange-500 to-orange-600',
  },
  {
    date: '2023-2024',
    title: 'Web Development & Open Source',
    description:
      'Discovered web development, built AcadMap for campus. Joined OpenLake, learned Go and Docker. Started thinking about systems at scale. Completed library automation internship at IBITF, explored ElectronJS and Flutter.',
    icon: <GitBranch size={20} />,
    color: 'from-pink-500 to-pink-600',
  },
  {
    date: '2023',
    title: 'IIT Bhilai & Competitive Programming',
    description:
      'Entered IIT Bhilai in Data Science & AI. Got hooked on competitive programming — grinding C/C++ on Codeforces. Built foundation in algorithms and data structures.',
    icon: <Rocket size={20} />,
    color: 'from-teal-500 to-teal-600',
  },
  {
    date: '2021-2022',
    title: 'Programming Beginnings',
    description:
      'Started programming in 11th/12th grade with Python. Logical problem-solving clicked immediately. Built foundation that led to IIT entrance and beyond.',
    icon: <Code size={20} />,
    color: 'from-indigo-500 to-indigo-600',
  },
];

export const TimelineVisualization: React.FC = () => {
  return (
    <section className="py-12">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            My Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            From curious beginner to systems builder
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform md:-translate-x-1/2" />

          {/* Timeline Events */}
          <div className="space-y-8">
            {timelineData.map((event, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Icon */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`p-3 rounded-full bg-gradient-to-br ${event.color} text-white shadow-lg`}
                  >
                    {event.icon}
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-12 md:pl-0`}>
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-500 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                        {event.date}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">9.08</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">CGPA</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">2</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Internships</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">11+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">1yr</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Leadership</div>
          </div>
        </div>
      </div>
    </section>
  );
};
