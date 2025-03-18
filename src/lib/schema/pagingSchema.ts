import { z } from "zod";

export const PagingSchema = z.object({
  page: z.coerce.number().min(1),
  limit: z.coerce.number().min(1),
});

export type PagingInterface = z.infer<typeof PagingSchema>;
