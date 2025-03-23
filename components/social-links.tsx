import { Github, Twitter } from "lucide-react"
import Link from "next/link"

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  const buttonClasses = compact
    ? "border border-black dark:border-white p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
    : "border-2 border-black dark:border-white p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"

  const iconSize = compact ? "h-3 w-3" : "h-4 w-4"

  return (
    <div className="flex space-x-2">
      <Link
        href="https://github.com/m2rads"
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        aria-label="GitHub Profile"
      >
        <Github className={iconSize} />
        <span className="sr-only">GitHub</span>
      </Link>
      <Link
        href="https://x.com/Mohrad23"
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        aria-label="X (Twitter) Profile"
      >
        <Twitter className={iconSize} />
        <span className="sr-only">X (Twitter)</span>
      </Link>
    </div>
  )
}

