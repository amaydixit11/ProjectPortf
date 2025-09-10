import React from 'react';
import { Headphones, Music } from 'lucide-react';
import { Track } from '@/types/about';

interface SpotifyWidgetProps {
  track: Track;
}

export const SpotifyWidget: React.FC<SpotifyWidgetProps> = ({ track }) => (
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
            {track.name}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
            {track.artist}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {track.isPlaying && (
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
);

