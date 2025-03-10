"use server";
import { signOut } from "@/auth";

export default async function logout() {
  await signOut();
  return { message: "Logged out successfully" };
}
