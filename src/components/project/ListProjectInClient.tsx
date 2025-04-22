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
  console.log(isPrivate, linkRepo, !isPrivate && linkRepo);
  const { theme } = useTheme();

  const spotlightColor = useMemo(
    () =>
      theme === "dark" ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)",
    [theme]
  );

  const startedDate = new Date(started).toLocaleDateString(undefined, {
    dateStyle: "medium",
  });

  const endedDate = new Date(ended).toLocaleDateString(undefined, {
    dateStyle: "medium",
  });

  return (
    <section className="w-full max-w-sm sm:max-w-md">
      <SpotlightCard
        className="w-full h-full p-0 relative overflow-hidden"
        spotlightColor={spotlightColor}>
        <Image
          src={image ?? "/solehuddin.webp"}
          loader={() => image ?? "/solehuddin.webp"}
          alt={name}
          width={800}
          height={450}
          className="object-cover w-full aspect-video"
        />

        <section className="relative px-4 py-3 bg-light/30 dark:bg-navy/50 backdrop-blur-md">
          <h3 className="text-lg font-bold line-clamp-1">{name}</h3>
          <p className="text-sm mt-1 line-clamp-3 h-[4rem]">
            {description || "No description..."}
          </p>

          <section className="mt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex gap-2 items-center text-xs text-muted-foreground">
              <span>{startedDate}</span>
              <span>-</span>
              <span>{endedDate}</span>
            </div>

            <div className="flex gap-2">
              {!isPrivate && (
                <Button size="sm" variant="outline">
                  <Link
                    href={linkRepo ?? "https://github.com/MohSolehuddin"}
                    target="_blank">
                    GitHub
                  </Link>
                </Button>
              )}
              <Button size="sm">
                <Link href="#">Show details</Link>
              </Button>
            </div>
          </section>
        </section>
      </SpotlightCard>
    </section>
  );
});

export default Product;
