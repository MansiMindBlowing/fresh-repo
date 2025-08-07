import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePasswords = async (plainPassword: string, hashedPassword: string) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
