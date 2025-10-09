"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function LoadingBarClient() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    // Start loading when pathname changes
    if (pathname !== prevPathname) {
      setLoading(true);
      
      // Complete loading after 300ms
      const timer = setTimeout(() => {
        setLoading(false);
        setPrevPathname(pathname);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, prevPathname]);

  if (!loading) return null;

  return <LoadingSpinner />;
}
