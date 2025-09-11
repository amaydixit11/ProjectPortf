import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { BlogPost, BlogPostMetadata } from "@/types/blog";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

// Ensure the blog directory exists
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const readTime = readingTime(content);
    const metadata = data as BlogPostMetadata;

    return {
      slug,
      title: metadata.title,
      excerpt: metadata.excerpt,
      content,
      date: metadata.date,
      tags: metadata.tags || [],
      readingTime: readTime.text,
      published: metadata.published ?? true,
      author: metadata.author,
      coverImage: metadata.coverImage,
      category: metadata.category || "General",
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}
export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "All") return getAllPosts();
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categorySet = new Set<string>();
  posts.forEach((post) => {
    categorySet.add(post.category);
  });
  const categories = Array.from(categorySet).sort();
  return ["All", ...categories];
}
