import TokenService from "../services/TokenService";

export const authMiddleware = function (req, _, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error("Пользователь не авторизован");
    }

    const accessToken = authHeader.split(" ")[0];
    if (!accessToken) {
        throw new Error("Пользователь не авторизован");
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
        throw new Error("Пользователь не авторизован");
    }

    req.user = userData;
    next();
};
