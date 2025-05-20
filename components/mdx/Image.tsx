"use client";

import NextImage from "next/image";
import { useState, useEffect } from "react";
import { Caption } from "./Caption";

interface ImageProps {
  src: string;
  alt?: string;
  width?: number | null;
  height?: number | null;
  className?: string;
  priority?: boolean;
}

export function Image({ 
  src, 
  alt: originalAlt = "", 
  width: initialWidth = null, 
  height: initialHeight = null,
  className = "",
  priority = true
}: ImageProps) {
  const [dimensions, setDimensions] = useState<{width: number, height: number} | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Parse alt text for potential percentage
  let alt: string = originalAlt || "";
  let userScaleFactor = 1;
  
  const match = originalAlt?.match(/(.*) \[(\d+)%\]$/);
  if (match) {
    alt = match[1];
    userScaleFactor = parseInt(match[2]) / 100;
  }

  useEffect(() => {
    // Only fetch dimensions if width and height aren't provided
    if (initialWidth === null || initialHeight === null) {
      const img = new window.Image();
      img.onload = () => {
        setDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight
        });
        setLoading(false);
      };
      img.onerror = () => {
        console.error("Failed to load image for dimension calculation:", src);
        setLoading(false);
      };
      img.src = src;
    } else {
      setDimensions({
        width: initialWidth as number,
        height: initialHeight as number
      });
      setLoading(false);
    }
  }, [src, initialWidth, initialHeight]);

  // Determine if this is likely a diagram or technical image based on path
  const isDiagram = src.includes('diagram') || 
                    src.includes('testing') || 
                    src.includes('table') || 
                    src.includes('paradigm') ||
                    src.includes('given-when');

  // Default object-fit based on image type
  const objectFit = isDiagram ? 'contain' : 'cover';
  
  // If we're still loading dimensions or they weren't computed successfully
  if (loading || !dimensions) {
    return (
      <div className="my-5 flex flex-col items-center">
        <div className="w-full max-w-md h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md" />
      </div>
    );
  }

  // Apply the scaling factor to dimensions
  const scaledWidth = Math.round(dimensions.width * userScaleFactor);
  const scaledHeight = Math.round(dimensions.height * userScaleFactor);
  
  // Determine a reasonable max width
  const maxWidth = Math.min(scaledWidth, 700);
  
  return (
    <div className="my-5 flex flex-col items-center image-container">
      <div 
        className="overflow-hidden rounded-md border border-black dark:border-white" 
        style={{
          maxWidth: `${maxWidth}px`,
          width: '100%'
        }}
      >
        <div 
          className={`relative ${className}`} 
          style={{ 
            width: '100%',
            paddingBottom: `${(scaledHeight / scaledWidth) * 100}%`, // Maintain aspect ratio
          }}
        >
          <NextImage
            src={src}
            alt={alt}
            fill={true}
            style={{ objectFit }}
            sizes={`min(100vw, ${maxWidth}px)`}
            priority={priority}
            className={`bg-gray-50 dark:bg-gray-900 ${isDiagram ? 'p-2' : ''}`}
          />
        </div>
      </div>
      
      {alt && <Caption>{alt}</Caption>}
    </div>
  );
} 