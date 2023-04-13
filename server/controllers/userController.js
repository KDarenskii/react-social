import TokenService from "../services/TokenService.js";
import UserService from "../services/UserService.js";

class UserController {
    async registration(req, res) {
        const { firstName, lastName, email, password } = req.body;
        try {
            const userData = await UserService.registration(firstName, lastName, email, password);
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).json(userData);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.login(email, password);
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.cookies;
            await UserService.logout(refreshToken);
            res.clearCookie("refreshToken");
            res.status(200).json("Logged out successfully");
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }

    async refresh(req, res) {
        const { refreshToken } = req.cookies;
        try {
            const userData = await UserService.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).json(userData);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }
}

export default new UserController();
