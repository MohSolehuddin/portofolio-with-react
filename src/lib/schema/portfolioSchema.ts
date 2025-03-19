import { z } from "zod";

export const PortfolioSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  isPrivate: z.boolean().optional(),
  linkRepo: z.string().url().optional(),
  image: z.string().url().optional(),
  started: z.coerce.date(),
  ended: z.coerce.date(),
  deletedAt: z.date().optional(),
});

export const PortfolioInputSchema = PortfolioSchema.extend({
  description: z.string().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export type PortfolioInputType = z.infer<typeof PortfolioSchema>;
