"use client";

import { useRef, useEffect, useState } from "react";

export default function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}s`, // ← работает идеально
      }}
      className={`w-full transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      {children}
    </div>
  );
}
