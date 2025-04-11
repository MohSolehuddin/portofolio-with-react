import { db } from "@/server/db";

export const getHistoryOfSendingMessageByIp = async (ip: string) => {
  return db.historyOfSendingMessage.findUnique({
    where: {
      ip,
    },
  });
};

export const createOrCounterLimiterHistoryOfSendingMessage = async (
  ip: string
) => {
  const currentDate = new Date();
  return db.historyOfSendingMessage.upsert({
    where: {
      ip,
    },
    create: {
      ip,
      count: 1,
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    update: {
      count: {
        increment: 1,
      },
      updatedAt: currentDate,
    },
  });
};
