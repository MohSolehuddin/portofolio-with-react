import { createVerificationToken } from "@/data/verificationToken";
import senEmailVerification from "@/lib/sendEmailVerification";
import { getToken } from "next-auth/jwt";
import Crypto from "node:crypto";
export async function POST(req: Request) {
  const sessionToken = await getToken({ req, secret: process.env.AUTH_SECRET });

  const createdToken = Crypto.randomBytes(64).toString("hex");
  const expires = new Date(Date.now() + 3600 * 1000);
  const createdVerificationToken = await createVerificationToken(
    sessionToken?.email as string,
    createdToken,
    expires
  );

  const linkVerification = `${process.env.DOMAIN}/auth/reset-password?token=${createdVerificationToken.token}`;
  await senEmailVerification(
    sessionToken?.email as string,
    linkVerification,
    sessionToken?.name as string
  );
  return {
    message: "Password reset successfully",
  };
}
