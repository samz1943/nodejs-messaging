import { Request, Response } from 'express';
import { AppDataSource } from '../config/postgres';
import { User } from '../database/postgres/models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../config/auth';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ username: username });
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Incorrect password' });
      return;
    }

    const userId = user.id;
    const token = generateToken(userId);

    res.json({
      username: user.username,
      token: token
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};