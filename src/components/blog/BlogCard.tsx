// src/components/blog/BlogCard.tsx
import React from 'react';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/utils/blog';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              {post.title}
            </h2>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Link
                key={index}
                href={`/blog/tag/${tag.toLowerCase()}`}
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{post.readingTime}</span>
          </div>
        </div>

        {/* Read More Link */}
        <div className="pt-2">
          <Link
            href={`/blog/${post.slug}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
};