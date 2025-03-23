import Image from "next/image"
import { SocialLinks } from "./social-links"

export function Author() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-2 border-black dark:border-white p-4 my-8">
      <div className="relative w-24 h-24 overflow-hidden border-2 border-black dark:border-white">
        <Image src="https://github.com/m2rads.png" alt="Mohammad Rad" fill className="object-cover" priority />
      </div>
      <div className="text-center sm:text-left">
        <h3 className="text-lg font-bold">Mohammad Rad</h3>
        <p className="text-sm mb-3">Building what I can understand.</p>
        <SocialLinks compact />
      </div>
    </div>
  )
}

