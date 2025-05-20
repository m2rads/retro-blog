"use client";

import { Tweet as ReactTweet } from "react-tweet";
import { TweetSkeleton } from "react-tweet"
import { useEffect } from "react";

interface TweetProps {
  id: string;
  caption?: React.ReactNode;
}

export function Tweet({ id, caption }: TweetProps) {
  // Add a useEffect to fix the avatar positioning after render
  useEffect(() => {
    // Small delay to ensure the tweet has rendered
    const timer = setTimeout(() => {
      // Fix profile image positioning
      const avatarImgs = document.querySelectorAll('.tweet-container img[src*="profile_images"]');
      avatarImgs.forEach(img => {
        const imgEl = img as HTMLImageElement;
        imgEl.style.objectFit = 'cover';
        imgEl.style.objectPosition = 'center';
        imgEl.style.position = 'absolute';
        imgEl.style.top = '0';
        imgEl.style.left = '0';
        imgEl.style.width = '100%';
        imgEl.style.height = '100%';
        imgEl.style.transform = 'none';
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <div className="my-6">
      <div className="flex justify-center">
        <div className="max-w-full w-full" style={{ maxWidth: "550px" }}>
          <div 
            className="overflow-hidden rounded-lg border dark:border-gray-800 tweet-container"
            style={{ maxHeight: "550px" }}
          >
            <ReactTweet id={id} fallback={<TweetSkeleton />} />
          </div>
        </div>
      </div>
      
      {caption && (
        <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {caption}
        </div>
      )}
    </div>
  );
} 