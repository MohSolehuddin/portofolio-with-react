"use server";
import { auth } from "@/auth";
import { updateUser } from "@/data/user";
import { authenticator } from "otplib";

export async function verify2fa({
  token,
  secret,
}: {
  token: string;
  secret: string;
}) {
  const session = await auth();
  const isValid = authenticator.check(token, secret);

  if (isValid) {
    if (secret && session?.user)
      await updateUser(session?.user.id as string, { twoFA_key: secret });
    return { message: "Token is valid", success: true };
  } else {
    return { message: "Invalid token", success: false };
  }
}
