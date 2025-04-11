import { headers } from "next/headers";

export const getIp = async () => {
  const header = await headers();
  const forwardedFor = header.get("x-forwarded-for");
  const realIp = header.get("x-real-ip");

  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  if (realIp) return realIp.trim();
  return null;
};
