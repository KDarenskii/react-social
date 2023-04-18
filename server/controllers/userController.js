import ApiError from "../exceptions/ApiError.js";
import UserService from "../services/UserService.js";

class UserController {
    async registration(req, res, next) {
        try {
            const { firstName, lastName, email, password } = req.body;
            if (!firstName || !lastName || !email || !password) {
                throw ApiError.BadRequest("Credentials are required");
            }
            const userData = await UserService.registration(firstName, lastName, email, password);
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw ApiError.BadRequest("Credentials are required");
            }
            const userData = await UserService.login(email, password);
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            if (refreshToken) {
                await UserService.logout(refreshToken);
            }
            res.clearCookie("refreshToken");
            res.status(200).json("Logged out successfully");
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                throw ApiError.UnauthenticatedError();
            }
            const userData = await UserService.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    }

    async fetchById(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                throw ApiError.BadRequest("id is required");
            }
            const userData = await UserService.getUserById(id);
            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    }

    async fetchFriends(req, res, next) {
        try {
            const { userId } = req.params;
            if (!userId) {
                throw ApiError.BadRequest("userId is required");
            }
            const friends = await UserService.getFriends(userId);
            res.status(200).json(friends);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
