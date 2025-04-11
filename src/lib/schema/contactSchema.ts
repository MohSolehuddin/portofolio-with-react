import { z } from "zod";

export const ContactSchema = z.object({
  from: z.string(),
  phoneNumber: z
    .string()
    .regex(/^\+[\d\s\-()]{6,20}$/, {
      message:
        "Please enter a valid phone number and include your country code (e.g. +62 812-3456-7890), min 6 characters and max 20 characters",
    })
    .optional(),
  email: z.string().email({ message: "Invalid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});
