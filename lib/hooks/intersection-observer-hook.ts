/**
 * Hook using intersection-observer API.
 * Optional wait for ie a fetch to finish
 * Returns a ref object, to be observed and a boolean observable whether the ref is in-view.
 */

// polyfill
// @ts-ignore
import "intersection-observer";

import type { RefObject } from "react";

import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(wait: boolean = false) {
  const [isVisible, setIsVisible] = useState(false);
  const observedRef: RefObject<any> = useRef();

  useEffect(() => {
    if (wait) return;
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
  }, [observedRef, wait]);

  return { observedRef, isVisible };
}
