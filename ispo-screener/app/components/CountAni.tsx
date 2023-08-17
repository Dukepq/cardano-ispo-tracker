"use client";

import { useEffect, useState } from "react";

export default function CountAni({ number }: { number: number }) {
  const [current, setCurrent] = useState(0);
  const steps = 30;
  const stepSize = Math.max(Math.floor(number / steps), 1);
  const delay = Math.floor(1200 / steps); // delay = timeToComplete / steps
  useEffect(() => {
    const interval = setInterval(() => {
      if (current < number) {
        setCurrent((prev) => {
          if (prev < number) {
            return Math.min(number, prev + stepSize);
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }
      return () => {
        if (interval) clearInterval(interval);
      };
    }, delay);
  }, []);
  return <span>{current}</span>;
}
