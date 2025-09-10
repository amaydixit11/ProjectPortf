// components/widgets/QuickLinksWidget.tsx
import React from 'react';
import { Zap, Github, Code, Coffee, ExternalLink } from 'lucide-react';

const iconMap = {
  github: Github,
  code: Code,
  coffee: Coffee,
} as const;

interface QuickLink {
  href?: string;
  label: string;
  icon: keyof typeof iconMap;
  external?: boolean;
}

interface QuickLinksWidgetProps {
  links: QuickLink[];
}

export const QuickLinksWidget: React.FC<QuickLinksWidgetProps> = ({ links }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-2 mb-3">
      <Zap size={16} className="text-orange-500" />
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Quick Links
      </span>
    </div>
    <div className="space-y-2">
      {links.map((link, index) => {
        const IconComponent = iconMap[link.icon];
        
        if (link.href) {
          return (
            <a
              key={index}
              href={link.href}
              className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              <IconComponent size={12} />
              <span>{link.label}</span>
              {link.external && <ExternalLink size={10} />}
            </a>
          );
        }
        
        return (
          <div key={index} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <IconComponent size={12} />
            <span>{link.label}</span>
          </div>
        );
      })}
    </div>
  </div>
);