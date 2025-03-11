import { db } from "@/server/db";

export const getAllowedEmail = async (email: string) => {
  return db.allowedEmail.findUnique({
    where: {
      email,
    },
  });
};

export const createAllowedEmail = async (email: string) => {
  return db.allowedEmail.create({
    data: {
      email,
    },
  });
};

export const deleteAllowedEmail = async (email: string) => {
  return db.allowedEmail.delete({
    where: {
      email,
    },
  });
};

export const updateAllowedEmail = async ({
  lashEmail,
  newEmail,
}: {
  lashEmail: string;
  newEmail: string;
}) => {
  return db.allowedEmail.update({
    where: {
      email: lashEmail,
    },
    data: {
      email: newEmail,
    },
  });
};
