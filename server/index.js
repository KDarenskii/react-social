import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { PORT, CLIENT_URL } from "./config.js";
import userRouter from "./router/userRouter.js";
import messageRouter from "./router/messageRouter.js";
import conversationRouter from "./router/conversationRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: CLIENT_URL,
    })
);
app.use("/api", userRouter);
app.use("/api", messageRouter);
app.use("/api", conversationRouter);
app.use(errorMiddleware);

const startApp = async () => {
    try {
        app.listen(PORT, () => console.log("SERVER STARTED ON PORT: " + PORT));
    } catch (error) {
        console.log(error);
    }
};

startApp();

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = [];

const addUser = ({ userId, socketId }) => {
    const user = users.find((user) => user.id === userId);
    if (!user) {
        users.push({ id: userId, socketId });
    }
};

const getUser = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user;
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
    io.emit("getOnlineUsers", users);
    
    socket.on("addUser", (userId) => {
        console.log("After connection: ");
        addUser({ userId, socketId: socket.id });
        console.log(users);
        io.emit("getOnlineUsers", users);
    });

    socket.on("sendMessage", (message) => {
        const receiver = getUser(message.receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit("getMessage", message);
        }
    });

    socket.on("disconnect", () => {
        removeUser(socket.id);
        console.log("After disconnection: ");
        console.log(users);
        io.emit("getOnlineUsers", users);
    });
});

httpServer.listen(9000);
