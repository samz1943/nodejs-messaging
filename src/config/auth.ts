import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (userId: string): string => {
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ userId }, secret, { expiresIn: '12h' });
    return token;
  };