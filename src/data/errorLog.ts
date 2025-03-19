import { db } from "@/server/db";

export const createErrorLog = async (error: string) => {
  try {
    return await db.errorLog.create({
      data: {
        message: error,
      },
    });
  } catch (err) {
    const errorLogInString = JSON.stringify(err);
    await createErrorLog(errorLogInString);
  }
};

export const createWarningLog = async (error: string) => {
  try {
    return await db.errorLog.create({
      data: {
        type: "WARNING",
        message: error,
      },
    });
  } catch (err) {
    const errorLogInString = JSON.stringify(err);
    await createErrorLog(errorLogInString);
  }
};

export const getAllErrorLog = async () => {
  return db.errorLog.findMany();
};

export const deleteErrorLog = async (id: string) => {
  return db.errorLog.delete({
    where: {
      id,
    },
  });
};

export const getErrorLogById = async (id: string) => {
  return db.errorLog.findUnique({
    where: {
      id,
    },
  });
};
