// src/types/blog.ts
// export interface BlogPost {
//   slug: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   date: string;
//   tags: string[];
//   readingTime: string;
//   published: boolean;
//   author?: string;
//   coverImage?: string;
//   category: string;
// }

export interface BlogPostMetadata {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  published: boolean;
  author?: string;
  coverImage?: string;
  category: string;
}

export interface BlogPost extends BlogPostMetadata {
  slug: string;
  content: string;
  readingTime: string;
}