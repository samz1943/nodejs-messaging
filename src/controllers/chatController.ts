import { Request, Response } from 'express';
import { AppDataSource } from '../config/postgres';
import { PaginationService } from '../utils/pagination.service';
import { Chat } from '../database/postgres/models/Chat';
import { Like } from 'typeorm';

export const createPost = async (req: Request, res: Response): Promise<void> => {
   try {

   } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const getChats = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const chatRepository = AppDataSource.getRepository(Chat);

    const search = req.query.title ? `%${req.query.title}%` : undefined;

    const result = await PaginationService.paginate(chatRepository, {
      page,
      limit,
      where: search ? { title: Like(search) } : {},
      // orderBy: 'createdAt',
      orderDirection: 'DESC',
    });

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
