/**
 * Hook using intersection-observer API.
 * Optional wait for ie a fetch to finish
 * Returns a ref object, to be observed and a boolean observable whether the ref is in-view.
 */

// polyfill
// @ts-ignore
import "intersection-observer";

import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(
  observerConfig = { threshold: 0, root: null, rootMargin: "0%" }
) {
  const [isVisible, setIsVisible] = useState(true);
  const observedRef = useRef<Element>();

  useEffect(() => {
    const node = observedRef.current;
    if (!node) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      setIsVisible(entries[0].isIntersecting);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [observedRef, observerConfig]);

  return { observedRef, isVisible };
}
