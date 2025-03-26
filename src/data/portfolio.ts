import { PortfolioSchema } from "@/lib/schema/portfolioSchema";
import { db } from "@/server/db";
import { Prisma } from "@prisma/client";
import { z } from "zod";

interface getAllPortfolioProps {
  page?: number;
  limit?: number;
  orderBy?: Prisma.Enumerable<Prisma.PortfolioOrderByWithRelationInput>;
  where?: Prisma.PortfolioWhereInput;
}

export const getAllPortfolio = async ({
  page = 1,
  limit = 10,
  orderBy,
  where,
}: getAllPortfolioProps) => {
  const offset = (page - 1) * limit;
  const data = await db.portfolio.findMany({
    where,
    skip: offset,
    take: limit,
    orderBy,
  });
  const total = await countTotalProjects({ where });
  return {
    data,
    paging: {
      page,
      limit,
      totalPage: total % limit === 0 ? total / limit : Math.ceil(total / limit),
    },
  };
};

export const getPortfolioById = async (id: string) => {
  return await db.portfolio.findUnique({
    where: {
      id,
      deletedAt: null,
      isShow: true,
    },
  });
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
  return await db.portfolio.update({
    where: {
      id,
    },
    data,
  });
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

export const countCompletedProjects = async () => {
  return await db.portfolio.count({
    where: {
      completedAt: {
        not: null,
      },
    },
  });
};

export const countOngoingProjects = async () => {
  return await db.portfolio.count({
    where: {
      completedAt: null,
    },
  });
};

interface countTotalProjectsProps {
  where?: Prisma.PortfolioWhereInput;
}
export const countTotalProjects = async ({
  where,
}: countTotalProjectsProps) => {
  return await db.portfolio.count({
    where,
  });
};
