import { db } from "@/server/db";

export async function getUserByEmail(email: string) {
  return db.user.findUnique({ where: { email } });
}
export async function getUserById(id: string) {
  return db.user.findUnique({ where: { id } });
}
export const makeEmailIsVerified = async (email: string) => {
  return db.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });
};

export const updateUser = async (id: string, { ...data }) => {
  return db.user.update({
    where: { id },
    data,
  });
};
