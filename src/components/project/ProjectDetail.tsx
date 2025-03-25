"use client";
import { getProjectById } from "@/app/axios/features/project";
import { PortfolioInputSchema } from "@/lib/schema/portfolioSchema";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function ProjectDetail({ id }: { id: string | undefined }) {
  const [projectById, setProjectById] = useState<
    z.infer<typeof PortfolioInputSchema> | undefined
  >(undefined);

  useEffect(() => {
    if (id) {
      const getProject = async () => {
        const project = await getProjectById(id);
        console.log(project);
        setProjectById(project);
      };
      getProject();
    }
  }, [id]);

  if (!projectById) return <p>Project not selected</p>;

  return (
    <section className="w-1/2 h-1/2 z-50 bg-white">
      <h3>Project details</h3>
      <p>{projectById.name}</p>
      <p>{projectById.deletedAt?.toLocaleDateString() ?? ""}</p>
      <p>{new Date(projectById.started).toLocaleString()}</p>
      <p>{new Date(projectById.ended).toLocaleString()}</p>
      <p>{projectById.linkRepo}</p>
      <p>{projectById.isPrivate}</p>
      <p>{projectById.image}</p>
      <p>{projectById.description ?? "-"}</p>
      <p>{projectById.id}</p>
    </section>
  );
}
