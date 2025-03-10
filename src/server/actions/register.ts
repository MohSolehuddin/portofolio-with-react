"use server";

import { registerInputSchema } from "@/lib/schema/registerSchema";
import senEmailVerification from "@/lib/sendEmailVerification";
import { generateVerificationToken } from "@/lib/token";
import { hashPassword } from "@/lib/utils/password";
import { db } from "@/server/db";
import { z } from "zod";
export default async function register(
  values: z.infer<typeof registerInputSchema>
) {
  const validated = registerInputSchema.safeParse(values);
  if (!validated.success) return { error: validated.error.message };
  const { name, email, password } = validated.data;
  try {
    const userExist = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (userExist && userExist.email)
      return { error: "Email is already exist" };
    const hashedPassword = await hashPassword(password);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const generatedVerifyToken = await generateVerificationToken(email);

    if (generatedVerifyToken?.status === "error")
      return { error: generatedVerifyToken.message };

    const linkVerification = `http://localhost:3000/auth/verify-email?token=${generatedVerifyToken.data?.token}`;
    await senEmailVerification(email, linkVerification, name);
    return {
      message:
        "Registration successful, please check your email for verify your email",
    };
  } catch (e) {
    return { error: "Something went wrong", message: String(e) };
  }
}
