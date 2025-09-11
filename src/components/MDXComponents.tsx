import React from "react";
import Link from "next/link";
import { MDXComponents as MDXComponentsType } from "mdx/types";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const language = className?.replace("language-", "") || "";

  return (
    <div className="relative">
      {language && (
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-t-lg font-mono">
          {language}
        </div>
      )}
      <pre
        className={`bg-gray-100 dark:bg-gray-800 p-4 rounded-lg ${
          language ? "rounded-tl-none" : ""
        } overflow-x-auto`}
      >
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
};

// Use stricter typing for CustomLink to avoid ref conflicts
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: React.ReactNode;
};

const CustomLink = ({ href, children, ...props }: AnchorProps) => {
  if (href?.startsWith("http") || href?.startsWith("//")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href || "#"} {...props}>
      {children}
    </Link>
  );
};

// Use stricter typing for CustomImage
type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  children?: React.ReactNode;
};

const CustomImage = ({ src, children, ...props }: ImageProps) => {
  if (!src) return null;
  return <img src={src} {...props} />;
};

// Use consistent props typing for all components
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  children?: React.ReactNode;
};

type GenericProps<T extends HTMLElement> = React.HTMLAttributes<T> & {
  children?: React.ReactNode;
};

export const MDXComponents: MDXComponentsType = {
  h1: ({ children, ...props }: HeadingProps) => (
    <h1
      className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 mt-8"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <h2
      className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <h3
      className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-6"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: GenericProps<HTMLParagraphElement>) => (
    <p
      className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }: GenericProps<HTMLUListElement>) => (
    <ul
      className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: GenericProps<HTMLOListElement>) => (
    <ol
      className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: GenericProps<HTMLLIElement>) => (
    <li className="mb-1" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: GenericProps<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 dark:bg-blue-900/20 italic text-gray-700 dark:text-gray-300"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...rest }: GenericProps<HTMLElement>) => {
    if (!className) {
      return (
        <code
          className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono"
          {...rest}
        >
          {children}
        </code>
      );
    }
    return <CodeBlock className={className}>{children}</CodeBlock>;
  },
  // Fix pre to use HTMLPreElement props and render a <pre> element
  pre: ({ children, ...props }: GenericProps<HTMLPreElement>) => (
    <pre
      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"
      {...props}
    >
      {children}
    </pre>
  ),
  a: CustomLink,
  img: CustomImage,
  hr: ({ ...props }: GenericProps<HTMLHRElement>) => (
    <hr className="border-gray-200 dark:border-gray-700 my-8" {...props} />
  ),
  table: ({ children, ...props }: GenericProps<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-4">
      <table
        className="min-w-full border-collapse border border-gray-200 dark:border-gray-700"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: GenericProps<HTMLTableCellElement>) => (
    <th
      className="border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left font-semibold"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: GenericProps<HTMLTableCellElement>) => (
    <td
      className="border border-gray-200 dark:border-gray-700 px-4 py-2"
      {...props}
    >
      {children}
    </td>
  ),
};