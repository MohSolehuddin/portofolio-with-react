"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import SeparatorWithText from "../separator/SeparatorWithText";
import { Button } from "../ui/button";

interface AuthContainerProps {
  variant: "login" | "register" | "error";
  children: React.ReactNode;
  headerLabel?: string;
  backButtonLabel?: string;
  hrefBack?: string;
  hrefBackLabel?: string;
  authLabel?: string;
  loading?: boolean;
}
export default function AuthContainer({
  children,
  variant = "login",
  loading = false,
  headerLabel,
  backButtonLabel,
  hrefBack,
  hrefBackLabel,
  authLabel,
}: AuthContainerProps) {
  return (
    <div className="flex flex-col xl:w-[400px] justify-center items-center min-h-screen m-auto">
      <h3 className="text-2xl mb-6 font-extrabold">
        {headerLabel ?? variant === "login"
          ? "Welcome back"
          : variant === "error"
          ? "Oops! Something went wrong!"
          : "Create an account"}
      </h3>
      {children}
      {variant !== "error" && (
        <>
          <SeparatorWithText label="Or" />
          <section className="flex flex-col gap-2 w-full">
            <Button
              disabled={loading}
              className="w-full"
              onClick={() => {
                signIn("google");
              }}>
              <FcGoogle className="mr-2" />
              {loading ? "Loading..." : `${authLabel ?? variant} with Google`}
            </Button>
            <Button
              disabled={loading}
              className="w-full"
              onClick={() => {
                signIn("github");
              }}>
              <FaGithub className="mr-2" />
              {loading ? "Loading..." : `${authLabel ?? variant} with Github`}
            </Button>
          </section>
        </>
      )}

      <section className="flex w-full justify-center items-center">
        {variant !== "error" && (
          <p>
            {backButtonLabel ?? variant === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
        )}
        <Button variant="link">
          <Link
            href={
              hrefBack ??
              `${variant === "login" ? "/auth/register" : "/auth/login"}`
            }>
            {hrefBackLabel ?? variant === "login"
              ? "Register"
              : variant === "error"
              ? "Back to login"
              : "Login"}
          </Link>
        </Button>
      </section>
    </div>
  );
}
