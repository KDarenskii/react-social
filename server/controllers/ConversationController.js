import ApiError from "../exceptions/ApiError.js";
import ConversationService from "../services/ConversationService.js";

class ConversationController {
    async fetchByUserId(req, res, next) {
        try {
            const { userId } = req.params;
            if (!userId) {
                throw ApiError.BadRequest("userId is required");
            }
            const conversationsData = await ConversationService.getByUserId(userId);
            res.status(200).json(conversationsData);
        } catch (error) {
            next(error);
        }
    }
}

export default new ConversationController();
