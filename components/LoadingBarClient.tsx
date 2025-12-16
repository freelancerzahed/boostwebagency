"use client";

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function LoadingBarClient() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only show loading spinner if navigation takes more than 500ms
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setIsVisible(false);
    };
  }, [pathname]);

  if (!isVisible) return null;

  return <LoadingSpinner />;
}
