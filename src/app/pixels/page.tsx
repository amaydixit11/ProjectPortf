"use client";

import React, { useState } from "react";
import { HeatMapGrid } from "@/components/pixels/HeatMapGrid";
import { DataSourceSelector } from "@/components/pixels/DataSourceSelector";
import { dataSourceRegistry } from "@/lib/pixels/dataSourceRegistry";
import { Activity, Calendar, Code, Trophy, Target } from "lucide-react";

const Life: React.FC = () => {
  const [activeSource, setActiveSource] = useState("github");
  const dataSources = dataSourceRegistry.getAllSources();
  const currentSource = dataSourceRegistry.getSource(activeSource);

  return (
    <div className="py-8 min-h-screen mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Life in Pixels
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Visualizing my daily activities and contributions across different
              platforms. Each pixel represents a day of work, learning, and growth.
            </p>
          </div>

          {/* Data Source Selector */}
          <DataSourceSelector
            sources={dataSources}
            activeSource={activeSource}
            onSourceChange={setActiveSource}
          />

          {/* Heat Map Display */}
          {currentSource && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {currentSource.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentSource.description}
                </p>
              </div>
              <HeatMapGrid dataSource={currentSource} />
            </div>
          )}

          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              About This Visualization
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This page tracks my daily activities across various platforms. Each
              heatmap shows my consistency and dedication in different areas - from
              coding contributions to competitive programming practice. The darker
              the color, the more active I was on that particular day.
            </p>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <StatsWidget />
          <StreaksWidget />
          <GoalsWidget />
        </div>
      </div>
    </div>
  );
};

// Stats Widget
const StatsWidget: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Activity size={18} />
        Overall Stats
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Total Days Tracked</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">365</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Active Days</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">287</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Current Streak</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">15 days</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Longest Streak</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">42 days</span>
        </div>
      </div>
    </div>
  );
};

// Streaks Widget
const StreaksWidget: React.FC = () => {
  const streaks = [
    { platform: "GitHub", current: 15, longest: 42, color: "text-purple-500" },
    { platform: "Codeforces", current: 7, longest: 28, color: "text-blue-500" },
    { platform: "GeeksforGeeks", current: 12, longest: 35, color: "text-green-500" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Trophy size={18} />
        Active Streaks
      </h3>
      <div className="space-y-4">
        {streaks.map((streak, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${streak.color}`}>
                {streak.platform}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                Best: {streak.longest} days
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${streak.color.replace('text-', 'bg-')}`}
                style={{ width: `${(streak.current / streak.longest) * 100}%` }}
              />
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {streak.current} days current streak
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Goals Widget
const GoalsWidget: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Target size={18} />
        2025 Goals
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              GitHub Contributions
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              847 / 1000
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: "84.7%" }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Codeforces Problems
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              156 / 200
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Active Days
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              287 / 365
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: "78.6%" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Life;
