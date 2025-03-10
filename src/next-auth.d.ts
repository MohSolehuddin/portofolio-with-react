import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  OTP_verified: boolean;
};
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: ExtendedUser;
  }
}
