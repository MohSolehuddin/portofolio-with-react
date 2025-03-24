"use client";
import { getProjects } from "@/app/axios/features/project";
import { PortfolioInputSchema } from "@/lib/schema/portfolioSchema";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export interface useProjectsInterface {
  projects: z.infer<typeof PortfolioInputSchema>[];
  paging: { totalPage: number };
  isLoading: boolean;
  error: unknown;
}

export default function useProjects({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects", page],
    queryFn: () => getProjects({ page, limit }),
  });

  const validatedProjects = data
    ? PortfolioInputSchema.array().safeParse(data.data)
    : {
        success: false,
        data: [],
        error: { message: "Don't receipt another data" },
      };

  return {
    projects: validatedProjects.data || [],
    paging: data ? data.paging : { totalPage: 0 },
    isLoading,
    error: error ?? validatedProjects.error,
    isValidatedProjectsSuccess: validatedProjects.success,
  };
}
