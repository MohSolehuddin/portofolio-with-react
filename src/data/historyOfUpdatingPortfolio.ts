import { db } from "@/server/db";

export const upsertHistoryOfUpdatingPortfolio = async () => {
  await db.historyOfUpdatingPortfolio.upsert({
    where: { id: "1" },
    update: {
      lastUpdate: new Date(),
    },
    create: {
      id: "1",
      lastUpdate: new Date(),
    },
  });
};

export const getLastUpdate = async () => {
  return await db.historyOfUpdatingPortfolio.findMany({
    orderBy: {
      lastUpdate: "desc",
    },
    take: 1,
  });
};
