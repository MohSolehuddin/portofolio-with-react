import { z } from "zod";

export const PortfolioSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  private: z.boolean().optional(),
  linkRepo: z.string().url().optional(),
  image: z.string().url().optional(),
  started: z.date(),
  ended: z.date(),
  deletedAt: z.date().optional(),
});
