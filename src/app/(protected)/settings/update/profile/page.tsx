"use client";

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
import { UpdateProfileSchema } from "@/lib/schema/updateProfileSchema";
import { updateProfile } from "@/server/actions/updateProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const router = useRouter();
  const { update } = useSession();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
  });

  const onSubmit = async (values: z.infer<typeof UpdateProfileSchema>) => {
    setLoading(true);
    setError("");
    setSuccess("");
    const response = await updateProfile(values);

    if (response.error) setError(response.error);
    if (response.message) {
      setSuccess(response.message + ". Automatic redirecting...");
      await update({
        name: values.name,
        email: values.email,
      });
      setTimeout(() => {
        router.back();
      }, 1000);
    }
    setLoading(false);
  };

  return (
    <div className="w-[400px] m-auto mt-12">
      <section className="flex flex-col gap-6">
        <Button onClick={() => router.back()}>Back</Button>
        <div>update password</div>
      </section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
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
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input placeholder="example@msytc.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertError message={error ?? ""} />
          <AlertSuccess message={success ?? ""} />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Loading..." : "Update password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
