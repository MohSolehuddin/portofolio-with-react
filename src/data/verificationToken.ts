import { db } from "@/server/db";

export const createVerificationToken = async (
  email: string,
  token: string,
  expires: Date
) => {
  return db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return db.verificationToken.findFirst({
      where: {
        email,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return db.verificationToken.findFirst({
      where: {
        token,
        deletedAt: null,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getAllVerificationToken = async () => {
  try {
    return db.verificationToken.findMany({
      take: 5,
      orderBy: {
        expires: "desc",
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteVerificationTokenByID = async (id: string) => {
  try {
    return db.verificationToken.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteExistingVerificationTokenByEmail = async (email: string) => {
  try {
    return db.verificationToken.deleteMany({
      where: {
        email,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const softDeleteExistingVerificationTokenByEmail = async (
  email: string
) => {
  try {
    return db.verificationToken.updateMany({
      where: {
        email,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  } catch (error) {
    throw error;
  }
};
