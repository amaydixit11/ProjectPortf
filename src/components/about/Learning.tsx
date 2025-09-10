// components/widgets/LearningWidget.tsx
import React from 'react';
import { BookOpen } from 'lucide-react';

interface LearningWidgetProps {
  technologies: string[];
}

export const LearningWidget: React.FC<LearningWidgetProps> = ({
  technologies
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-2 mb-3">
      <BookOpen size={16} className="text-blue-500" />
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Learning
      </span>
    </div>
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, index) => (
        <span
          key={index}
          className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);

