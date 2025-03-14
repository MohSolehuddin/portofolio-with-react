"use client";
import { PortfolioSchema } from "@/lib/schema/portfolioSchema";
import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";
import Loading from "../Loading";
import Product from "../product/Product";

export default function Products() {
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

  return (
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
  );
}
