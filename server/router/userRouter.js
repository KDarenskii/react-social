import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = new Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);
router.get("/users/:id", authMiddleware, UserController.fetchById);
router.get("/friends/:userId", authMiddleware, UserController.fetchFriends);

export default router;
