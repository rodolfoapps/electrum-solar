'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem {
  label: string;
  prefix?: string;
  value: number;
  suffix?: string;
}

const stats: StatItem[] = [
  { label: 'States', value: 4 },
  { label: 'Year Warranty', value: 25, suffix: '+' },
  { label: 'Savings', prefix: '$', value: 28, suffix: 'K–$65K' },
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, start]);

  return count;
}

function StatCounter({ stat, inView }: { stat: StatItem; inView: boolean }) {
  const count = useCountUp(stat.value, 1800, inView);

  return (
    <div className="text-center">
      <p className="whitespace-nowrap text-3xl font-bold text-amber-400 sm:text-4xl lg:text-5xl">
        {stat.prefix ?? ''}
        {count}
        {stat.suffix ?? ''}
      </p>
      <p className="mt-1 text-sm font-medium text-gray-400 sm:text-base">
        {stat.label}
      </p>
    </div>
  );
}

export function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mx-auto mt-16 flex max-w-2xl items-start justify-center gap-8 sm:gap-14 lg:gap-20"
    >
      {stats.map((stat) => (
        <StatCounter key={stat.label} stat={stat} inView={inView} />
      ))}
    </div>
  );
}
