"use server";
import { getUserByEmail, updateUser } from "@/data/user";
import { updatePasswordSchema } from "@/lib/schema/updatePasswordSchema";
import { hashPassword, verifyPassword } from "@/lib/utils/password";
import { z } from "zod";

export const updatePassword = async (
  values: z.infer<typeof updatePasswordSchema>
) => {
  const validatedInput = updatePasswordSchema.safeParse(values);
  if (!validatedInput.success) return { error: validatedInput.error.message };

  const { email, lastPassword, newPassword } = values;
  try {
    const user = await getUserByEmail(email ?? "");
    if (user) {
      const lastPasswordMatch = await verifyPassword(
        lastPassword,
        user?.password ?? ""
      );
      if (lastPasswordMatch) {
        if (lastPassword.trim() === newPassword.trim()) {
          return { error: "Password is same" };
        }
        const hashedNewPassword = await hashPassword(newPassword);
        await updateUser(user.id, {
          password: hashedNewPassword,
        });
        return { message: "Password updated successfully" };
      }
      return { error: "Invalid last password" };
    }
    return { error: "User not found" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
