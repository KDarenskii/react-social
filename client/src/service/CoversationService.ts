import { AxiosRequestConfig, AxiosResponse } from "axios";
import { authApi } from "../api";
import { IConversation } from "../models/Conversation";

export default class ConversationService {
    static getByUserId = async (userId: string, config?: AxiosRequestConfig): Promise<AxiosResponse<IConversation[]>> => {
        return authApi.get<IConversation[]>(`/conversations/${userId}`, config);
    };
}
