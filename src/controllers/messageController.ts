import { Request, Response } from 'express';
import { AppDataSource } from '../config/postgres';
import { Message } from '../database/mongo/models/Message';
import { User } from '../database/postgres/models/User';

export const getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const { chatId } = req.params;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const messages = await Message.find({ chatId: chatId })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec();

        const enrichedMessages = await Promise.all(
            messages.map(async (msg) => {
                const user = await AppDataSource.getRepository(User).findOneBy({ id: msg.senderId });
                return {
                    id: msg._id,
                    chatId: msg.chatId,
                    content: msg.content,
                    timestamp: msg.timestamp,
                    sender: {
                        id: user!.id,
                        username: user!.username
                    },
                };
            })
        );

        const totalItems = await Message.find({ chatId: chatId }).countDocuments().exec();
        const totalPages = Math.ceil(totalItems / limit);

        const response = {
            data: enrichedMessages,
            totalItems,
            totalPages,
            currentPage: page,
            itemsPerPage: limit,
        };

        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};