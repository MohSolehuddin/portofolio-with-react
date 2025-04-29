"use client";

import CustomCursor from "@/components/Cursor/CustomCursor";
import Contact from "@/components/home/Contact";
import ContainerHome from "@/components/home/ContainerHome";
import HeroSection from "@/components/home/HeroSection";
import MySkill from "@/components/home/MySkill";
import Products from "@/components/home/Projects";

export default function Page() {
  return (
    <ContainerHome>
      <CustomCursor />
      <HeroSection />
      <MySkill />
      <Products />
      <Contact />
    </ContainerHome>
  );
}
