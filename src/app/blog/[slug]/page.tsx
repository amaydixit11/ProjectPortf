// src/app/blog/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { formatDate } from '@/utils/blog';
import { MDXComponents } from '@/components/MDXComponents';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Metadata } from 'next';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Amay Dixit`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-8 min-h-screen mt-10">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-2">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <article className="bg-white dark:bg-gray-900 rounded-lg p-6">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 overflow-hidden">
              {post.title}
            </h1>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readingTime}</span>
              </div>
              {post.author && (
                <div>
                  <span>By {post.author}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <Tag size={16} className="text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
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

            {/* Excerpt */}
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-50 dark:bg-blue-900/20 py-2 rounded-r">
              {post.excerpt}
            </p>
          </header>

          {/* Article Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <MDXRemote source={post.content} components={MDXComponents} />
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <Link
                href="/blog"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                ← Back to all posts
              </Link>
              
              <div className="text-sm text-gray-500 dark:text-gray-500">
                Found this helpful? Share it with others!
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}