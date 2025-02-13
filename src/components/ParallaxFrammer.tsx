"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const TypingEffect = dynamic(() => import("./TypingEffect"), { ssr: false });

export default function ComplexParallaxEffect() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { scrollY } = useScroll();

  // Transformations untuk background
  const bgY = useTransform(scrollY, [0, 1000], [0, -200]);
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.5]);

  // Transformations untuk teks
  const textY1 = useTransform(scrollY, [0, 500], [0, -200]);
  const textY2 = useTransform(scrollY, [0, 800], [0, -400]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-darkGold">
      {/* Background dengan efek parallax dan zoom */}
      {isClient && (
        <motion.div
          className="absolute top-0 left-0 w-full h-[120vh] bg-cover bg-center"
          style={{
            backgroundImage: "url('/dark-paths.webp')",
            y: bgY,
            scale: bgScale,
          }}
        />
      )}

      {/* Overlay konten dengan layer parallax berbeda */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        {/* Layer teks pertama */}
        <motion.div
          style={isClient ? { y: textY1, opacity: textOpacity } : {}}
          className="absolute flex flex-col items-center">
          <h1 className="text-5xl font-bold text-light mb-4 drop-shadow-lg">
            Moh Solehuddin
          </h1>
          <p className="text-xl text-light/90">Scroll to explore</p>
        </motion.div>

        {/* Layer teks kedua dengan parallax lebih cepat */}
        <motion.div
          style={isClient ? { y: textY2 } : {}}
          className="absolute flex flex-col items-center">
          {isClient && (
            <TypingEffect
              strings={["Front-End", "Back-End", "Full-Stack"]}
              className="text-6xl font-bold text-light/20 mt-6 mb-2 drop-shadow-lg w-screen text-center"
            />
          )}
        </motion.div>
      </div>

      {/* Content spacer dengan gradient */}
      {isClient && (
        <motion.div
          className="h-[200vh] bg-gradient-to-b from-transparent via-gray-900 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </div>
  );
}
