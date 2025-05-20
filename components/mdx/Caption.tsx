export function Caption({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
      {children}
    </div>
  );
} 