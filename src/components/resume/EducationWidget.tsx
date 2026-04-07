import React from "react";
import { BookOpen } from "lucide-react";

const EducationWidget: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <BookOpen size={18} />
        Education
      </h3>
      <div className="space-y-4">
        {/* College */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100">
            Indian Institute of Technology, Bhilai
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            B.Tech in Data Science & Artificial Intelligence
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            2023 - 2027 (Expected) | CGPA: 9.08 (so far)
          </p>
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Relevant Coursework
            </h5>
            <div className="flex flex-wrap gap-1">
              {[
                "Data Structures",
                "Algorithms",
                "Database Systems",
                "Machine Learning",
                "System Design",
                "Computer Networks",
              ].map((course, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 12th School */}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">
            St. Gregorios School
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Higher Secondary (12th) | PCM + CS
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            2023 | Marks: 96%
          </p>
        </div>

        {/* 10th School */}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">
            St. Gregorios School
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Secondary (10th)
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            2021 | Marks: 98%
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationWidget;
