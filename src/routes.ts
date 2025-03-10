export const publicRoutes = ["/"];
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/verify-email",
  "/auth/2fa",
];
export const protectedRoutes = ["/settings"];
export const apiAuthPrefix = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT = "/settings";
