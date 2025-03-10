"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/lib/schema/loginSchema";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { z } from "zod";
import { verify2fa } from "./2fa/verify";

export default async function login(values: z.infer<typeof LoginSchema>) {
  const validated = LoginSchema.safeParse(values);
  if (!validated.success) return { error: validated.error.message };
  const { email, password } = validated.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "Email or password is incorrect" };

  if (!existingUser.emailVerified) {
    return {
      error: "Email is not verified, please check your email",
    };
  }

  if (existingUser.twoFA_key) {
    if (!values.code) {
      return {
        error: "2FA is required",
      };
    }

    const verified2faCode = await verify2fa({
      token: values.code ?? "",
      secret: existingUser.twoFA_key,
    });
    if (!verified2faCode.success) return { error: verified2faCode.message };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email or password is incorrect" };
        default:
          return { error: "Something went wrong" };
      }
    }
    console.log("Error logging in", error);
    throw error;
  }

  return { message: "Logged in successfully" };
}
