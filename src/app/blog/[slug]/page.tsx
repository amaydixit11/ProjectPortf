import React from "react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatDate } from "@/utils/blog";
import { MDXComponents } from "@/components/MDXComponents";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  BookOpen,
  TrendingUp,
  MessageCircle,
  Eye,
  Heart,
  User,
  Rss,
} from "lucide-react";
import { Metadata } from "next";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import {
  CategoriesWidget,
  NewsletterWidget,
  PopularPostsWidget,
  QuickActionsWidget,
  ReadingProgressWidget,
  RelatedPostsWidget,
  TableOfContentsWidget,
  TechStackWidget,
} from "@/components/blog/BlogWidgets";

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

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
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
    <div className="py-8 min-h-screen mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-8">
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

          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {post.excerpt}
            </p>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
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

          {/* Article Content */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Article
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-code:text-primary">
              <MDXRemote source={post.content} components={MDXComponents} />
            </div>
          </div>

          {/* Article Footer */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              What&apos;s Next?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Found this article helpful? Check out my other posts or reach out
              if you have questions. I&apos;m always happy to discuss
              technology, system design, and development practices.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Link
                href="/blog"
                className="text-primary hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                ← Back to all posts
              </Link>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Widgets */}
        <div className="space-y-4">
          <QuickActionsWidget title={post.title} slug={params.slug} />
          <TableOfContentsWidget />
          <PopularPostsWidget />
          <TechStackWidget />
          <RelatedPostsWidget />
          <NewsletterWidget />
        </div>
      </div>
    </div>
  );
}
