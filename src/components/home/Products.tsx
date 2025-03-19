"use client";
import { getProjects } from "@/app/axios/features/project";
import { PortfolioInputSchema } from "@/lib/schema/portfolioSchema";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../Loading";
import { CustomPagination } from "../pagination/CustomPagination";
import Product from "../product/Product";

const queryClient = new QueryClient();

export default function Products() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsContent />
    </QueryClientProvider>
  );
}

function ProductsContent() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects", page],
    queryFn: () => getProjects({ page, limit: 3 }),
  });

  if (isLoading)
    return (
      <section className="h-screen flex justify-center items-center">
        <Loading />
      </section>
    );
  if (error)
    return (
      <section className="h-screen flex justify-center items-center">
        <p className="text-center text-red-500">Error loading projects.</p>
      </section>
    );

  const validatedProjects = PortfolioInputSchema.array().safeParse(data.data);
  if (!validatedProjects.success)
    return (
      <section className="h-screen flex justify-center items-center">
        <p className="text-center text-red-500">Invalid data format.</p>
      </section>
    );

  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-12">
      <h3 className="text-5xl text-navy dark:text-light font-extrabold text-center">
        My Recent Projects
      </h3>
      <section className="z-40 w-full flex flex-wrap justify-center items-center gap-6">
        {validatedProjects.data.map((project) => (
          <Product
            key={project.id}
            name={project.name}
            description={project.description}
            linkRepo={project.linkRepo}
            image={project.image}
            started={project.started}
            ended={project.ended}
            isPrivate={project.isPrivate}
          />
        ))}
      </section>
      <CustomPagination
        currentPage={page}
        setCurrentPage={setPage}
        totalPage={data.paging.totalPage}
      />
    </section>
  );
}
