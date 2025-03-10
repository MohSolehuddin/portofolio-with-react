"use client";
import AuthContainer from "@/components/auth/AuthContainer";
import { FormLogin } from "@/components/auth/FormLogin";
import Loading from "@/components/Loading";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthContainer variant="login">
        <FormLogin />
      </AuthContainer>
    </Suspense>
  );
}
