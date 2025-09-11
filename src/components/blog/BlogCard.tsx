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
    <article className="group relative">
      <div className="flex flex-col md:flex-row gap-6 py-8 transition-all duration-300">
        {/* Thumbnail */}
        <div className="md:w-64 md:flex-shrink-0">
          <Link href={`/blog/${post.slug}`}>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 cursor-pointer">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 256px"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700">
                  <div className="text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {post.title.charAt(0)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {post.category}
                    </div>
                  </div>
                </div>
              )}
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-gray-100 rounded-md backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer leading-tight">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag, index) => (
                <Link
                  key={index}
                  href={`/blog/tag/${tag.toLowerCase()}`}
                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  {tag}
                </Link>
              ))}
              {post.tags.length > 4 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                  +{post.tags.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* Metadata and Read More */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{post.readingTime}</span>
              </div>
              {post.author && (
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{post.author}</span>
                </div>
              )}
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors group-hover:underline"
            >
              Read more →
            </Link>
          </div>
        </div>
      </div>
      
      {/* Separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
    </article>
  );
};