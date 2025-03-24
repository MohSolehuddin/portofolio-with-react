"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createProject } from "@/app/axios/features/project";
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
import { z } from "zod";
import AlertSuccess from "../alerts/AlertSuccess";
import { AlertError } from "../alerts/error";

export default function FormProduct({ page }: { page: number }) {
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

  const queryClient = useQueryClient();

  const { mutate, isPending, error, data } = useMutation({
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

  const onSubmit = (values: z.infer<typeof PortfolioInputSchema>) => {
    mutate(values);
  };

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
