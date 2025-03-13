"use client";

import Aurora from "@/components/Aurora/Aurora";
import Loading from "@/components/Loading";
import Magnet from "@/components/Magnet/Magnet";
import SplashCursor from "@/components/SplashCursor/SplashCursor";
import TypingEffect from "@/components/TypingEffect";
import { Button } from "@/components/ui/button";
import { PortfolioSchema } from "@/lib/schema/portfolioSchema";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function Page() {
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
    setColorStops(["#fff", "#074799", "#fbfbfb"]);
  }, [theme]);

  const [projects, setProjects] = useState<
    z.infer<typeof PortfolioSchema>[] | null
  >(null);

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

  const heroSectionY = useTransform(scrollY, [0, 700], [0, -200]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    // <div className="relative min-h-screen overflow-hidden bg-background px-40 bg-[url('/liquid-cheese-light.svg')] dark:bg-[url('/liquid-cheese-dark.svg')] bg-cover bg-top">
    <div className="relative min-h-screen overflow-hidden bg-background px-40 bg-light dark:bg-dark bg-cover bg-top">
      <section className="absolute w-screen h-screen z-0 top-0 left-0">
        <Aurora colorStops={colorStops} />
      </section>
      <SplashCursor />
      <motion.h1
        className="fixed -left-52 top-1/2 -mt-16 -translate-y-1/2 font-bold tracking-wider dark:text-light/20 text-navy/20 text-9xl whitespace-nowrap z-50 shadow-neumorphic"
        initial={{ opacity: 0, x: -50, rotate: 90 }}
        animate={{ opacity: 1, x: 0, rotate: 90 }}
        transition={{ duration: 1, delay: 0.5 }}>
        Portfolio
      </motion.h1>

      <div className="relative z-10 h-screen flex flex-col items-center justify-center xl:items-start xl:pl-36 rounded-3xl p-10 shadow-neumorphic">
        {/* <section className="absolute h-96 w-96">
          <Orb />
        </section> */}
        <motion.div
          style={{ y: heroSectionY }}
          initial={{ opacity: 0, x: -60 }}
          animate={{ x: -20, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}>
          <Image
            src="/solehuddin.webp"
            width={300}
            height={300}
            alt="Moh Solehuddin"
            className="rounded-full shadow-neumorphic"
          />
        </motion.div>

        <motion.div
          style={{ y: heroSectionY, opacity: textOpacity }}
          className="absolute flex flex-col items-center xl:items-start xl:ml-72 shadow-neumorphic px-6 py-4 rounded-xl dark:bg-black/20 bg-light/20">
          <motion.h1
            className="text-5xl font-bold dark:text-light text-navy drop-shadow-lg shadow-accent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}>
            Moh Solehuddin
          </motion.h1>
          <motion.div
            className="relative flex flex-col items-center xl:items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}>
            <TypingEffect
              strings={["Front-End", "Back-End", "Full-Stack"]}
              className="text-6xl font-bold dark:text-light/20 text-navy/20 -mt-4 drop-shadow-lg w-screen text-center xl:w-fit xl:text-start shadow-neumorphic py-4 rounded-xl"
            />
          </motion.div>
          <motion.div
            className="text-xl dark:text-light/90 text-navy/90 mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}>
            <p>👋 Hello, I&apos;m Moh Solehuddin!</p>
            <p>
              I’m a passionate Full-Stack Developer with a focus on Java, Spring
              Boot, ReactJS, and React Native. I am driven by the idea of
              creating efficient and scalable applications, and I enjoy solving
              complex problems through technology.
            </p>
            <br />
            <p>
              I am continually expanding my skill set and exploring new
              technologies to stay at the forefront of development trends.
            </p>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}>
            <Magnet>
              <Button>Download CV</Button>
            </Magnet>
          </motion.section>
        </motion.div>
      </div>

      <div className="min-h-screen z-40">
        {!projects ? (
          <Loading />
        ) : (
          <>
            {projects.map((project) => (
              <p key={project.id} className="text-lg text-navy dark:text-light">
                {project.name}
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
