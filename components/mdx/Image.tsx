"use client";

import NextImage from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function Image({ src, alt, width, height, className }: ImageProps) {
  return (
    <div className="my-8 overflow-hidden rounded-md border border-black dark:border-white">
      <AspectRatio ratio={16 / 9}>
        <NextImage
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </AspectRatio>
    </div>
  );
} 