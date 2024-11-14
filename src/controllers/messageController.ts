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

        const totalCount = await Message.countDocuments().exec();

        const response = {
            data: messages,
            totalCount,
            page,
            limit,
        };

        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};