import argon2 from "argon2";
export const hashPassword = async (password: string) => {
  return await argon2.hash(password);
};
export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return await argon2.verify(hashedPassword, password);
};
