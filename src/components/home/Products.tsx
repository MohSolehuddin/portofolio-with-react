"use client";
import { getProjects } from "@/app/axios/features/project";
import { PortfolioInputSchema } from "@/lib/schema/portfolioSchema";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Loading from "../Loading";
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects({ page: 1, limit: 100 }),
  });

  if (isLoading) return <Loading />;
  if (error)
    return <p className="text-center text-red-500">Error loading projects.</p>;

  const validatedProjects = PortfolioInputSchema.array().safeParse(data);
  if (!validatedProjects.success)
    return <p className="text-center text-red-500">Invalid data format.</p>;

  return (
    <>
      <h3 className="text-5xl text-light mb-12 font-extrabold text-center">
        My Recent Projects
      </h3>
      <section className="min-h-screen z-40 w-full flex flex-wrap justify-center items-center gap-6">
        {validatedProjects.data.map((project) => (
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
      </section>
    </>
  );
}
