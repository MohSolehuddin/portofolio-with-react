"use client";

import ContainerHome from "@/components/home/ContainerHome";
import HeroSection from "@/components/home/HeroSection";
import MySkill from "@/components/home/MySkill";
import Products from "@/components/home/Projects";

export default function Page() {
  return (
    <ContainerHome>
      <HeroSection />
      <Products />
      <MySkill />
    </ContainerHome>
  );
}
