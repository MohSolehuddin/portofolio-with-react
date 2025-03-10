"use server";
import { auth } from "@/auth";
import { authenticator } from "otplib";

export async function generate2fa() {
  const session = await auth();
  const secret = authenticator.generateSecret();
  const token = authenticator.generate(secret);

  const otpauthUrl = `otpauth://totp/learn-advanced-auth:${session?.user.email}?secret=${secret}&issuer=learn-advanced-auth`;

  return { secret, token, otpauthUrl };
}
