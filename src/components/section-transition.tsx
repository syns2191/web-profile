'use client';

import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
  animation?: string; // Tailwind CSS animation class (e.g., 'animate-fade-in', 'animate-slide-up')
  threshold?: number; // Intersection Observer threshold
}

export const SectionTransition = ({
  children,
  animation = 'animate-fade-in',
  threshold = 0.1,
}: SectionTransitionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: threshold,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ease-out ${isVisible ? animation : 'opacity-0 translate-y-10'}`}
    >
      {children}
    </div>
  );
};
