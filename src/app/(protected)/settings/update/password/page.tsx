"use client";

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
import { updatePasswordSchema } from "@/lib/schema/updatePasswordSchema";
import { updatePassword } from "@/server/actions/updatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      lastPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updatePasswordSchema>) => {
    setLoading(true);
    setError("");
    setSuccess("");
    const formData = {
      ...values,
      email: session?.user.email ?? "",
    };
    const response = await updatePassword(formData);
    if (response.error) setError(response.error);
    if (response.message) setSuccess(response.message);
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
            name="lastPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <InputPassword {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <InputPassword {...field} />
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
