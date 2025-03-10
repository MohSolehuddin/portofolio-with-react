"use client"; // Pastikan ini ada di atas komponen

import AlertSuccess from "@/components/alerts/AlertSuccess";
import { AlertError } from "@/components/alerts/error";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { verifyToken } from "@/server/actions/verifyToken";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5); // Timer countdown (in seconds)
  const router = useRouter();

  const checkToken = async () => {
    if (!token) return;
    const response = await verifyToken(token);
    if (response.success) {
      setSuccess(response.success);
      // Start countdown timer
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            router.push("/auth/login");
          }
          return prev - 1;
        });
      }, 1000);
    }
    if (response.error) {
      setError(response.error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Token:", token); // Log token for debugging
      checkToken();
    }
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-extrabold mb-2 text-primary">
        Verify your email
      </h1>
      <h2 className="text-xl font-bold mb-12 text-zinc-700">
        Please check your email
      </h2>
      <section className="w-[400px]">
        <AlertError message={error ?? ""} />
        <AlertSuccess message={success ?? ""} />
      </section>
      {!error && !success && <Loading />}

      {!success && (
        <>
          <p className="text-zinc-700 mb-2 mt-12">
            If you don&apos;t receive an email, please check your spam folder
          </p>
          <p className="text-zinc-800 mb-4">
            If you don&apos;t receive an email, please try again
          </p>
          <Button onClick={() => checkToken()}>Try again</Button>
        </>
      )}
      {success && (
        <>
          <p>Auto redirect in {countdown} seconds</p>
          <Button onClick={() => router.push("/auth/login")}>Login</Button>
        </>
      )}
    </div>
  );
}
