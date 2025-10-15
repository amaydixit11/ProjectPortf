"use client";

import React from "react";
import { DataSource } from "@/types/pixels";

interface DataSourceSelectorProps {
  sources: DataSource[];
  activeSource: string;
  onSourceChange: (sourceId: string) => void;
}

export const DataSourceSelector: React.FC<DataSourceSelectorProps> = ({
  sources,
  activeSource,
  onSourceChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
        Select Platform
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {sources.map((source) => {
          const Icon = source.icon;
          const isActive = activeSource === source.id;
          return (
            <button
              key={source.id}
              onClick={() => onSourceChange(source.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                isActive
                  ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon
                  size={24}
                  className={
                    isActive
                      ? "text-primary"
                      : "text-gray-600 dark:text-gray-400"
                  }
                />
                <span
                  className={`text-sm font-medium ${
                    isActive
                      ? "text-primary"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {source.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};