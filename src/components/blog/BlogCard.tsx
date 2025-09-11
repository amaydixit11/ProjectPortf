// src/components/blog/BlogCard.tsx
import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, User } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/utils/blog';
import Image from 'next/image';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="group">
      <div className="flex gap-4 py-4">
        {/* Square Thumbnail */}
        <div className="w-16 h-16 flex-shrink-0">
          <Link href={`/blog/${post.slug}`}>
            <div className="relative w-full h-full overflow-hidden rounded bg-gray-100 dark:bg-gray-800 cursor-pointer">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                  sizes="64px"
                  width={64}
                  height={64}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <span className="text-lg font-bold text-gray-600 dark:text-gray-400">
                    {post.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Date and Category */}
          <div className="flex items-center gap-2 mb-1 text-xs text-gray-600 dark:text-gray-400">
            <Calendar size={12} />
            <span>{formatDate(post.date)}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-0.5 rounded text-xs font-medium">
              {post.category.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 hover:text-[var(--color-primary)] transition-colors cursor-pointer leading-tight mb-2 line-clamp-2">
              {post.title}
            </h2>
          </Link>

          {/* Excerpt */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {post.excerpt}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{post.readingTime}</span>
            </div>
            {post.author && (
              <div className="flex items-center gap-1">
                <User size={12} />
                <span>{post.author}</span>
              </div>
            )}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 self-start pt-1">
          <Link href={`/blog/${post.slug}`}>
            <div className="text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Separator line */}
      <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
    </article>
  );
};