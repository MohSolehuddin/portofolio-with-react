"use client";
import Loading from "@/components/Loading";
import { CustomPagination } from "@/components/pagination/CustomPagination";
import FormProduct from "@/components/project/FormProject";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useProjects from "@/hooks/useProjects";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";

export default function Page() {
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [isModalAddProjectOpen, setIsModalAddProjectOpen] = useState(false);
  const [listCheckedPortfolio, setListCheckedPortfolio] = useState<string[]>(
    []
  );

  const { projects, paging, isLoading, error } = useProjects({
    page,
    limit: 10,
  });

  const handleCheckedPortfolio = (id: string) => {
    setListCheckedPortfolio((prevChecked) => {
      if (prevChecked.includes(id)) {
        return prevChecked.filter((item) => item !== id);
      } else {
        return [...prevChecked, id];
      }
    });
  };

  const handleCheckedAllPortfolio = () => {
    if (projects.length === listCheckedPortfolio.length) {
      setListCheckedPortfolio([]);
    } else {
      setListCheckedPortfolio(projects.map((item) => item.id ?? ""));
    }
  };

  const handleModalOpenChange = () => {
    setIsModalAddProjectOpen(!isModalAddProjectOpen);
  };

  const onAddProject = () => {
    setIsModalAddProjectOpen(true);
  };

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
      <section className="flex justify-end gap-4">
        {listCheckedPortfolio.length > 0 && (
          <Button variant={"destructive"}>
            <FaTrash />
            <p>Delete</p>
          </Button>
        )}
        <Button onClick={onAddProject}>
          <FaPlus />
          <p>Add Project</p>
        </Button>
      </section>
      <h3>Welcome {session?.user.name}</h3>
      <h3>Daftar Project</h3>
      <table>
        <thead>
          <tr>
            <th>
              <Input
                type="checkbox"
                checked={projects.length === listCheckedPortfolio.length}
                onClick={handleCheckedAllPortfolio}
              />
            </th>
            <th>Project</th>
            <th>Description</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects?.map((project) => (
            <tr key={project.id}>
              <td>
                <Input
                  type="checkbox"
                  checked={listCheckedPortfolio.includes(project.id as string)}
                  onClick={() => handleCheckedPortfolio(project.id ?? "")}
                />
              </td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.linkRepo}</td>
              <td className="flex gap-2">
                <Button>
                  <FaPen />
                  <p>Edit</p>
                </Button>
                <Button variant={"destructive"}>
                  <FaTrash />
                  <p>Delete</p>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustomPagination
        setCurrentPage={setPage}
        currentPage={page}
        totalPage={paging.totalPage}
      />
      <section
        className={`${
          isModalAddProjectOpen
            ? "absolute top-0 left-0 bg-dark/30 dark:bg-white/30  w-screen h-screen flex justify-center items-center"
            : "hidden"
        }`}>
        <Dialog
          open={isModalAddProjectOpen}
          onOpenChange={handleModalOpenChange}>
          <DialogContent className="sm:max-w-[425px] w-full p-6 rounded-lg bg-white dark:bg-dark">
            <DialogHeader>
              <DialogTitle>Add a Project</DialogTitle>
            </DialogHeader>
            <FormProduct />
          </DialogContent>
        </Dialog>
      </section>
    </section>
  );
}
