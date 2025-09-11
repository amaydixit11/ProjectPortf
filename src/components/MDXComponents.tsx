// src/components/MDXComponents.tsx
import React, { ComponentProps } from 'react';
import Link from 'next/link';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const language = className?.replace('language-', '') || '';
  
  return (
    <div className="relative">
      {language && (
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-t-lg font-mono">
          {language}
        </div>
      )}
      <pre className={`bg-gray-100 dark:bg-gray-800 p-4 rounded-lg ${language ? 'rounded-tl-none' : ''} overflow-x-auto`}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
};

// Anchor
const CustomLink = ({ href, ...props }: ComponentProps<'a'>) => {
  if (href?.startsWith('http') || href?.startsWith('//')) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  }
  return <Link href={href || '#'} {...props} />;
};

// Image
const CustomImage = (props: ComponentProps<'img'>) => {
  if (!props.src) return null;
  return <img {...props} />;
};

export const MDXComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 mt-8">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="mb-1">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 dark:bg-blue-900/20 italic text-gray-700 dark:text-gray-300">
      {children}
    </blockquote>
  ),
  code: ({ children, className }: CodeBlockProps) => {
    // If it's an inline code (no className with language-)
    if (!className) {
      return (
        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      );
    }
    
    // Block code
    return <CodeBlock className={className}>{children}</CodeBlock>;
  },
  pre: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div> // The CodeBlock component handles the pre styling
  ),
  a: CustomLink,
  img: CustomImage,
  hr: () => (
    <hr className="border-gray-200 dark:border-gray-700 my-8" />
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
      {children}
    </td>
  ),
};