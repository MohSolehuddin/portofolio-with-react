import { getToken } from "next-auth/jwt";

export const validateToken = async (req: Request) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) return false;
  if (token.exp && token.exp < Date.now() / 1000) return false;
  return true;
};
