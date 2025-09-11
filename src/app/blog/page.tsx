// src/app/blog/page.tsx
import React from 'react';
import { BlogCard } from '@/components/blog/BlogCard';
import { getAllPosts, getAllTags } from '@/utils/blog';
import { highlightText } from '@/utils/highlightText';
import Link from 'next/link';
import { Tag } from 'lucide-react';

export const metadata = {
  title: 'Blog - Amay Dixit',
  description: 'Thoughts on technology, system design, and software development.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="py-8 min-h-screen mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Blog
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Thoughts on {highlightText("technology")}, {highlightText("system design")}, and {highlightText("software development")}. 
              Sharing what I learn while building things.
            </p>
          </div>

          {/* Blog Posts */}
          {posts.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Recent Posts ({posts.length})
              </h2>
              <div className="space-y-6">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Coming Soon
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  I'm working on some interesting posts about system design, backend development, and my experiences with open source. 
                  Check back soon!
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  In the meantime, feel free to check out my{" "}
                  <Link href="/projects" className="text-blue-600 dark:text-blue-400 hover:underline">
                    projects
                  </Link>{" "}
                  or connect with me on{" "}
                  <a 
                    href="https://x.com/AmayDixit11" 
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    X
                  </a>
                  .
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tags Widget */}
          {tags.length > 0 && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Tag size={18} />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/blog/tag/${tag.toLowerCase()}`}
                    className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* About Widget */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              About This Blog
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              I write about my experiences building backend systems, exploring new technologies, 
              and contributing to open source projects. Expect technical deep-dives, lessons learned, 
              and occasional thoughts on the dev life.
            </p>
          </div>

          {/* Subscribe Widget */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Follow me on X for updates when I publish new posts.
            </p>
            <a
              href="https://x.com/AmayDixit11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Follow on X
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}