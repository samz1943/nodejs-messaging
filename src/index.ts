import express from "express";
import dotenv from 'dotenv';
import { createServer } from "http";
import { Server } from "socket.io";
import { AppDataSource } from "./config/postgres";
import { connectMongo } from "./config/mongo";
import { runSeeders } from "typeorm-extension";
import router from "./routes/indexRoutes";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = process.env.APP_PORT || 3000;

AppDataSource.initialize().then(async () => {
    // await AppDataSource.synchronize(true);
    // await runSeeders(AppDataSource);
    // process.exit();
}).catch(error => console.log(error));
connectMongo();

// io.on("connection", (socket) => {
//     socket.on("joinRoom", (chatId) => {
//         socket.join(chatId);
//     });

//     socket.on("sendMessage", async ({ chatId, senderId, content }) => {
//         const message = await chatService.sendMessage(chatId, senderId, content);
//         io.to(chatId).emit("receiveMessage", message);
//     });
// });

app.use(express.json());

app.use('/api', router);

server.listen(port, () => console.log(`Server running on port ${port}`));
