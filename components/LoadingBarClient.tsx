// app/components/LoadingBarClient.tsx
"use client";

import { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { usePathname } from 'next/navigation';

export default function LoadingBarClient() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPathname) {
      setProgress(100);
      setPrevPathname(pathname);
      const timer = setTimeout(() => setProgress(100), 300);
      const hideLoader = setTimeout(() => setProgress(0), 1000); // Hide after 1 second
      return () => {
        clearTimeout(timer);
        clearTimeout(hideLoader);
      };
    }
  }, [pathname, prevPathname]);

  return (
    <LoadingBar
      color="rgb(180, 130, 251)"
      progress={progress}
      waitingTime={1200}
      onLoaderFinished={() => setProgress(0)}
    />
  );
}
