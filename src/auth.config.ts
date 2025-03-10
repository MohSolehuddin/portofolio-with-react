import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { getUserByEmail } from "./data/user";
import { LoginSchema } from "./lib/schema/loginSchema";
import { verifyPassword } from "./lib/utils/password";
export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);
        if (!validateFields.success) return null;
        const { email, password } = validateFields.data;
        const user = await getUserByEmail(email);
        const isValid = await verifyPassword(password, user?.password ?? "");
        if (isValid) {
          return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            image: user?.image,
            role: user?.role,
          };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
