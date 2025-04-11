import {
  createOrCounterLimiterHistoryOfSendingMessage,
  resetLimiterHistory,
} from "@/data/historyOfSendingMessage";
import { getIp } from "./getIp";

export const isLimit = async (
  limit: number,
  durationInSeconds = 30
): Promise<boolean> => {
  const ip = await getIp();
  if (!ip) return false;

  const history = await createOrCounterLimiterHistoryOfSendingMessage(ip);
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - history.createdAt.getTime();
  const isWithinDuration = timeDiff < durationInSeconds * 1000;

  if (isWithinDuration) {
    if (history.count >= limit) return true;
  } else {
    await resetLimiterHistory(ip);
  }

  return false;
};
