import { Schema, model, Types } from "mongoose";

const messageSchema = new Schema({
    chatId: { type: String, required: true },
    senderId: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const Message = model("Message", messageSchema);