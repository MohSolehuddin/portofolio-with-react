"use client";
import { resetPassword } from "@/app/axios/features/password";
import AlertSuccess from "@/components/alerts/AlertSuccess";
import { AlertError } from "@/components/alerts/error";
import InputPassword from "@/components/input/InputPassword";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Home() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const ForgotPasswordSchema = z
    .object({
      token: z.string(),
      password: z.string(),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      token: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    const response = await resetPassword({ token, password: data.password });
    if (response.error) return setError(response.error);
    setSuccess(response.message);
  };

  return (
    <Form {...form}>
      <section className="absolute top-0 left-0 w-screen flex h-screen flex-col justify-center items-center gap-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-96">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputPassword {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputPassword {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AlertError message={error} />
          <AlertSuccess message={success} />
          <Button>Reset password</Button>
        </form>
      </section>
    </Form>
  );
}
