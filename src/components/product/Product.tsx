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
  const { theme } = useTheme();

  // const ratio = { x: 3, y: 2 };
  // const size = 90;
  // const width = size * ratio.x;
  // const height = size * ratio.y;

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
    <section className="w-[450px] h-[450px] relative">
      <SpotlightCard
        className="h-[450px] w-[450px] p-0 absolute top-0 left-0"
        spotlightColor={spotlightColor}>
        <Image
          src={image ?? "/solehuddin.webp"}
          loader={() => image ?? "/solehuddin.webp"}
          alt="logo"
          width={540}
          height={300}
          className="object-cover w-[450px] h-[300px]"
        />
        <section className="relative px-4 pt-2 bg-light/30 dark:bg-navy/50 w-[450px] h-[150px]">
          <h3>{name}</h3>
          <p>
            {description?.slice(0, 100) +
              (description?.length > 100 ? "..." : "")}
          </p>
          <section className="absolute left-0 bottom-2 w-full px-4 flex justify-between items-end">
            {linkRepo && (
              <Button>
                <Link href={linkRepo}>GitHub</Link>
              </Button>
            )}
            <Button>
              <Link href="#">Show details</Link>
            </Button>
            <section className="flex flex-col">
              <p>
                Started:{" "}
                {new Date(started).toLocaleString(undefined, {
                  dateStyle: "long",
                })}
              </p>
              <p>
                Ended:{" "}
                {new Date(ended).toLocaleString(undefined, {
                  dateStyle: "long",
                })}
              </p>
            </section>
          </section>
        </section>
      </SpotlightCard>
    </section>
  );
}
