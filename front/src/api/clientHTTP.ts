import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/authStore";

enum ContentType {
    JSON = "application/json",
    FORM_DATA = "multipart/form-data",
}

const store = useAuthStore();

const transactionsApi = (
    baseURL: string = "https://f2b0-181-49-241-226.ngrok-free.app/api",
    contentType: ContentType = ContentType.JSON,
    applyInterceptor: boolean = true
): AxiosInstance => {
    const http = axios.create({
        baseURL,
        headers: {
            "Content-Type": contentType,
        },
    });

    const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
        if (applyInterceptor) {
            const token = store.userToken;
            if (token) {
                config.headers!["Authorization"] = "Bearer " + token;
            }
        }
        return config;
    };

    http.interceptors.request.use(
        requestInterceptor,
    );

    return http;
};

export const HTTP = transactionsApi(undefined, undefined, false);
export const HTTPToken = transactionsApi();
export const HTTPForm = transactionsApi(undefined, ContentType.FORM_DATA);
