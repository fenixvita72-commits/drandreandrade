import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollReveal = <T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  const checkVisibility = useCallback(() => {
    const element = ref.current;
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
      setIsVisible(true);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (checkVisibility()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
          window.removeEventListener("scroll", handleScroll);
        }
      },
      {
        threshold: options.threshold ?? 0.05,
        rootMargin: options.rootMargin ?? "100px 0px 0px 0px",
      }
    );

    const handleScroll = () => {
      if (checkVisibility()) {
        observer.unobserve(element);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    observer.observe(element);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [options.threshold, options.rootMargin, checkVisibility]);

  return { ref, isVisible };
};
