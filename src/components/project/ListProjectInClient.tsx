"use client";
import { PortfolioResponseSchema } from "@/lib/schema/portfolioSchema";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";
import { z } from "zod";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import { Button } from "../ui/button";

const Product = memo(function Product({
  name,
  image,
  linkRepo,
  description,
  started,
  isPrivate,
  ended,
}: z.infer<typeof PortfolioResponseSchema>) {
  const { theme } = useTheme();

  const spotlightColor = useMemo(
    () =>
      theme === "dark" ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)",
    [theme]
  );

  const startedDate = new Date(started).toLocaleString(undefined, {
    dateStyle: "medium",
  });

  const endedDate = new Date(ended).toLocaleString(undefined, {
    dateStyle: "medium",
  });

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
          {description && (
            <p>
              {description?.slice(0, 100) +
                (description?.length > 100 ? "..." : "")}
            </p>
          )}
          <section className="absolute left-0 bottom-2 w-full px-4 flex justify-between items-end">
            {linkRepo && !isPrivate && (
              <Button>
                <Link href={linkRepo}>GitHub</Link>
              </Button>
            )}
            <Button>
              <Link href="#">Show details</Link>
            </Button>
            <section className="flex gap-2">
              <p>{startedDate}</p>
              <p> - </p>
              <p>{endedDate}</p>
            </section>
          </section>
        </section>
      </SpotlightCard>
    </section>
  );
});

export default Product;
