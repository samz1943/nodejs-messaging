import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";
import { AppDataSource } from "./config/postgres";
import { connectMongo } from "./config/mongo";
import { runSeeders } from "typeorm-extension";
import router from "./routes/indexRoutes";

dotenv.config();

const port = process.env.APP_PORT || 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());

AppDataSource.initialize().then(async () => {
  // await AppDataSource.synchronize(true);
  // await runSeeders(AppDataSource);
  // process.exit();
}).catch(error => console.log(error));
connectMongo();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    console.log(`User ${socket.id} joined room: ${roomId}`);
    socket.join(roomId);

    socket.to(roomId).emit('userJoined', `User ${socket.id} has joined the room.`);
  });

  socket.on('sendMessage', (data) => {
    console.log('Received chatId:', data.chatId);
    console.log('Received message:', data.content);

    io.emit('receiveMessage-' + data.chatId, data.content);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

app.use(express.json());

app.use('/api', router);

server.listen(port, () => console.log(`Server running on port ${port}`));
