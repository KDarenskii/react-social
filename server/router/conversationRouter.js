import { Router } from "express";
import ConversationController from "../controllers/ConversationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = new Router();

router.get("/conversations/:userId", authMiddleware, ConversationController.fetchByUserId);

export default router;
