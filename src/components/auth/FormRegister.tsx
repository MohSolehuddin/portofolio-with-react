"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
// import { api } from "@/trpc/server";

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
import { registerInputSchema } from "@/lib/schema/registerSchema";
import register from "@/server/actions/register";
import { useState } from "react";
import AlertSuccess from "../alerts/AlertSuccess";
import { AlertError } from "../alerts/error";

export function FormRegister() {
  const form = useForm<z.infer<typeof registerInputSchema>>({
    resolver: zodResolver(registerInputSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
      // image: undefined,
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  interface responseSchema {
    error?: string;
    message?: string;
    name?: string;
    email?: string;
  }

  async function onSubmit(values: z.infer<typeof registerInputSchema>) {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const response: responseSchema = await register(values);
    if (response.error) setError(response.error);
    if (response.message) setSuccess(response.message);
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@mystc.com"
                  {...field}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) => onChange(event.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {error && <AlertError message={error} />}
        {success && <AlertSuccess message={success} />}
        <Button type="submit" className="w-full">
          {loading ? "Loading..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}
