/*
 * Simple timeout hook.
 * Give it a callback and a delay (in ms)!
 * Returns start- and stop timeout functions and an "isActive" observable.
 */

import type { MutableRefObject } from "react";

import { useEffect, useRef, useState } from "react";

export function useTimeout(callback: Function, delay: number = 300) {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const callbackRef: MutableRefObject<Function> = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  function startTimeout() {
    stopTimeout();
    const newTimer = setTimeout(() => {
      callbackRef.current();
      setTimer(null);
    }, delay);
    setTimer(newTimer);
  }
  function stopTimeout() {
    if (!timer) return;
    clearTimeout(timer);
    setTimer(null);
  }

  return { startTimeout, stopTimeout, isActive: !!timer };
}
