import { Server, Socket } from "socket.io";
import { Message } from "../database/mongo/models/Message";

export class SocketManager {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.initializeEvents();
  }

  private initializeEvents() {
    this.io.on("connection", (socket: Socket) => {
      console.log("A user connected:", socket.id);

      socket.on("joinRoom", (chatId: string) => {
        console.log(`User ${socket.id} joined room: ${chatId}`);
        socket.join(chatId);
        socket.to(chatId).emit("userJoined", `User ${socket.id} has joined the room.`);
      });

      socket.on("sendMessage", async  (data) => {
        const { chatId, content, sender } = data;
        console.log(`Message from ${sender.id} (${socket.id}) in room ${chatId}: ${content}`);

        try {
          const message = new Message({
            senderId: sender.id,
            chatId,
            content
          });

          await message.save();

          const formatMessage = {
            id: message._id,
            chatId: message.chatId,
            content: message.content,
            timestamp: message.timestamp,
            sender: {
                id: sender.id,
                username: sender.username
            },
        };

          this.io.to(chatId).emit("receiveMessage", formatMessage);
        } catch (err) {
          console.error("Error saving message:", err);
        }
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });
  }
}
