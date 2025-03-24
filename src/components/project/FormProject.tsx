"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  createProject,
  getProjectById,
  updateProject,
} from "@/app/axios/features/project";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PortfolioInputSchema } from "@/lib/schema/portfolioSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { z } from "zod";
import AlertSuccess from "../alerts/AlertSuccess";
import { AlertError } from "../alerts/error";

export default function FormProduct({
  page,
  id,
}: {
  page: number;
  id?: string;
}) {
  const form = useForm<z.infer<typeof PortfolioInputSchema>>({
    resolver: zodResolver(PortfolioInputSchema),
    defaultValues: {
      id: undefined,
      name: "",
      description: undefined,
      isPrivate: false,
      linkRepo: "",
      image: "",
      started: new Date(),
      ended: new Date(),
    },
  });
  // const [selectedProject, setSelectedProject] = useState<z.infer<
  //   typeof PortfolioInputSchema
  // > | null>(null);

  const queryClient = useQueryClient();

  const {
    mutate: addMutate,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: async (data: z.infer<typeof PortfolioInputSchema>) => {
      return await createProject(data);
    },
    onSuccess: () => {
      form.reset();
      queryClient.refetchQueries({ queryKey: ["projects", page] });
    },
    onError: (err) => {
      console.error("Error:", err);
    },
  });
  const { mutate: editMutate } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: z.infer<typeof PortfolioInputSchema>;
    }) => {
      return await updateProject(id, data);
    },
    onSuccess: () => {
      form.reset();
      queryClient.refetchQueries({ queryKey: ["projects", page] });
    },
    onError: (err) => {
      console.error("Error:", err);
    },
  });

  const onSubmit = (values: z.infer<typeof PortfolioInputSchema>) => {
    if (id) {
      editMutate({ id, data: values });
      return;
    }
    addMutate(values);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getProjectById(id ?? "");
        form.setValue("id", response.id);
        form.setValue("name", response.name);
        form.setValue("description", response.description);
        form.setValue("isPrivate", response.isPrivate);
        form.setValue("linkRepo", response.linkRepo);
        form.setValue("image", response.image);
        form.setValue("started", response.started);
        form.setValue("ended", response.ended);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Project Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Description"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repository Link</FormLabel>
              <FormControl>
                <Input placeholder="Repository Link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="started"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={new Date(field.value).toISOString().split("T")[0]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ended"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={new Date(field.value).toISOString().split("T")[0]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <AlertError message={error?.message ?? ""} />
        <AlertSuccess message={data?.message ?? ""} />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
