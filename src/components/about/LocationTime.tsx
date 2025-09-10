// components/widgets/LocationTimeWidget.tsx
import React from 'react';
import { MapPin, Clock } from 'lucide-react';

interface LocationTimeWidgetProps {
  location: string;
  currentTime: string;
}

export const LocationTimeWidget: React.FC<LocationTimeWidgetProps> = ({
  location,
  currentTime
}) => (
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
          {location}
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
);