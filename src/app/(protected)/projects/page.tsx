"use client";
import Loading from "@/components/Loading";
import { CustomPagination } from "@/components/pagination/CustomPagination";
import FormProduct from "@/components/project/FormProject";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useProjects from "@/hooks/useProjects";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { FaPen, FaPlus, FaRegEye, FaTrash } from "react-icons/fa";

export default function Page() {
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

  useEffect(() => {
    setListCheckedPortfolio([]);
  }, [page]);

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
      <h3 className="mb-6">Daftar Project</h3>
      <section className="bg-navy/20 dark:bg-light/5 rounded-lg p-6 mb-6">
        <table
          className="rounded-xl w-full overflow-hidden"
          cellPadding="4"
          cellSpacing="4">
          <thead>
            <tr className="bg-light dark:bg-dark">
              <th className="p-4">
                <Button onClick={handleCheckedAllPortfolio}>
                  {projects.length === listCheckedPortfolio.length
                    ? "Unselect All"
                    : "Select All"}
                </Button>
              </th>
              <th className="p-4">Project</th>
              <th className="p-4">Description</th>
              <th className="p-4">Link</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <td className="p-4 text-center">
                  <Input
                    type="checkbox"
                    checked={listCheckedPortfolio.includes(
                      project.id as string
                    )}
                    onClick={() => handleCheckedPortfolio(project.id ?? "")}
                    className="w-6 h-6"
                  />
                </td>
                <td className="p-4">{project.name}</td>
                <td className="p-4">
                  {project.description && project.description?.length > 50
                    ? project.description?.slice(0, 50) + "..."
                    : project.description}
                </td>
                <td className="p-4">{project.linkRepo}</td>
                <td className="p-4 flex gap-4">
                  <Button>
                    <FaRegEye />
                    <p>Details</p>
                  </Button>
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
      </section>
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
