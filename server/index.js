import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/index.js";
import { PORT, CLIENT_URL } from "./config.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: CLIENT_URL,
    })
);
app.use("/api", router);

const startApp = async () => {
    try {
        app.listen(PORT, () => console.log("SERVER STARTED ON PORT: " + PORT));
    } catch (error) {
        console.log(error);
    }
};

startApp();
