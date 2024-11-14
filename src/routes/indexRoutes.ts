import express from "express";
import { login } from "../controllers/userController";
import chatRoute from './chatRoutes';

const router = express.Router();

router.post('/login', login);
router.use('/chats', chatRoute)

export default router;