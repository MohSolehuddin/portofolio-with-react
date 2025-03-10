"use server";
import { getUserByEmail } from "@/data/user";
import {
  createVerificationToken,
  deleteExistingVerificationTokenByEmail,
  getVerificationTokenByEmail,
} from "@/data/verificationToken";
import Crypto from "node:crypto";
export const generateVerificationToken = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user) return { status: "error", message: "User not found", data: null };
  if (user.emailVerified)
    return { status: "error", message: "Email already verified", data: null };

  const token = Crypto.randomBytes(64).toString("hex");
  const expires = new Date(Date.now() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) await deleteExistingVerificationTokenByEmail(email);
  const newToken = await createVerificationToken(email, token, expires);

  return {
    status: "success",
    message: "Verification token created",
    data: newToken,
  };
};
