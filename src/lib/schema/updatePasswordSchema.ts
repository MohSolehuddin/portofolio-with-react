import { object, string } from "zod";

export const updatePasswordSchema = object({
  email: string({ required_error: "Email is required" })
    .email("Invalid email")
    .optional(),
  lastPassword: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  newPassword: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
