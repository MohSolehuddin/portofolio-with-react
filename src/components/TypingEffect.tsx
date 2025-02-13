"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  strings: string[];
}

export default function TypingEffect({ strings, ...props }: Props) {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings,
      startDelay: 1000,
      typeSpeed: 60,
      backSpeed: 30,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, [strings]);

  return (
    <div {...props}>
      <span ref={typedRef}></span>
    </div>
  );
}
