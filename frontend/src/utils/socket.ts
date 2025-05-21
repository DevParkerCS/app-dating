import io from "socket.io-client";
export const socket = io("http://10.20.8.13:3000");

let curRoom: number | null = null;

export const joinRoom = (roomId: number) => {
  if (curRoom) {
    socket.emit("leave_room", curRoom);
  }

  socket.emit("join_room", roomId);
  curRoom = roomId;
};

export const sendMessage = (text: string) => {
  socket.emit("send_message", { text, roomId: curRoom });
};
