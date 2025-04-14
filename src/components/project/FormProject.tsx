"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  createProject,
  getProjectById,
  makeProjectCompleted,
  makeProjectOngoing,
  updateProject,
} from "@/app/axios/features/project";
import AlertSuccess from "@/components/alerts/AlertSuccess";
import { AlertError } from "@/components/alerts/error";
import ReactHookFormBooleanInput from "@/components/input/ReactHookFormBooleanInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PortfolioInputSchema } from "@/lib/schema/portfolioSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { z } from "zod";
import ReactHookFormDateInput from "../input/ReactHookFormDateInput";
import ReactHookFormTextInput from "../input/ReactHookFormTextInput";
import { Input } from "../ui/input";

interface FileInputProps {
  onChange: (file: File | null) => void;
  accept: string;
}

const FileInput: React.FC<FileInputProps> = ({ onChange, accept }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onChange(file || null);
  };

  return <Input type="file" accept={accept} onChange={handleFileChange} />;
};

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
      isShow: true,
      linkRepo: "",
      image: undefined,
      started: new Date(),
      ended: new Date(),
    },
  });
  const [isCompleted, setIsCompleted] = useState(false);

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
  const { mutate: toggleCompleteMutate } = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      if (isCompleted) {
        return await makeProjectOngoing(id);
      }
      return await makeProjectCompleted(id);
    },
    onSuccess: () => {
      setIsCompleted(!isCompleted);
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

  const toggleCompletedProject = () => {
    toggleCompleteMutate({ id: id ?? "" });
    // console.log("completedAt", form.getValues("completedAt"));
    // if (form.getValues("completedAt")) {
    //   form.setValue("completedAt", undefined);
    // } else {
    //   const currentDate = new Date();
    //   form.setValue("completedAt", currentDate);
    // }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getProjectById(id ?? "");
        form.setValue("name", response.name);
        form.setValue("description", response.description);
        form.setValue("linkRepo", response.linkRepo);
        form.setValue("image", response.image);
        form.setValue("isPrivate", response.isPrivate);
        form.setValue("isShow", response.isShow);
        form.setValue("started", response.started);
        form.setValue("ended", response.ended);
        if (response.completedAt) setIsCompleted(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <ReactHookFormTextInput form={form} name="name" label="Project Name" />
        <ReactHookFormTextInput
          form={form}
          name="description"
          label="Description"
        />
        <ReactHookFormTextInput
          form={form}
          name="linkRepo"
          label="Repository Link"
        />
        {/* <ReactHookFormTextInput form={form} name="image" label="Image URL" /> */}

        <FormField
          control={form.control}
          name="image"
          render={({}) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileInput
                  onChange={(file) => {
                    if (file) {
                      form.setValue("image", file);
                    }
                  }}
                  accept="image/*"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ReactHookFormBooleanInput
          form={form}
          name="isPrivate"
          label="Private Repository"
        />
        <ReactHookFormBooleanInput
          form={form}
          name="isShow"
          label="Show on Portfolio"
          selectItemLabels={{ true: "Show", false: "Hide" }}
        />
        <ReactHookFormDateInput form={form} name="started" label="Start Date" />
        <ReactHookFormDateInput form={form} name="ended" label="End Date" />
        <Button type="button" onClick={toggleCompletedProject}>
          {isCompleted ? "Make Incomplete" : "Make Complete"}
        </Button>

        <AlertError message={error?.message ?? ""} />
        <AlertSuccess message={data?.message ?? ""} />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
