"use client";

import Aurora from "@/components/Aurora/Aurora";
import DecryptedText from "@/components/DecryptedText/DecryptedText";
import SplashCursor from "@/components/SplashCursor/SplashCursor";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import { ReactNode, useEffect, useState } from "react";

export default function ContainerHome({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  const [colorStops, setColorStops] = useState<string[]>([
    "#09122C",
    "#074799",
    "#010e1f",
  ]);
  useEffect(() => {
    if (theme == "dark") {
      setColorStops(["#09122C", "#074799", "#010e1f"]);
      return;
    }
    setColorStops(["#fff", "#fff", "#fbfbfb"]);
  }, [theme]);

  const width = useWindowWidth();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background md:px-40 bg-light dark:bg-dark bg-cover bg-top">
      {width > 768 && (
        <>
          <section className="absolute w-screen h-screen z-0 top-0 left-0 -mt-12">
            {theme == "dark" ? (
              <Aurora colorStops={colorStops} />
            ) : (
              <Aurora
                colorStops={colorStops}
                amplitude={0.3}
                blend={0.9}
                speed={1}
                time={1000}
              />
            )}
          </section>
          <SplashCursor />
        </>
      )}

      <motion.div
        className="fixed max-md:hidden -left-52 top-1/2 -mt-16 -translate-y-1/2 font-bold tracking-wider dark:text-light/20 text-navy/20 text-9xl whitespace-nowrap z-50 shadow-neumorphic"
        initial={{ opacity: 0, x: -50, rotate: 90 }}
        animate={{ opacity: 1, x: 0, rotate: 90 }}
        transition={{ duration: 1, delay: 0.5 }}>
        <DecryptedText
          text="Portfolio"
          speed={100}
          animateOn="view"
          delay={1000}
          className="text-navy/20 dark:text-light/20"
        />
      </motion.div>
      {children}
    </div>
  );
}
