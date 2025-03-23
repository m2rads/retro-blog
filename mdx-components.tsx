import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-bold mt-8 mb-4">{children}</h2>,
    p: ({ children }) => <p className="mb-4">{children}</p>,
    pre: ({ children }) => (
      <pre className="p-4 my-4 overflow-x-auto bg-gray-100 dark:bg-gray-900 border border-black dark:border-white">
        {children}
      </pre>
    ),
    code: ({ children }) => <code>{children}</code>,
    ...components,
  }
} 