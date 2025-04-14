import { z } from "zod";

const FileSchema = z.object({
  name: z.string(),
  type: z
    .string()
    .refine(
      (type) => ["image/jpeg", "image/png", "image/webp"].includes(type),
      {
        message: "Invalid file type",
      }
    ),
  size: z
    .number()
    .max(5 * 1024 * 1024, { message: "File too large (max 5MB)" }),
  lastModified: z.number(),
});

export const PortfolioSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  isPrivate: z.boolean().optional(),
  isShow: z.boolean().optional(),
  completedAt: z.coerce.date().optional(),
  linkRepo: z.string().url().optional(),
  image: z.string().url().optional(),
  started: z.coerce.date(),
  ended: z.coerce.date(),
  deletedAt: z.date().optional(),
});

export const PortfolioInputSchema = PortfolioSchema.extend({
  image: z
    .instanceof(File)
    .refine(
      (file) => {
        if (file === undefined) return true;
        return (
          typeof file.name === "string" &&
          typeof file.size === "number" &&
          typeof file.type === "string"
        );
      },
      {
        message: "The image must be a valid file.",
      }
    )
    .optional(),
});

/**
 * Schema for portfolio input that is used in backend.
 * This schema is used because in edge runtime, File is undefined.
 */
export const PortfolioInputBackendSchema = PortfolioSchema.extend({
  /**
   * File validator for image.
   * This is used because in edge runtime, File is undefined.
   */
  imageValidator: FileSchema.optional(),
});

export const PortfolioResponseSchema = PortfolioSchema.extend({
  isPrivate: z.coerce.boolean().optional(),
  description: z.string().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export type PortfolioInputType = z.infer<typeof PortfolioInputSchema>;
export type PortfolioResponseType = z.infer<typeof PortfolioResponseSchema>;
