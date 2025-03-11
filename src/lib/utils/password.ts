import bcrypt from "bcrypt-edge";
export const hashPassword = async (password: string) => {
  return bcrypt.hashSync(password, 10);
};
export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compareSync(password, hashedPassword);
};
