/**
 * Hook to implement infinite scrolling pagination.
 * Returns a ref object, to be used for a sentry element.
 * Once sentry element becomes visible, callback is triggered.
 */

// polyfill
// @ts-ignore
import "intersection-observer";

import { useEffect, useRef } from "react";

export function useInfiniteScroll(
  fetchNext: () => void,
  hasNextPage?: boolean,
  observerConfig = { threshold: 0, root: null, rootMargin: "0%" }
) {
  const sentryRef = useRef<Element>();
  const callbackRef = useRef(fetchNext);

  useEffect(() => {
    if (!sentryRef.current) return;
    if (!hasNextPage) return;
    if (callbackRef.current !== fetchNext) callbackRef.current = fetchNext;

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      callbackRef.current();
    });
    observer.observe(sentryRef.current);
    return () => {
      observer.disconnect();
    };
  }, [sentryRef, observerConfig, fetchNext, hasNextPage]);

  return sentryRef;
}
