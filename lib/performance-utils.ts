// Performance optimization utilities for the app

/**
 * Preload images for better performance
 * Use this in components that need to preload images for optimal LCP
 */
export function preloadImage(src: string): void {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }
}

/**
 * Preload fonts for better performance
 * Use this to preload critical fonts
 */
export function preloadFont(href: string, crossOrigin = 'anonymous'): void {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = href;
    link.crossOrigin = crossOrigin;
    link.type = 'font/woff2';
    document.head.appendChild(link);
  }
}

/**
 * Debounce function for performance-critical operations
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle function for high-frequency events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Measure component performance
 * Usage: const stopMeasure = measurePerformance('ComponentName');
 *        ... component code ...
 *        stopMeasure();
 */
export function measurePerformance(name: string): () => void {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark(`${name}-start`);
    
    return () => {
      performance.mark(`${name}-end`);
      try {
        performance.measure(name, `${name}-start`, `${name}-end`);
        const measure = performance.getEntriesByName(name)[0];
        if (measure) {
          console.log(`⏱️ ${name}: ${measure.duration.toFixed(2)}ms`);
        }
      } catch (error) {
        console.error(`Error measuring ${name}:`, error);
      }
    };
  }
  
  return () => {};
}

/**
 * Check if user prefers reduced motion
 * Usage: if (prefersReducedMotion()) { disableAnimations(); }
 */
export function prefersReducedMotion(): boolean {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
}

/**
 * Intersection Observer helper for lazy loading
 */
export function createLazyLoadObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };
  
  return new IntersectionObserver(callback, defaultOptions);
}

/**
 * Get optimal image size based on device
 */
export function getOptimalImageSize(): 'small' | 'medium' | 'large' {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width < 640) return 'small';
    if (width < 1024) return 'medium';
    return 'large';
  }
  return 'medium';
}

/**
 * Check if network connection is slow
 */
export async function isSlowNetwork(): Promise<boolean> {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return connection.effectiveType === '4g' 
      ? false 
      : connection.saveData === true;
  }
  return false;
}

/**
 * Report Web Vitals to analytics
 */
export function reportWebVitals(metric: {
  name: string;
  value: number;
  id: string;
  label: string;
}): void {
  // Send to your analytics service
  if (typeof window !== 'undefined') {
    // Example: send to Google Analytics
    if ('gtag' in window) {
      (window as any).gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(metric.value),
        event_label: metric.id,
      });
    }
  }
}
