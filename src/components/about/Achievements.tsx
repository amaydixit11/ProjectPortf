// components/widgets/AchievementsWidget.tsx
import React from 'react';
import { Trophy } from 'lucide-react';

interface AchievementsWidgetProps {
  achievements: string[];
}

export const AchievementsWidget: React.FC<AchievementsWidgetProps> = ({
  achievements
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-2 mb-3">
      <Trophy size={16} className="text-yellow-500" />
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Recent Wins
      </span>
    </div>
    <div className="space-y-2">
      {achievements.map((achievement, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {achievement}
          </span>
        </div>
      ))}
    </div>
  </div>
);

