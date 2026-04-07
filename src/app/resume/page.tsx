"use client";

import React from "react";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import {
  Download,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import TechnicalSkillsWidget from "@/components/resume/TechnicalSkillsWidget";
import EducationWidget from "@/components/resume/EducationWidget";
import AchievementsWidget from "@/components/resume/AchievementsWidget";
import OpenSourceWidget from "@/components/resume/OpenSourceWidget";

const Resume: React.FC = () => {
  const allowedIndexes = [0, 1, 4, 5]; // Indexes of projects to show on resume
  return (
    <div className="py-8 min-h-screen mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Resume
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                  Backend Engineer · System Designer · Open Source Enthusiast
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  B.Tech in Data Science & Artificial Intelligence @ IIT Bhilai · Available for
                  opportunities
                </p>
              </div>
              <Link
                href="/amay-dixit-resume.pdf"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                target="_blank"
              >
                <Download size={16} />
                Download PDF
              </Link>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Professional Summary
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Passionate backend engineer and system designer with hands-on
              experience in building scalable applications and contributing to
              open-source projects. Currently pursuing B.Tech at IIT Bhilai
              while leading technical initiatives as OpenLake Coordinator.
              Proven track record of delivering impactful solutions through
              internships at MOSIP and IIT Bombay, with expertise in modern
              backend technologies and distributed systems.
            </p>
          </div>

          {/* Experience Timeline */}
          <ExperienceTimeline />

          {/* Key Projects */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {projectsData["projects"].map((project, index) => {
                if (allowedIndexes.includes(index))
                  return (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
              })}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <Link
                href="/projects"
                className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
              >
                View all projects <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Widgets */}
        <div className="space-y-6">
          <EducationWidget />
          <TechnicalSkillsWidget />
          <AchievementsWidget />
          <OpenSourceWidget />

          {/* Contact Info */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Contact Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Email:</span>{" "}
                <Link
                  href="mailto:amayd@iitbhilai.ac.in"
                  className="text-blue-500"
                >
                  amayd@iitbhilai.ac.in
                </Link>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Location:
                </span>{" "}
                <span className="text-gray-900 dark:text-gray-100">
                  Durg, India
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  GitHub:
                </span>{" "}
                <Link
                  href="https://github.com/amaydixit11"
                  className="text-blue-500"
                >
                  @amaydixit11
                </Link>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  LinkedIn:
                </span>{" "}
                <Link
                  href="https://linkedin.com/in/amay-dixit-462113284"
                  className="text-blue-500"
                >
                  @amay-dixit
                </Link>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  X:
                </span>{" "}
                <Link
                  href="https://X.com/AmayDixit11"
                  className="text-blue-500"
                >
                  @AmayDixit11
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
