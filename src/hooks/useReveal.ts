'use client';

import { useEffect, useRef } from 'react';

/**
 * Observes `.reveal` descendants and adds `.active` when they enter the
 * viewport. Elements already above the fold activate immediately; under
 * prefers-reduced-motion everything activates at once. A scroll "sweep"
 * safety net catches nodes skipped by anchor jumps.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>('.reveal'));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((el) => el.classList.add('active'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    elements.forEach((el) => observer.observe(el));

    const sweep = () => {
      elements.forEach((el) => {
        if (el.classList.contains('active')) return;
        if (el.getBoundingClientRect().bottom < window.innerHeight * 0.88) {
          el.classList.add('active');
          observer.unobserve(el);
        }
      });
    };
    window.addEventListener('scroll', sweep, { passive: true });
    requestAnimationFrame(sweep);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', sweep);
    };
  }, [threshold]);

  return ref;
}
