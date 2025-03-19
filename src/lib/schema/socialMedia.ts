import { SocialMediaTYPE } from "@prisma/client";
import { z } from "zod";

export const socialMediaSchema = z.object({
  id: z.string().optional(),
  type: z
    .nativeEnum(SocialMediaTYPE)
    .refine((value) => Object.values(SocialMediaTYPE).includes(value), {
      message: `Invalid social media type, possible values are: ${Object.values(
        SocialMediaTYPE
      ).join(", ")}`,
    }),
  name: z.string(),
  link: z.string().url(),
});

export type SocialMediaType = z.infer<typeof socialMediaSchema>;
