import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ICredentials, IRegistrationCredentials } from "../models/Credentials";
import { IAuthResponse } from "../models/response/AuthResponse";
import { api, authApi } from "../api";

export default class UserService {
    static register = async (
        credentials: IRegistrationCredentials,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<IAuthResponse>> => {
        return authApi.post<IAuthResponse>("/api/registration", credentials, config);
    };
    static login = async (
        credentials: ICredentials,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<IAuthResponse>> => {
        return authApi.post<IAuthResponse>("/api/login", credentials, config);
    };
    static logout = async (config?: AxiosRequestConfig): Promise<AxiosResponse<void>> => {
        return authApi.post<void>("/api/logout", undefined, config);
    };
    static refresh = async (config?: AxiosRequestConfig): Promise<AxiosResponse<IAuthResponse>> => {
        return api.get<IAuthResponse>("/api/refresh", { withCredentials: true, ...config });
    };
}
