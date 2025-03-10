"use server";
import { auth } from "@/auth";
import { getUserByEmail, updateUser } from "@/data/user";
import { UpdateProfileSchema } from "@/lib/schema/updateProfileSchema";
import { z } from "zod";

export const updateProfile = async (
  values: z.infer<typeof UpdateProfileSchema>
) => {
  const validatedInput = UpdateProfileSchema.safeParse(values);
  if (!validatedInput.success) {
    return {
      error: validatedInput.error.errors.map((err) => err.message).join(", "),
    };
  }

  const { email, name } = values;
  const session = await auth();
  if (!session?.user?.email) return { success: false, error: "Unauthorized" };

  try {
    const user = await getUserByEmail(session.user.email);
    if (!user) return { success: false, error: "User not found" };

    const updatedData: Partial<z.infer<typeof UpdateProfileSchema>> = {};

    if (name && name !== user.name) {
      updatedData.name = name;
    }
    if (email && email !== user.email) {
      updatedData.email = email;
    }

    if (Object.keys(updatedData).length === 0) {
      return { success: false, error: "Please change one or more fields" };
    }

    await updateUser(user.id, updatedData);

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong. Please try again later." };
  }
};
