import { z } from "zod";
import { MIN_NAME_LENGTH } from "../constants";

export const UpdateProfileSchema = z.object({
  name: z
    .string()
    .min(MIN_NAME_LENGTH, {
      message: `Name must be at least ${MIN_NAME_LENGTH} characters.`,
    })
    .optional(),
  email: z.string().email({ message: "Invalid email address." }).optional(),
});
