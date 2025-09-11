'use client';

import React, { useState, useMemo } from 'react';
import { BlogCard } from './BlogCard';
import { BlogPost } from '@/types/blog';
import { highlightText } from '@/utils/highlightText';
import { Filter, Search, Tag } from 'lucide-react';
import Link from 'next/link';

interface BlogPageClientProps {
  posts: BlogPost[];
  tags: string[];
  categories: string[];
}

export const BlogPageClient: React.FC<BlogPageClientProps> = ({ posts, tags, categories }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    let filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  }, [posts, activeCategory, searchQuery]);

  const getCategoryCount = (category: string) => {
    if (category === 'All') return posts.length;
    return posts.filter(post => post.category === category).length;
  };

  return (
    <div className="py-8 min-h-screen mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Header */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 overflow-hidden">
                Blog
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Just my thoughts and 
                Sharing what I learn while building things.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            {/* Category Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 overflow-hidden">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {categories.map((category) => {
                  const postCount = getCategoryCount(category);
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeCategory === category
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      {category}
                      <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                        {postCount}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Blog Posts */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-0">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {searchQuery ? `Search Results (${filteredPosts.length})` : 
                   activeCategory === 'All' ? `All Posts (${filteredPosts.length})` : 
                   `${activeCategory} (${filteredPosts.length})`}
                </h2>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    Clear search
                  </button>
                )}
              </div>
              <div className="space-y-0">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="space-y-4">
                <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {searchQuery ? 'No posts found' : 'Coming Soon'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  {searchQuery 
                    ? `No posts match "${searchQuery}". Try a different search term or browse by category.`
                    : `I'm working on some interesting posts about system design, backend development, and my experiences with open source. Check back soon!`
                  }
                </p>
                {!searchQuery && (
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
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Quick Stats
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Posts</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{posts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Categories</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{categories.length - 1}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tags</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{tags.length}</span>
              </div>
            </div>
          </div>

          {/* Categories Widget */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Filter size={18} />
              Categories
            </h3>
            <div className="space-y-2">
              {categories.filter(cat => cat !== 'All').map((category) => {
                const count = getCategoryCount(category);
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full flex justify-between items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                      activeCategory === category
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span>{category}</span>
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags Widget */}
          {tags.length > 0 && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Tag size={18} />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 10).map((tag, index) => (
                  <Link
                    key={index}
                    href={`/blog/tag/${tag.toLowerCase()}`}
                    className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
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
};