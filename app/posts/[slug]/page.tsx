import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Author } from "@/components/author"
import { promises as fs } from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'

type PostFrontmatter = {
  title: string
  date: string
  description: string
}

async function getPost(slug: string) {
  const filePath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`)
  
  try {
    const source = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(source)
    const { content: mdxContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: false }
    })
    
    return { 
      content: mdxContent,
      frontmatter: data as PostFrontmatter
    }
  } catch (error) {
    return null
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 font-mono">
      <div className="flex justify-between items-center mb-8">
        <Link href="/" className="inline-flex items-center text-sm uppercase tracking-wider hover:underline">
          <ArrowLeft className="mr-1 h-3 w-3" /> BACK TO POSTS
        </Link>
        <ThemeToggle />
      </div>

      <article>
        <header className="mb-8 border-b-2 border-black dark:border-white pb-4">
          <div className="text-xs uppercase tracking-widest mb-2">{post.frontmatter.date}</div>
          <h1 className="text-3xl font-bold">{post.frontmatter.title}</h1>
        </header>

        <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-black dark:prose-pre:border-white">
          {post.content}
        </div>

        <footer className="mt-12 pt-8 border-t-2 border-black dark:border-white">
          <h3 className="text-lg font-bold mb-4 uppercase">About the Author</h3>
          <Author />
        </footer>
      </article>
    </main>
  )
}

