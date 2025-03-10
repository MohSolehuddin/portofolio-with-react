"use client";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { data: session, status, update } = useSession();
  console.log({ session });

  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      update();
    }
  });

  const onPasswordUpdate = () => {
    router.push("/settings/update/password");
  };
  const onUpdateProfile = () => {
    router.push("/settings/update/profile");
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="m-auto w-fit flex flex-col gap-6 bg-secondary p-8 rounded-xl">
      <Image
        src={session?.user?.image ?? "/vercel.svg"}
        loader={() => session?.user?.image ?? "/vercel.svg"}
        alt="logo"
        width={100}
        height={100}
        className="m-auto"
      />
      <section>
        <h1>Hallo, {session?.user?.name}</h1>
        <h2>Your email, {session?.user?.email}</h2>
        <h2>
          IS OTP , {session?.user?.OTP_verified ? "VERIFIED" : "NOT VERIFIED"}
        </h2>
      </section>
      <section className="flex gap-6">
        <Button onClick={onUpdateProfile}>Update Profile</Button>
        <Button onClick={onPasswordUpdate}>Update Password</Button>
      </section>
      <Link href="/2fa/enable" className="m-auto">
        <Button>Enable Two Factor Authentication</Button>
      </Link>
    </div>
  );
}
