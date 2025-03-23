import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { SocialLinks } from "@/components/social-links"

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 font-mono">
      <div className="flex justify-end mb-8 space-x-2">
        <SocialLinks />
        <ThemeToggle />
      </div>
      <div className="border-2 border-black dark:border-white p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="mb-6">PAGE NOT FOUND</p>
        <Link
          href="/"
          className="inline-block border-2 border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          RETURN HOME
        </Link>
      </div>
    </main>
  )
}

