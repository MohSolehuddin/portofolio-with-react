"use client";
import { PortfolioSchema } from "@/lib/schema/portfolioSchema";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import { Button } from "../ui/button";

export default function Product({
  name,
  image,
  linkRepo,
  description,
  started,
  ended,
}: z.infer<typeof PortfolioSchema>) {
  // const [name, setName] = React.useState("");
  // const [price, setPrice] = React.useState(0);
  // const [description, setDescription] = React.useState("");

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const response = await fetch("/api/products", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, price, description }),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };

  const { theme } = useTheme();
  const [spotlightColor, setSpotlightColor] = useState<
    "rgba(255, 255, 255, 0.25)" | "rgba(0, 0, 0, 0.25)"
  >("rgba(255, 255, 255, 0.25)");
  useEffect(() => {
    if (theme === "dark") {
      setSpotlightColor("rgba(255, 255, 255, 0.25)");
    } else {
      setSpotlightColor("rgba(0, 0, 0, 0.25)");
    }
  }, [theme]);

  return (
    <section className="w-[500px] h-[500px]">
      <SpotlightCard className="h-[500px]" spotlightColor={spotlightColor}>
        <Image
          src={image ?? "/solehuddin.webp"}
          loader={() => image ?? "/solehuddin.webp"}
          alt="logo"
          width={100}
          height={100}
          className="w-full h-1/3 object-contain"
        />
        <h3>{name}</h3>
        <p>{description}</p>
        <p>
          Started:{" "}
          {new Date(started).toLocaleString(undefined, { dateStyle: "long" })}
        </p>
        <p>
          Ended:{" "}
          {new Date(ended).toLocaleString(undefined, { dateStyle: "long" })}
        </p>
        {linkRepo && (
          <Button>
            <Link href={linkRepo}>GitHub</Link>
          </Button>
        )}
      </SpotlightCard>
    </section>
  );
}
