"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import TypingEffect from "./TypingEffect";

export default function ComplexParallaxEffect() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { scrollY } = useScroll();

  // Transformations for background
  const bgY = useTransform(scrollY, [0, 1000], [0, -200]);
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.5]);

  // Transformations for text
  const textY1 = useTransform(scrollY, [0, 500], [0, -200]);
  const textY2 = useTransform(scrollY, [0, 800], [0, -400]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-dark">
      {/* Background with parallax and zoom */}
      {isClient && (
        <motion.div
          className="absolute top-0 left-0 w-full h-[100vh] bg-cover bg-center"
          style={{
            y: bgY,
            scale: bgScale,
          }}
        />
      )}

      {/* Rotated "Portfolio" Text */}
      <motion.h1
        className="fixed -left-52 top-1/2 -translate-y-1/2 font-bold tracking-wider text-accent/20 text-9xl whitespace-nowrap z-50"
        initial={{ opacity: 0, x: -50, rotate: 90 }}
        animate={{ opacity: 1, x: 0, rotate: 90 }}
        transition={{ duration: 1, delay: 0.5 }}>
        Portfolio
      </motion.h1>

      {/* Overlay content with parallax layers */}
      <div
        className="relative z-10 h-screen flex flex-col items-center justify-center xl:items-start xl:pl-36"
        style={{ backgroundImage: "/philipp-dusel--Mbfhs0u4YQ-unsplash.jpg" }}>
        <Image
          src="/solehuddin.webp"
          width={300}
          height={300}
          alt="Moh Solehuddin"
          // className="w-full h-full"
          // className="rounded-xl absolute top-0 left-36 object-cover object-center"
        />
        {/* First text layer */}
        <motion.div
          style={isClient ? { y: textY1, opacity: textOpacity } : {}}
          className="absolute flex flex-col items-center xl:items-start xl:ml-72">
          <motion.h1
            className="text-5xl font-bold text-light mb-10 drop-shadow-lg shadow-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}>
            Moh Solehuddin
          </motion.h1>
          <motion.p
            className="text-xl text-light/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}>
            Scroll to explore
          </motion.p>
        </motion.div>

        {/* Second text layer with faster parallax */}
        <motion.div
          style={isClient ? { y: textY2 } : {}}
          className="absolute flex flex-col items-center xl:items-start xl:ml-72">
          {isClient && (
            <TypingEffect
              strings={["Front-End", "Back-End", "Full-Stack"]}
              className="text-6xl font-bold text-light/20 -mt-4 drop-shadow-lg w-screen text-center xl:w-fit xl:text-start"
            />
          )}
        </motion.div>
      </div>

      {/* Content spacer with gradient */}
      {/* {isClient && (
        <motion.div
          className="h-[200vh] bg-gradient-to-b from-transparent via-gray-900 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )} */}
    </div>
  );
}
