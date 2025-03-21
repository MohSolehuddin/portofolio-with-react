"use client";
import Loading from "@/components/Loading";
import { CustomPagination } from "@/components/pagination/CustomPagination";
import useProjects from "@/hooks/useProjects";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const { projects, paging, isLoading, error } = useProjects({
    page,
    limit: 10,
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
  return (
    <section className="p-6 rounded-xl">
      <h3>Welcome {session?.user.name}</h3>
      <h3>Daftar Project</h3>
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Description</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {projects?.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.linkRepo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustomPagination
        setCurrentPage={setPage}
        currentPage={page}
        totalPage={paging.totalPage}
      />
    </section>
  );
}
