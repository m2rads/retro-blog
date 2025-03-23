import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Author } from "@/components/author"

export default function Home() {
  const posts = [
    {
      id: 1,
      title: "Understanding Functional Programming",
      date: "March 10, 2025",
      excerpt: "An exploration of functional programming principles and how they can improve your code quality.",
      slug: "understanding-functional-programming",
    },
    {
      id: 2,
      title: "The Evolution of JavaScript",
      date: "February 28, 2025",
      excerpt:
        "Looking back at how JavaScript has evolved from a simple scripting language to a powerful tool for modern web development.",
      slug: "evolution-of-javascript",
    },
    {
      id: 3,
      title: "Building Resilient Systems",
      date: "February 15, 2025",
      excerpt:
        "Techniques and patterns for creating systems that can withstand failures and continue operating effectively.",
      slug: "building-resilient-systems",
    },
    {
      id: 4,
      title: "The Art of Clean Code",
      date: "January 30, 2025",
      excerpt: "Principles and practices for writing code that is maintainable, readable, and elegant.",
      slug: "art-of-clean-code",
    },
  ]

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

      <section>
        <ul className="space-y-12">
          {posts.map((post) => (
            <li key={post.id} className="border-l-2 border-black dark:border-white pl-4">
              <article>
                <div className="text-xs uppercase tracking-widest mb-1">{post.date}</div>
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="mb-3">{post.excerpt}</p>
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

