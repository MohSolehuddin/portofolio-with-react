"use client";

import Aurora from "@/components/Aurora/Aurora";
import DecryptedText from "@/components/DecryptedText/DecryptedText";
import Loading from "@/components/Loading";
import Magnet from "@/components/Magnet/Magnet";
import Product from "@/components/product/Product";
import SplashCursor from "@/components/SplashCursor/SplashCursor";
import SplitText from "@/components/SplitText/SplitText";
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
    setColorStops(["#fff", "#fff", "#fbfbfb"]);
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
      <motion.div
        className="fixed -left-52 top-1/2 -mt-16 -translate-y-1/2 font-bold tracking-wider dark:text-light/20 text-navy/20 text-9xl whitespace-nowrap z-50 shadow-neumorphic"
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

      <div className="relative z-10 h-screen flex flex-col items-center justify-center xl:items-start xl:pl-36 rounded-3xl p-10 shadow-neumorphic">
        <SplashCursor />
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
          className="absolute flex flex-col items-center xl:items-start xl:ml-72 shadow-neumorphic p-12 rounded-xl dark:bg-black/20 bg-light/30">
          <motion.h1
            className="text-5xl font-bold dark:text-light text-navy drop-shadow-lg shadow-accent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}>
            <SplitText text="Moh Solehuddin" />
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
            <DecryptedText
              text="👋 Hello, I'm Moh Solehuddin!"
              animateOn="view"
              delay={1000}
              speed={30}
              revealDirection="center"
            />
            <DecryptedText
              text="I’m a passionate Full-Stack Developer with a focus on Java, Spring
              Boot, ReactJS, and React Native. I am driven by the idea of
              creating efficient and scalable applications, and I enjoy solving
              complex problems through technology."
              revealDirection="center"
              animateOn="view"
              speed={50}
              delay={1000}
            />
            <br className="mb-6" />
            <DecryptedText
              text="I am continually expanding my skill set and exploring new
              technologies to stay at the forefront of development trends.
            "
              animateOn="view"
              speed={100}
              delay={1000}
            />
          </motion.div>
          <motion.section
            className="mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}>
            <Magnet>
              <Button>Download CV</Button>
            </Magnet>
          </motion.section>
        </motion.div>
      </div>

      <section className="min-h-screen z-40 w-full flex flex-wrap justify-center items-center gap-6">
        {!projects ? (
          <Loading />
        ) : (
          <>
            {projects.map((project) => (
              <Product
                key={project.id}
                name={project.name}
                description={project.description}
                linkRepo={project.linkRepo}
                image={project.image}
                started={project.started}
                ended={project.ended}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
}
