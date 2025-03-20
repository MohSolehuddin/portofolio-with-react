"use client";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return (
    <section className="p-6 rounded-xl">
      <h3>Welcome {session?.user.name}</h3>
    </section>
  );
}
