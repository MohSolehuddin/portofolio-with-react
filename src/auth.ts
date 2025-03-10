import authConfig from "@/auth.config";
import { db } from "@/server/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import { getUserById, makeEmailIsVerified } from "./data/user";
import { JWT_EXPIRATION_IN_HOURS } from "./lib/constants";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: JWT_EXPIRATION_IN_HOURS,
  },
  events: {
    async linkAccount({ user }) {
      await makeEmailIsVerified(user.email ?? "");
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, trigger, session }) {
      if (!token.sub) return token;
      if (trigger && trigger !== "update") {
        const existingUser = await getUserById(token.sub);
        if (!existingUser) return token;
        token.role = existingUser.role;
        token.name = existingUser.name;
        token.email = existingUser.email;
        token.image = existingUser.image;
        token.OTP_verified = !!existingUser.twoFA_key;
      }
      if (trigger === "update" && session) {
        token.name = session.name;
        token.email = session.email;
        token.image = session.image;
      }
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.image = token.image as string;
        session.user.role = token.role as UserRole;
        session.user.OTP_verified = token.OTP_verified as boolean;
      }
      return session;
    },
  },
});
