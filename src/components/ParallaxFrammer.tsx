"use client";

import { PortfolioSchema } from "@/lib/schema/portfolioSchema";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod";
import TypingEffect from "./TypingEffect";

export default function ComplexParallaxEffect() {
  const { theme } = useTheme();
  const [projects, setProjects] = useState<z.infer<typeof PortfolioSchema>[]>(
    []
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/projects?page=1&limit=100"
        );
        console.log(response.data);
        setProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  const { scrollY } = useScroll();

  const imgY = useTransform(scrollY, [0, 500], [0, -100]);
  const textY1 = useTransform(scrollY, [0, 500], [0, -200]);
  const textY2 = useTransform(scrollY, [0, 800], [0, -400]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const backgroundImage =
    theme === "dark"
      ? "url('/liquid-cheese(2).svg')"
      : "url('/liquid-cheese(3).svg')";

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-background px-40"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
      <motion.h1
        className="fixed -left-52 top-1/2 -translate-y-1/2 font-bold tracking-wider dark:text-light/20 text-navy/20 text-9xl whitespace-nowrap z-50 shadow-neumorphic"
        initial={{ opacity: 0, x: -50, rotate: 90 }}
        animate={{ opacity: 1, x: 0, rotate: 90 }}
        transition={{ duration: 1, delay: 0.5 }}>
        Portfolio
      </motion.h1>

      <div className="relative z-10 h-screen flex flex-col items-center justify-center xl:items-start xl:pl-36  rounded-3xl p-10 shadow-neumorphic">
        <motion.div style={{ y: imgY }}>
          <Image
            src="/solehuddin.webp"
            width={300}
            height={300}
            alt="Moh Solehuddin"
            className="rounded-full shadow-neumorphic"
          />
        </motion.div>

        <motion.div
          style={{ y: textY1, opacity: textOpacity }}
          className="absolute flex flex-col items-center xl:items-start xl:ml-72 shadow-neumorphic px-6 py-4 rounded-xl">
          <motion.h1
            className="text-5xl font-bold dark:text-light text-navy mb-10 drop-shadow-lg shadow-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}>
            Moh Solehuddin
          </motion.h1>
          <motion.p
            className="text-xl dark:text-light/90 text-navy/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}>
            Scroll to explore
          </motion.p>
        </motion.div>

        <motion.div
          style={{ y: textY2 }}
          className="absolute flex flex-col items-center xl:items-start xl:ml-72">
          <TypingEffect
            strings={["Front-End", "Back-End", "Full-Stack"]}
            className="text-6xl font-bold dark:text-light/20 text-navy/20 -mt-4 drop-shadow-lg w-screen text-center xl:w-fit xl:text-start shadow-neumorphic px-6 py-4 rounded-xl"
          />
        </motion.div>
      </div>

      <div className="min-h-screen">
        {projects.map((project) => (
          <p key={project.id} className="text-lg text-navy dark:text-light">
            {project.name}
          </p>
        ))}
      </div>
    </div>
  );
}
