"use server";

import { getAllowedEmail } from "@/data/allowedEmail";
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
    const emailExist = await getAllowedEmail(email);
    if (!emailExist)
      return {
        error: "Email is not allowed to register, Please contact admin",
      };

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

    const linkVerification = `${process.env.DOMAIN}/auth/verify-email?token=${generatedVerifyToken.data?.token}`;
    await senEmailVerification(email, linkVerification, name);
    return {
      message:
        "Registration successful, please check your email for verify your email",
    };
  } catch (e) {
    return { error: "Something went wrong", message: String(e) };
  }
}
