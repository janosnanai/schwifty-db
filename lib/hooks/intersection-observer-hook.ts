/**
 * Hook using intersection-observer API.
 * Returns a ref object, to be observedand a boolean observable whether the ref is in-view.
 */

// polyfill
// @ts-ignore
import "intersection-observer";

import type { RefObject } from "react";

import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver() {
  const [isVisible, setIsVisible] = useState(false);
  const observedRef: RefObject<any> = useRef();

  useEffect(() => {
    if (!observedRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      switch (entries[0].isIntersecting) {
        case true:
          setIsVisible(true);
          break;
        case false:
          setIsVisible(false);
          break;
      }
    });
    observer.observe(observedRef.current);
    return () => {
      observer.disconnect();
    };
  }, [observedRef]);

  return { observedRef, isVisible };
}
