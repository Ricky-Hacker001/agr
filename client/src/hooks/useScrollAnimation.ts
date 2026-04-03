import { useEffect, useRef } from 'react';

/**
 * useScrollAnimation
 * Applies 'scroll-visible' class to elements with 'scroll-hidden' (or variants)
 * as they enter the viewport using IntersectionObserver.
 *
 * Usage:
 *   const ref = useScrollAnimation();
 *   <section ref={ref}>
 *     <div className="scroll-hidden">...</div>
 *     <div className="scroll-hidden stagger-2">...</div>
 *   </section>
 */
const useScrollAnimation = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>(
      '.scroll-hidden, .scroll-hidden-left, .scroll-hidden-right'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
};

export default useScrollAnimation;
