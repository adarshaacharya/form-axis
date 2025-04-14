"use client";

import * as React from "react";

export function useScrollToBottom(deps: React.DependencyList = []) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      const observer = new ResizeObserver(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      });

      observer.observe(scrollContainer);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  React.useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, deps);

  return scrollRef;
}
