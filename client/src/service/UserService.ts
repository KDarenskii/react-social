import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ICredentials, IRegistrationCredentials } from "../models/Credentials";
import { IAuthResponse } from "../models/response/AuthResponse";
import { api, authApi } from "../api";
import { IUser } from "../models/User";

export default class UserService {
    static register = async (
        credentials: IRegistrationCredentials,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<IAuthResponse>> => {
        return authApi.post<IAuthResponse>("/registration", credentials, config);
    };
    static login = async (
        credentials: ICredentials,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<IAuthResponse>> => {
        return authApi.post<IAuthResponse>("/login", credentials, config);
    };
    static logout = async (config?: AxiosRequestConfig): Promise<AxiosResponse<void>> => {
        return authApi.post<void>("/logout", undefined, config);
    };
    static refresh = async (config?: AxiosRequestConfig): Promise<AxiosResponse<IAuthResponse>> => {
        return api.get<IAuthResponse>("/refresh", { withCredentials: true, ...config });
    };
    static getById = async (userId: string, config?: AxiosRequestConfig): Promise<AxiosResponse<IUser>> => {
        return authApi.get<IUser>(`/users/${userId}`, config);
    };
    static getFriends = async (userId: string, config?: AxiosRequestConfig): Promise<AxiosResponse<IUser[]>> => {
        return authApi.get<IUser[]>(`/friends/${userId}`, config);
    };
}
