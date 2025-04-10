import { getUserByEmail } from "@/data/user";
import { createVerificationToken } from "@/data/verificationToken";
import senEmailVerification from "@/lib/sendEmailVerification";
import Crypto from "node:crypto";
export async function POST(req: Request) {
  const { email } = await req.json();

  const existingUser = await getUserByEmail(email);
  if (!existingUser)
    return Response.json({ error: "User not found" }, { status: 400 });

  const createdToken = Crypto.randomBytes(64).toString("hex");
  const expires = new Date(Date.now() + 3600 * 1000);
  const createdVerificationToken = await createVerificationToken(
    email,
    createdToken,
    expires
  );

  const linkVerification = `${process.env.DOMAIN}/auth/reset-password?token=${createdVerificationToken.token}`;
  await senEmailVerification(
    email,
    linkVerification,
    existingUser.name,
    "Reset your password"
  );
  return Response.json(
    {
      message: "Password reset successfully",
    },
    { status: 200 }
  );
}
