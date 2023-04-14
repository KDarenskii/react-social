import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const authApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

authApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer: ${localStorage.getItem("token")}`;
    return config;
});
