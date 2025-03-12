"use client";

import { PortfolioSchema } from "@/lib/schema/portfolioSchema";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod";
import TypingEffect from "./TypingEffect";

export default function ComplexParallaxEffect() {
  const [projects, setProjects] = useState<z.infer<typeof PortfolioSchema>[]>(
    []
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/v1/projects?page=1&limit=100");
        console.log(response.data);
        setProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const { scrollY } = useScroll();

  const imgY = useTransform(scrollY, [0, 500], [0, -100]);
  const textY1 = useTransform(scrollY, [0, 700], [0, -200]);
  const textY2 = useTransform(scrollY, [0, 800], [0, -400]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-40 bg-[url('/liquid-cheese-light.svg')] dark:bg-[url('/liquid-cheese-dark.svg')] bg-cover bg-center">
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
            className="text-5xl font-bold dark:text-light text-navy drop-shadow-lg shadow-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}>
            Moh Solehuddin
          </motion.h1>
          <motion.p
            className="text-xl dark:text-light/90 text-navy/90 mt-11"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}>
            👋 Hello, I&apos;m Moh Solehuddin! I’m a passionate Full-Stack
            Developer with a focus on Java, Spring Boot, ReactJS, and React
            Native. I am driven by the idea of creating efficient and scalable
            applications, and I enjoy solving complex problems through
            technology. I am continually expanding my skill set and exploring
            new technologies to stay at the forefront of development trends.
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
