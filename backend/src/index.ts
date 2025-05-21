import express, { Request, Response } from "express";
import http from "http";
import { Socket, Server as SocketIOServer } from "socket.io";
import { syncModels } from "./sync";
import cors from "cors";
import userRoutes from "./routes/user";
import "./Models/Associations";

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // allow all origins for testing
  },
});
syncModels();

type DataReceived = {
  text: string;
  roomId: string;
};

app.use("/users", userRoutes);

io.on("connection", (socket: Socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join_room", (roomId: string) => {
    console.log("Joining Room", roomId);
    socket.join(roomId);
  });

  socket.on("leave_room", (roomId: string) => {
    socket.leave(roomId);
  });

  socket.on("send_message", (data: DataReceived) => {
    console.log("Sent Message", data.text, data.roomId);
    socket.to(data.roomId).emit("receive_message", data.text);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
