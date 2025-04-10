import { getUserByEmail, updateUser } from "@/data/user";
import { hashPassword, verifyPassword } from "@/lib/utils/password";
import { getToken } from "next-auth/jwt";

export async function POST(req: Request) {
  const { lastPassword, password } = await req.json();
  const sessionToken = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!sessionToken?.email)
    return Response.json(
      { error: "Please login to update password" },
      {
        status: 400,
      }
    );

  const existingUser = await getUserByEmail(sessionToken.email);
  if (!existingUser)
    return Response.json({ error: "User not found" }, { status: 400 });

  const isLastPasswordMatch = await verifyPassword(
    lastPassword,
    existingUser.password ?? ""
  );
  if (!isLastPasswordMatch)
    return Response.json(
      { error: "Last password is incorrect" },
      {
        status: 400,
      }
    );

  const hashedPassword = await hashPassword(password);
  await updateUser(sessionToken?.sub ?? "", {
    password: hashedPassword,
  });
  return Response.json(
    { message: "successfully update password" },
    { status: 200 }
  );
}
