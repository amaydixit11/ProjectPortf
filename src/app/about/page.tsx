"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Calendar, 
  Code, 
  Music, 
  Coffee, 
  BookOpen, 
  Trophy,
  ExternalLink,
  Github,
  Clock,
  Headphones,
  Activity,
  Zap
} from "lucide-react";

const About = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Mock current activity data
  const [currentActivity, setCurrentActivity] = useState({
    status: "coding",
    project: "Hermes API Gateway",
    language: "Go"
  });

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mock music data
  const currentTrack = {
    name: "Weightless",
    artist: "Marconi Union",
    album: "Ambient Soundscapes",
    isPlaying: true
  };

  // Recent achievements
  const recentAchievements = [
    "Selected for MOSIP Internship",
    "Coordinator @ OpenLake",
    "Codeforces Rating: 1320"
  ];

  // Current learning
  const currentLearning = ["Rust", "System Design", "Kubernetes"];

  return (
    <div className="py-8 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              About Me
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Backend engineer, system designer, and open-source enthusiast building scalable solutions.
            </p>
          </div>

          {/* Bio Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Who I Am
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I&apos;m a B.Tech student at IIT Bhilai passionate about backend systems and infrastructure. 
                I love building tools that solve real problems - from API gateways and service meshes to 
                community platforms for my university.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                As Coordinator of OpenLake (our open-source club), I help fellow students contribute to 
                meaningful projects. I&apos;ve also worked with organizations like MOSIP and IIT Bombay, 
                developing systems for digital identity and computational tools.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, solving competitive 
                programming problems, or thinking about how to make complex systems more elegant and efficient.
              </p>
            </div>
          </div>

          {/* What I Do */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              What I Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Backend Development
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Building scalable APIs, microservices, and distributed systems with modern tech stacks.
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  System Design
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Architecting robust systems with service meshes, API gateways, and monitoring solutions.
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Open Source
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Contributing to community projects and leading open-source initiatives at university.
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Research
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Working on ML-based database optimization and adaptive model selection for learned indexes.
                </p>
              </div>
            </div>
          </div>

          {/* Beyond Code */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Beyond Code
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I believe great engineers are also great learners and community builders. I organize knowledge 
              using Zettelkasten methods, compete in programming contests, and always look for opportunities 
              to help fellow developers grow. I&apos;m particularly interested in the intersection of systems engineering 
              and machine learning.
            </p>
          </div>
        </div>

        {/* Widgets - Right Side */}
        <div className="space-y-6">
          {/* Location & Time Widget */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Currently
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Location</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Durg, India
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Time</span>
                <div className="flex items-center gap-1">
                  <Clock size={12} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {currentTime} IST
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Status Widget */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={16} className="text-green-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Status
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-900 dark:text-gray-100 capitalize">
                  {currentActivity.status}
                </span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Working on {currentActivity.project}
              </div>
              <div className="flex items-center gap-1">
                <Code size={12} className="text-gray-500" />
                <span className="text-xs text-gray-500">
                  {currentActivity.language}
                </span>
              </div>
            </div>
          </div>

          {/* Music Widget */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Headphones size={16} className="text-purple-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Now Playing
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                  <Music size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {currentTrack.name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {currentTrack.artist}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {currentTrack.isPlaying && (
                  <>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="w-1 h-4 bg-green-500 rounded-full animate-pulse delay-100"></div>
                      <div className="w-1 h-2 bg-green-500 rounded-full animate-pulse delay-200"></div>
                    </div>
                    <span className="text-xs text-green-500 font-medium">Playing</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={16} className="text-yellow-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Recent Wins
              </span>
            </div>
            <div className="space-y-2">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Currently Learning */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} className="text-blue-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Learning
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentLearning.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-orange-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Quick Links
              </span>
            </div>
            <div className="space-y-2">
              <a
                href="https://github.com/amaydixit11"
                className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                <Github size={12} />
                <span>GitHub Profile</span>
                <ExternalLink size={10} />
              </a>
              <a
                href="https://codeforces.com/profile/amaydixit11"
                className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                <Code size={12} />
                <span>Codeforces</span>
                <ExternalLink size={10} />
              </a>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Coffee size={12} />
                <span>Always up for coffee ☕</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;