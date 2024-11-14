import express from "express";
import { getChats } from "../controllers/chatController";
import { getMessages } from "../controllers/messageController";

const router = express.Router();

router.get("/", getChats);
router.get("/:chatId/messages", getMessages);

export default router;
