"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { LoginSchema } from "@/lib/schema/loginSchema";
import login from "@/server/actions/login";
import { Dialog } from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import AlertSuccess from "../alerts/AlertSuccess";
import { AlertError } from "../alerts/error";
import InputOTPComponent from "../input/InputOTPComponent";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export function FormLogin() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: undefined,
    },
  });

  const searchParams = useSearchParams();
  const { update } = useSession();

  const errorLinkingAnAccount =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Oops! Something went wrong, please choose another login method"
      : "";

  const [error, setError] = useState<string | null>(null);
  const [OTPError, setOTPError] = useState<string>("");
  const [isOTPModalOpen, setIsOTPModalOpen] = useState<boolean | undefined>(
    undefined
  );
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleModalOpenChange = () => {
    if (isOTPModalOpen) {
      setOtp("");
      setOTPError("");
      form.setValue("code", "");
    }
    setIsOTPModalOpen(!isOTPModalOpen);
    setLoading(false);
  };

  const handleOtpChange = async (e: ChangeEvent<HTMLInputElement>) => {
    form.setValue("code", e.target.value);
    setOtp(e.target.value);
    if (e.target.value.length === 6) {
      setLoading(true);
      onSubmit(form.getValues());
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    if (!values.code && isOTPModalOpen !== undefined) return;
    if (values.code && values.code?.length < 6) return;

    clearAllState();
    setLoading(true);
    const response = await login(values);
    setLoading(false);
    console.log(response);
    if (response.error) {
      if (
        response.error === "2FA is required" ||
        response.error === "Invalid token"
      ) {
        setIsOTPModalOpen(true);
      } else {
        setError(response.error);
      }

      if (values.code) {
        setOTPError(response.error);
      }
      return;
    }
    if (response.message) setSuccess(response.message);
    update();
    clearAllState();
  };

  const clearAllState = () => {
    setError(null);
    setSuccess(null);
    setOTPError("");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Dialog open={isOTPModalOpen} onOpenChange={handleModalOpenChange}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Input OTP</DialogTitle>
              <DialogDescription>
                Please enter the 6 digit code from your authenticator app
              </DialogDescription>
            </DialogHeader>
            <InputOTPComponent
              className="m-auto"
              handleOtpChange={handleOtpChange}
              otp={otp}
              error={OTPError}
            />
          </DialogContent>
        </Dialog>

        <AlertError message={error || errorLinkingAnAccount} />
        <AlertSuccess message={success ?? ""} />

        {isOTPModalOpen !== undefined ? (
          <Button
            onClick={handleModalOpenChange}
            disabled={loading}
            className="w-full">
            {loading ? "Loading..." : "Input OTP"}
          </Button>
        ) : (
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Loading..." : "Login"}
          </Button>
        )}
      </form>
    </Form>
  );
}
