"use client";
import { forgotPassword } from "@/app/axios/features/password";
import AlertSuccess from "@/components/alerts/AlertSuccess";
import { AlertError } from "@/components/alerts/error";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Home() {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const ForgotPasswordSchema = z.object({
    email: z.string().email(),
  });
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    const response = await forgotPassword({ email: data.email });
    if (response) return setError(response.error);
    setSuccess(response.message);
  };

  return (
    <Form {...form}>
      <section className="absolute top-0 left-0 w-screen flex h-screen flex-col justify-center items-center gap-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-96">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AlertError message={error} />
          <AlertSuccess message={success} />
          <Button>Send email verification link for reset your password</Button>
        </form>
      </section>
    </Form>
  );
}
