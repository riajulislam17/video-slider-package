import { useEffect, useRef, useState } from "react";

export function useSlider<T>(
  items: T[],
  windowSize: number,
  slide: boolean,
  slideInterval: number = 3000,
  isPaused: boolean,
  sliderDirection: "forward" | "backward" = "forward"
) {
  const totalItems = items.length;

  const initialIndex =
    sliderDirection === "backward" ? Math.max(totalItems - windowSize, 0) : 0;

  const [startIndex, setStartIndex] = useState(initialIndex);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setStartIndex((prev) => {
      if (prev + windowSize >= totalItems) {
        return 0;
      }
      return prev + 1;
    });
  };

  const handlePrev = () => {
    setStartIndex((prev) => {
      if (prev === 0) {
        return Math.max(totalItems - windowSize, 0);
      }
      return prev - 1;
    });
  };

  const getVisibleItems = () => {
    return items.slice(startIndex, startIndex + windowSize);
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (slide && !isPaused && totalItems > windowSize) {
      intervalRef.current = setInterval(() => {
        if (sliderDirection === "forward") {
          handleNext();
        } else {
          handlePrev();
        }
      }, slideInterval);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slide, isPaused, totalItems, windowSize, slideInterval, sliderDirection]);

  return {
    visibleItems: getVisibleItems(),
    handleNext,
    handlePrev,
    isSliding: slide && totalItems > windowSize,
  };
}
