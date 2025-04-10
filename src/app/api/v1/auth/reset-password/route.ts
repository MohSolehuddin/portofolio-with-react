import { getUserByEmail, updateUser } from "@/data/user";
import {
  deleteExistingVerificationTokenByEmail,
  getVerificationTokenByToken,
} from "@/data/verificationToken";
import { hashPassword } from "@/lib/utils/password";

export async function POST(req: Request) {
  const { token, password } = await req.json();
  const existingResetToken = await getVerificationTokenByToken(token);
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
  await updateUser(existingUser.id, {
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
