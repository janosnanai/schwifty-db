/**
 * Hook to implement infinite scrolling pagination.
 * Returns a ref object, to be used for a sentry element.
 * Once sentry element becomes visible, callback is triggered.
 * (callback should be a "fetchNextPage" function, memoized)
 */

// polyfill
// @ts-ignore
import "intersection-observer";

import type { RefObject } from "react";

import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback: Function, hasNextPage?: boolean) {
  const sentryRef: RefObject<any> = useRef();
  useEffect(() => {
    if (!sentryRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      callback();
      console.log(entries);
    });
    observer.observe(sentryRef.current);
    return () => {
      observer.disconnect();
    };
  }, [sentryRef, callback, hasNextPage]);
  return sentryRef;
}
