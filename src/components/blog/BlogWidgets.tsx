"use client"

import { formatDate } from "@/utils/blog";
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
import Link from "next/link";
import React from "react";

// Table of Contents Widget
export const TableOfContentsWidget: React.FC = () => {
  // This would typically be generated from the post content
  const tocItems = [
    { id: "introduction", title: "Introduction", level: 1 },
    { id: "main-concept", title: "Main Concept", level: 1 },
    { id: "implementation", title: "Implementation", level: 2 },
    { id: "best-practices", title: "Best Practices", level: 2 },
    { id: "conclusion", title: "Conclusion", level: 1 },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <BookOpen size={18} />
        Table of Contents
      </h3>
      <nav className="space-y-2">
        {tocItems.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className={`block text-sm hover:text-primary transition-colors ${
              item.level === 1
                ? "text-gray-700 dark:text-gray-300 font-medium"
                : "text-gray-600 dark:text-gray-400 ml-4"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

// Share Widget
export const ShareWidget: React.FC<{ title: string; slug: string }> = ({
  title,
  slug,
}) => {
  const shareUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/blog/${slug}`;

  const shareLinks = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(shareUrl)}`,
      color: "hover:text-blue-500",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      color: "hover:text-blue-700",
    },
    {
      name: "Copy Link",
      url: "#",
      color: "hover:text-gray-700 dark:hover:text-gray-300",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Share2 size={18} />
        Share Article
      </h3>
      <div className="space-y-3">
        {shareLinks.map((link) => (
          <button
            key={link.name}
            className={`w-full text-left text-sm text-gray-600 dark:text-gray-400 ${link.color} transition-colors p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800`}
            onClick={() => {
              if (link.name === "Copy Link") {
                navigator.clipboard.writeText(shareUrl);
              } else {
                window.open(link.url, "_blank", "noopener,noreferrer");
              }
            }}
          >
            {link.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// Related Posts Widget
export const RelatedPostsWidget: React.FC = () => {
  // Mock related posts - in real app, this would be fetched based on tags or categories
  const relatedPosts = [
    {
      title: "Understanding React Server Components",
      slug: "react-server-components",
      readingTime: "8 min read",
      date: "2024-01-15",
    },
    {
      title: "Next.js 14: What's New",
      slug: "nextjs-14-whats-new",
      readingTime: "6 min read",
      date: "2024-01-10",
    },
    {
      title: "Building Scalable APIs",
      slug: "building-scalable-apis",
      readingTime: "12 min read",
      date: "2024-01-05",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <TrendingUp size={18} />
        Related Posts
      </h3>
      <div className="space-y-4">
        {relatedPosts.map((post, index) => (
          <Link key={index} href={`/blog/${post.slug}`} className="block group">
            <div className="pb-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm group-hover:text-primary transition-colors mb-1">
                {post.title}
              </h4>
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                <span>{formatDate(post.date)}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="pt-3 border-t border-gray-200 dark:border-gray-700 mt-4">
        <Link
          href="/blog"
          className="text-sm text-primary hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
        >
          View all posts <ArrowLeft size={12} className="rotate-180" />
        </Link>
      </div>
    </div>
  );
};

// Author Widget
export const AuthorWidget: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <User size={18} />
        About the Author
      </h3>
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg">
          AD
        </div>
        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
          Amay Dixit
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Backend Engineer & Open Source Enthusiast
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
          B.Tech CSE @ IIT Bhilai. Passionate about system design and scalable
          applications.
        </p>
        <div className="flex gap-2 justify-center">
          <Link
            href="https://github.com/amaydixit11"
            className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://twitter.com/AmayDixit11"
            className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Twitter
          </Link>
        </div>
      </div>
    </div>
  );
};

// Newsletter Widget
export const NewsletterWidget: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
        <Rss size={18} />
        Stay Updated
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Get notified when I publish new articles about web development and
        system design.
      </p>
      <div className="space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <button className="w-full px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  );
};

// Reading Progress Widget
export const ReadingProgressWidget: React.FC = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const maxHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Eye size={18} />
        Reading Progress
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {progress < 100 ? "Keep reading!" : "Article completed! 🎉"}
        </p>
      </div>
    </div>
  );
};

// Popular Posts Widget
export const PopularPostsWidget: React.FC = () => {
  const popularPosts = [
    {
      title: "Building a REST API with Node.js",
      slug: "building-rest-api-nodejs",
      views: "2.3k",
      readingTime: "10 min read",
    },
    {
      title: "Docker Best Practices for Production",
      slug: "docker-production-best-practices",
      views: "1.8k",
      readingTime: "8 min read",
    },
    {
      title: "Understanding Database Indexing",
      slug: "database-indexing-guide",
      views: "1.5k",
      readingTime: "12 min read",
    },
    {
      title: "System Design Fundamentals",
      slug: "system-design-fundamentals",
      views: "1.2k",
      readingTime: "15 min read",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <TrendingUp size={18} />
        Popular Posts
      </h3>
      <div className="space-y-4">
        {popularPosts.map((post, index) => (
          <Link key={index} href={`/blog/${post.slug}`} className="block group">
            <div className="pb-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary text-xs font-bold rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm group-hover:text-primary transition-colors mb-1 line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye size={10} />
                      {post.views}
                    </span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Tech Stack Widget
export const TechStackWidget: React.FC = () => {
  const techStack = [
    { name: "TypeScript", category: "Language", color: "bg-blue-500" },
    { name: "React", category: "Frontend", color: "bg-cyan-500" },
    { name: "Next.js", category: "Framework", color: "bg-gray-800" },
    { name: "Node.js", category: "Backend", color: "bg-green-500" },
    { name: "Python", category: "Language", color: "bg-yellow-500" },
    { name: "PostgreSQL", category: "Database", color: "bg-indigo-500" },
    { name: "Docker", category: "DevOps", color: "bg-blue-600" },
    { name: "AWS", category: "Cloud", color: "bg-orange-500" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <BookOpen size={18} />
        Tech Stack
      </h3>
      <div className="space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Technologies I frequently write about and work with:
        </p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <div key={index} className="group relative">
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className={`w-2 h-2 rounded-full ${tech.color}`} />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {tech.name}
                </span>
              </div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {tech.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Quick Actions Widget
// Minimalist Quick Actions Widget
export const QuickActionsWidget: React.FC<{ title: string; slug: string }> = ({
  title,
  slug,
}) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [showCopied, setShowCopied] = React.useState(false);

  const handleShare = () => {
    const shareUrl = `${
      typeof window !== "undefined" ? window.location.origin : ""
    }/blog/${slug}`;
    navigator.clipboard.writeText(shareUrl);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleTwitter = () => {
    const shareUrl = `${
      typeof window !== "undefined" ? window.location.origin : ""
    }/blog/${slug}`;
    const tweetText = `Just read "${title}" by @AmayDixit11\n\n${shareUrl}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`,
      "_blank"
    );
  };

  return (
    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/60 dark:border-gray-800/60 rounded-xl p-4">
      {/* Compact action buttons in a row */}
      <div className="flex items-center justify-between gap-2">
        {/* Like */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200"
          title={isLiked ? "Unlike" : "Like this post"}
        >
          <Heart
            size={18}
            className={`transition-all duration-200 ${
              isLiked
                ? "text-red-500 fill-red-500 scale-110"
                : "text-gray-400 dark:text-gray-500 group-hover:text-red-500 group-hover:scale-105"
            }`}
          />
        </button>

        {/* Bookmark */}
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all duration-200"
          title={isBookmarked ? "Remove bookmark" : "Bookmark"}
        >
          <BookOpen
            size={18}
            className={`transition-all duration-200 ${
              isBookmarked
                ? "text-amber-500 fill-amber-100 scale-110"
                : "text-gray-400 dark:text-gray-500 group-hover:text-amber-500 group-hover:scale-105"
            }`}
          />
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-200"
          title={showCopied ? "Link copied!" : "Copy link"}
        >
          <Share2
            size={18}
            className={`transition-all duration-200 ${
              showCopied
                ? "text-green-500 scale-110"
                : "text-gray-400 dark:text-gray-500 group-hover:text-blue-500 group-hover:scale-105"
            }`}
          />
        </button>

        {/* Twitter */}
        <button
          onClick={handleTwitter}
          className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-all duration-200"
          title="Share on Twitter"
        >
          <MessageCircle
            size={18}
            className="text-gray-400 dark:text-gray-500 group-hover:text-sky-500 group-hover:scale-105 transition-all duration-200"
          />
        </button>
      </div>

      {/* Subtle feedback text */}
      {(isLiked || isBookmarked || showCopied) && (
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 animate-in fade-in duration-300">
            {showCopied && "Link copied to clipboard"}
            {isLiked && !showCopied && "Thanks for the like! ❤️"}
            {isBookmarked && !showCopied && !isLiked && "Bookmarked for later"}
          </p>
        </div>
      )}
    </div>
  );
};
// Categories Widget
export const CategoriesWidget: React.FC = () => {
  const categories = [
    { name: "Web Development", count: 12, slug: "web-development" },
    { name: "System Design", count: 8, slug: "system-design" },
    { name: "Backend Engineering", count: 10, slug: "backend" },
    { name: "DevOps", count: 6, slug: "devops" },
    { name: "Database", count: 5, slug: "database" },
    { name: "API Design", count: 7, slug: "api-design" },
    { name: "Performance", count: 4, slug: "performance" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Tag size={18} />
        Categories
      </h3>
      <div className="space-y-2">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/blog/category/${category.slug}`}
            className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
          >
            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary">
              {category.name}
            </span>
            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full">
              {category.count}
            </span>
          </Link>
        ))}
      </div>
      <div className="pt-3 border-t border-gray-200 dark:border-gray-700 mt-4">
        <Link
          href="/blog"
          className="text-sm text-primary hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
        >
          View all posts <ArrowLeft size={12} className="rotate-180" />
        </Link>
      </div>
    </div>
  );
};
