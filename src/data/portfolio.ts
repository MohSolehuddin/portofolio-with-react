import { PortfolioSchema } from "@/lib/schema/portfolioSchema";
import { db } from "@/server/db";
import { z } from "zod";

export const getAllPortfolio = async () => {
  return await db.portfolio.findMany();
};

export const getPortfolioById = async (id: string) => {
  return await db.portfolio.findUnique({ where: { id } });
};

export const createPortfolio = async (
  data: z.infer<typeof PortfolioSchema>
) => {
  return await db.portfolio.create({ data });
};

export const updatePortfolio = async (
  id: string,
  data: z.infer<typeof PortfolioSchema>
) => {
  return await db.portfolio.update({ where: { id }, data });
};

export const deletePortfolio = async (id: string) => {
  return await db.portfolio.delete({ where: { id } });
};

export const softDeletePortfolio = async (id: string) => {
  return await db.portfolio.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};
