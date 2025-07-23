// Performance optimization utilities

// Image lazy loading with intersection observer
export class LazyImageLoader {
  private observer: IntersectionObserver | null = null;
  private images: Set<HTMLImageElement> = new Set();

  constructor() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              this.loadImage(img);
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      );
    }
  }

  observe(img: HTMLImageElement) {
    if (this.observer && img.dataset.src) {
      this.images.add(img);
      this.observer.observe(img);
    }
  }

  unobserve(img: HTMLImageElement) {
    if (this.observer) {
      this.images.delete(img);
      this.observer.unobserve(img);
    }
  }

  private loadImage(img: HTMLImageElement) {
    const src = img.dataset.src;
    if (src) {
      img.src = src;
      img.removeAttribute('data-src');
      img.classList.add('loaded');
      this.unobserve(img);
    }
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.images.clear();
    }
  }
}

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
};

// Throttle function for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Memory usage monitoring
export const getMemoryUsage = (): any | null => {
  if ('memory' in performance) {
    return (performance as any).memory;
  }
  return null;
};

// Performance metrics
export const measurePerformance = (name: string, fn: () => void): number => {
  const start = performance.now();
  fn();
  const end = performance.now();
  const duration = end - start;
  
  console.log(`${name} took ${duration.toFixed(2)} milliseconds`);
  return duration;
};

// Resource hints for preloading
export const preloadResource = (href: string, as: string, crossorigin?: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (crossorigin) link.crossOrigin = crossorigin;
  document.head.appendChild(link);
};

export const prefetchResource = (href: string): void => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};

// Bundle splitting helpers
export const loadChunk = async (chunkName: string): Promise<any> => {
  try {
    const module = await import(
      /* webpackChunkName: "[request]" */
      `../components/${chunkName}`
    );
    return module.default || module;
  } catch (error) {
    console.error(`Failed to load chunk: ${chunkName}`, error);
    throw error;
  }
};

// Virtual scrolling helper
export class VirtualScroller {
  private container: HTMLElement;
  private itemHeight: number;
  private visibleCount: number;
  private scrollTop: number = 0;
  private items: any[] = [];

  constructor(container: HTMLElement, itemHeight: number) {
    this.container = container;
    this.itemHeight = itemHeight;
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight) + 2;
  }

  setItems(items: any[]) {
    this.items = items;
    this.updateContainer();
  }

  onScroll(scrollTop: number) {
    this.scrollTop = scrollTop;
    this.updateVisibleItems();
  }

  private updateContainer() {
    const totalHeight = this.items.length * this.itemHeight;
    this.container.style.height = `${totalHeight}px`;
  }

  private updateVisibleItems() {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = Math.min(startIndex + this.visibleCount, this.items.length);
    
    return {
      startIndex,
      endIndex,
      visibleItems: this.items.slice(startIndex, endIndex),
      offsetY: startIndex * this.itemHeight
    };
  }

  getVisibleRange() {
    return this.updateVisibleItems();
  }
}

// Web Workers helper
export const createWebWorker = (workerFunction: Function): Worker => {
  const blob = new Blob([`(${workerFunction.toString()})()`], {
    type: 'application/javascript'
  });
  return new Worker(URL.createObjectURL(blob));
};

// Request idle callback polyfill
export const requestIdleCallback = (
  callback: (deadline: { timeRemaining: () => number; didTimeout: boolean }) => void,
  options?: { timeout?: number }
): number => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }
  
  // Polyfill
  const start = Date.now();
  return setTimeout(() => {
    callback({
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
      didTimeout: false
    });
  }, 1) as any;
};

export const cancelIdleCallback = (id: number): void => {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};

// Critical resource loading
export const loadCriticalResources = async (): Promise<void> => {
  const criticalResources = [
    '/icons/icon-192x192.png',
    '/manifest.json'
  ];

  await Promise.all(
    criticalResources.map(resource => 
      fetch(resource).catch(error => 
        console.warn(`Failed to preload ${resource}:`, error)
      )
    )
  );
};

// Performance observer
export const observePerformance = (): void => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          console.log('Navigation timing:', entry);
        } else if (entry.entryType === 'paint') {
          console.log(`${entry.name}:`, entry.startTime);
        } else if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
      });
    });

    observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
  }
};

// Cleanup utilities
export const cleanupResources = (): void => {
  // Clear any timers
  const highestTimeoutId = setTimeout(() => {}, 0) as any;
  for (let i = 0; i < Number(highestTimeoutId); i++) {
    clearTimeout(i);
  }

  const highestIntervalId = setInterval(() => {}, 0) as any;
  for (let i = 0; i < Number(highestIntervalId); i++) {
    clearInterval(i);
  }

  // Clear event listeners (if tracked)
  // This would need to be implemented based on your event tracking system
};
