/**
 * Hook to implement infinite scrolling pagination.
 * Returns a ref object, to be used for a sentry element.
 * Once sentry element becomes visible, callback is triggered.
 */

// polyfill
// @ts-ignore
import "intersection-observer";

import type { RefObject, MutableRefObject } from "react";

import { useEffect, useRef } from "react";

export function useInfiniteScroll(fetchNext: Function, hasNextPage?: boolean) {
  const sentryRef: RefObject<any> = useRef();
  const callbackRef: MutableRefObject<Function> = useRef(fetchNext);

  useEffect(() => {
    if (callbackRef.current === fetchNext) return;
    callbackRef.current = fetchNext;
  }, [fetchNext]);

  useEffect(() => {
    if (!sentryRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      callbackRef.current();
    });
    observer.observe(sentryRef.current);
    return () => {
      observer.disconnect();
    };
  }, [sentryRef, hasNextPage]);

  return sentryRef;
}