// components/widgets/StatusWidget.tsx
import React from "react";
import { Activity, Code } from "lucide-react";
import { CurrentActivity } from "@/types/about";
import Link from "next/link";

interface StatusWidgetProps {
  activity: CurrentActivity;
}

export const StatusWidget: React.FC<StatusWidgetProps> = ({ activity }) => (
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
          {activity.status}
        </span>
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-400">
        Working on <Link href={activity.link}> {activity.project} </Link>
      </div>
      <div className="flex items-center gap-1">
        <Code size={12} className="text-gray-500" />
        <span className="text-xs text-gray-500">{activity.language}</span>
      </div>
    </div>
  </div>
);
