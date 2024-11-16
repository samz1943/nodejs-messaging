import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";
import { AppDataSource } from "./config/postgres";
import { connectMongo } from "./config/mongo";
import { runSeeders } from "typeorm-extension";
import router from "./routes/indexRoutes";
import { SocketManager } from "./manager/SocketManager";

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

new SocketManager(io);

app.use(express.json());

app.use('/api', router);

server.listen(port, () => console.log(`Server running on port ${port}`));
