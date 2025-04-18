"use client";
import DecryptedText from "@/components/DecryptedText/DecryptedText";
import Magnet from "@/components/Magnet/Magnet";
import SplitText from "@/components/SplitText/SplitText";
import TypingEffect from "@/components/TypingEffect";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import SocialMedia from "../socialMedia/SocialMedia";
import ProjectCompleted from "./ProjectCompleted";
import ProjectOngoing from "./ProjectOngoing";
import YearOfExperience from "./YearOfExperience";

export default function HeroSection() {
  const { scrollY } = useScroll();

  const heroSectionY = useTransform(scrollY, [0, 700], [0, -200]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  return (
    <div className="md:relative z-10 h-screen flex flex-col items-center justify-center xl:items-start xl:pl-36 rounded-3xl p-10 shadow-neumorphic">
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
        <section className="absolute top-12 right-12">
          <h3 className="text-lg font-bold dark:text-light text-navy mb-2">
            Contact me at
          </h3>
          <SocialMedia />
        </section>

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
          <br className="mb-6" />

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
          className="mt-6 flex gap-12 mb-6 bg-navy/50 rounded-xl p-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}>
          <YearOfExperience />
          <ProjectCompleted />
          <ProjectOngoing />
        </motion.section>
        <Magnet>
          <a
            href="https://drive.google.com/file/d/15XGcxQzN52bkJ4JrLYSzM7PCxqaHkPRY/view?usp=drive_link"
            about="_blank">
            <Button>Download CV</Button>
          </a>
        </Magnet>
      </motion.div>
    </div>
  );
}
