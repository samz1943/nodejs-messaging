import { Request, Response } from 'express';
import { Message } from '../database/mongo/models/Message';

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

        const totalItems = await Message.find({ chatId: chatId }).countDocuments().exec();
        const totalPages = Math.ceil(totalItems / limit);

        const response = {
            data: messages,
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