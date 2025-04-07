import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { ArrowRight, Github } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Author } from "@/components/author"
import matter from 'gray-matter'

type BlogPost = {
  slug: string
  title: string
  date: string
  description: string
}

type GitHubProject = {
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
}

async function getGitHubProjects(): Promise<GitHubProject[]> {
  const response = await fetch('https://api.github.com/users/m2rads/repos?sort=stars&per_page=2')
  const projects = await response.json()
  return projects
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'content/posts')
  const files = await fs.readdir(postsDirectory)
  
  const posts = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(async file => {
        const filePath = path.join(postsDirectory, file)
        const source = await fs.readFile(filePath, 'utf8')
        const { data } = matter(source)
        
        return {
          slug: file.replace('.mdx', ''),
          title: data.title,
          date: data.date,
          description: data.description
        }
      })
  )
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default async function Home() {
  const posts = await getBlogPosts()
  const projects = await getGitHubProjects()
  
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 font-mono">
      <header className="mb-12 border-b-2 border-black dark:border-white pb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold uppercase tracking-tight">CODE JOURNAL</h1>
          <ThemeToggle />
        </div>
        <p className="mt-2 text-sm uppercase tracking-widest">THOUGHTS ON SOFTWARE ENGINEERING</p>
      </header>

      <Author />

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 uppercase tracking-tight">Featured Projects</h2>
        <div className="grid gap-6">
          {projects.map((project) => (
            <div key={project.name} className="border-l-2 border-black dark:border-white pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Github className="h-4 w-4" />
                <h3 className="text-xl font-bold">{project.name}</h3>
              </div>
              <p className="mb-2 text-gray-600 dark:text-gray-300">{project.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-500 dark:text-gray-400">{project.language}</span>
                <span className="text-gray-500 dark:text-gray-400">★ {project.stargazers_count}</span>
                <Link
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center hover:underline"
                >
                  View Project <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <ul className="space-y-12">
          {posts.map((post) => (
            <li key={post.slug} className="border-l-2 border-black dark:border-white pl-4">
              <article>
                <div className="text-xs uppercase tracking-widest mb-1">{post.date}</div>
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="mb-3 text-gray-600 dark:text-gray-300">{post.description}</p>
                <Link
                  href={`/posts/${post.slug}`}
                  className="inline-flex items-center text-sm uppercase tracking-wider hover:underline"
                >
                  READ MORE <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

