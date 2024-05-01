import { Server } from "socket.io";
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

export const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.CLIENT_URL as string],
        credentials: true,
    })
);

export const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL as string],
        credentials: true,
    },
});

const userSocketMap: { [key: string]: string } = {};

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`);

    const userId = socket.handshake.query.userId as string;
    if (userId !== "undefined") userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export const getReceiverSocketId = (receiverId: string) => {
    return userSocketMap[receiverId];
};
