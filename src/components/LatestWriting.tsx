import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import { formatDate } from '@/utils/blog';

export const LatestWriting: React.FC = () => {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <section className="py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Latest Writing
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Thoughts, deep-dives, and lessons learned while building
            </p>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-primary hover:text-blue-700 font-medium transition-colors"
          >
            View All Posts
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Blog Posts */}
        <div className="space-y-4">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-900 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
            >
              <div className="space-y-3">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readingTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag size={14} className="text-gray-500 dark:text-gray-500" />
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
