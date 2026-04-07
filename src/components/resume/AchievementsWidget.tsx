import React from "react";
import { Award } from "lucide-react";

const AchievementsWidget: React.FC = () => {
  const achievements = [
    {
      title: "MOSIP C4GT Intern",
      description: "Selected for prestigious Code for GovTech internship",
      year: "2025",
    },
    {
      title: "FOSSEE Summer Fellow",
      description: "IIT Bombay fellowship for open-source contributions",
      year: "2025",
    },
    {
      title: "OpenLake Coordinator",
      description: "Leading IIT Bhilai's premier open-source club",
      year: "2025",
    },
    {
      title: "Codeforces Specialist",
      description: "Rating: 1320+ in competitive programming",
      year: "2024",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Award size={18} />
        Achievements
      </h3>
      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="pb-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
          >
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                {achievement.title}
              </h4>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {achievement.year}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {achievement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsWidget;
