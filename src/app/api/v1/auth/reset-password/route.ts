import { getUserByEmail, updateUser } from "@/data/user";
import {
  deleteExistingVerificationTokenByEmail,
  getVerificationTokenByToken,
} from "@/data/verificationToken";
import { hashPassword } from "@/lib/utils/password";
import { getToken } from "next-auth/jwt";

export async function POST(req: Request) {
  const { token, password } = await req.json();
  console.log({ token, password });
  const sessionToken = await getToken({ req, secret: process.env.AUTH_SECRET });
  const existingResetToken = await getVerificationTokenByToken(token);

  if (sessionToken?.email !== existingResetToken?.email)
    return Response.json(
      { error: "Token is invalid, please try again" },
      {
        status: 400,
      }
    );
  if (!existingResetToken)
    return Response.json(
      { error: "Token is invalid, please try again" },
      {
        status: 400,
      }
    );
  await deleteExistingVerificationTokenByEmail(existingResetToken.email);

  const hashedPassword = await hashPassword(password);
  const existingUser = await getUserByEmail(existingResetToken.email);
  if (!existingUser)
    return Response.json({ error: "User not found" }, { status: 400 });
  await updateUser(existingResetToken.email, {
    password: hashedPassword,
  });
  return Response.json(
    { message: "Password reset successfully" },
    { status: 200 }
  );
}

export function GET() {
  return Response.json({ message: "Something went wrong" }, { status: 500 });
}
