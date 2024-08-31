import { useEffect, useState } from "react";
import type { RefObject } from "react";

export enum VisibilityPosition {
  Start,
  Middle,
  End,
}

export function useElementVisibility<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>,
  position: VisibilityPosition = VisibilityPosition.End,
): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          switch (position) {
            case VisibilityPosition.Start:
              setIsVisible(entry.intersectionRatio > 0);
              break;
            case VisibilityPosition.Middle:
              setIsVisible(entry.intersectionRatio > 0.5);
              break;
            case VisibilityPosition.End:
              setIsVisible(entry.intersectionRatio === 1);
              break;
          }
        });
      },
      {
        threshold: [0, 0.5, 1],
      },
    );

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [elementRef, position]);

  return isVisible;
}
