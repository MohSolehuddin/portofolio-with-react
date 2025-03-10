"use server";
import { makeEmailIsVerified } from "@/data/user";
import {
  deleteExistingVerificationTokenByEmail,
  getVerificationTokenByToken,
} from "@/data/verificationToken";

export const verifyToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (
    existingToken?.token === token &&
    existingToken.expires > new Date() &&
    !existingToken.deletedAt
  ) {
    await makeEmailIsVerified(existingToken.email);
    await deleteExistingVerificationTokenByEmail(existingToken.email);
    return { success: "Email is verified" };
  }
  return {
    error: "Token is invalid, please try again, or resend verification email",
  };
};
