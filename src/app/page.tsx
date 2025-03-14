"use client";

import ContainerHome from "@/components/home/ContainerHome";
import HeroSection from "@/components/home/HeroSection";
import Products from "@/components/home/Products";

export default function Page() {
  return (
    <ContainerHome>
      <HeroSection />
      <Products />
    </ContainerHome>
  );
}
