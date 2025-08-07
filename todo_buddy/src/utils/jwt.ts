import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { User } from 'models/user';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ;

export const generateToken = (user: User) => {
  return jwt.sign({id: user.id, email: user.email, role: user.role,}, JWT_SECRET, { expiresIn: '7d' });
};
