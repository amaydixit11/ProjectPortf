// src/app/blog/page.tsx
import { getAllPosts, getAllTags, getAllCategories } from '@/lib/blog';
import { BlogPageClient } from '@/components/blog/BlogClient';

export default function BlogPage() {
  const posts = getAllPosts(); // server-only
  const tags = getAllTags();
  const categories = getAllCategories();

  return (
    <BlogPageClient 
      posts={posts} 
      tags={tags} 
      categories={categories} 
    />
  );
}