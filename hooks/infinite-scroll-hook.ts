// polyfill
// @ts-ignore
import "intersection-observer";

import type { RefObject } from "react";

import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback: Function) {
  const sentryRef: RefObject<any> = useRef();
  useEffect(() => {
    if (!sentryRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      callback();
      console.log(entries);
    });
    observer.observe(sentryRef.current);
    console.log("observing " + typeof sentryRef.current);

    return () => {
      observer.disconnect();
      console.log("observer disconnect");
    };
  }, [sentryRef, callback]);

  return sentryRef;
}
