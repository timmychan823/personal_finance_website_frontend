import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { refreshToken } from "services/AuthService/authService";
import { isTokenExpired } from "helpers/authUtils";
import router from "router";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    console.log("AxiosInterceptor: Request interceptor started for URL:", config.url);
    let accessToken: string = localStorage.getItem("accessToken") ?? "";
    const refresh_token: string = localStorage.getItem("refreshToken") ?? "";
    console.log("AxiosInterceptor: Tokens from localStorage - accessToken exists:", !!accessToken, "refreshToken exists:", !!refresh_token);

    if (isTokenExpired(refresh_token)) {
      console.log("AxiosInterceptor: Refresh token is expired, navigating to login");
      router.navigate("/login");
    }

    if (isTokenExpired(accessToken) && !isTokenExpired(refresh_token)) {
      console.log("AxiosInterceptor: Access token expired, refreshing...");
      try {
        await refreshToken(refresh_token);
        console.log(`AxiosInterceptor: Token refreshed successfully`);
      } catch (refreshError) {
        console.log("AxiosInterceptor: Token refresh failed, navigating to login:", refreshError);
        router.navigate("/login");
        return Promise.reject(refreshError);
      }
    }
    accessToken = localStorage.getItem("accessToken") ?? "";
    console.log(`AxiosInterceptor: Using access token: ${accessToken ? 'present' : 'missing'}`);
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    console.log("AxiosInterceptor: Request interceptor completed, proceeding with request");
    return config;
  },
  (error: AxiosError) => {
    console.log("AxiosInterceptor: Request interceptor error:", error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("AxiosInterceptor: Response received for URL:", response.config.url, "status:", response.status);
    return response;
  },
  (error: AxiosError) => {
    console.log("AxiosInterceptor: Response error for URL:", error.config?.url, "status:", error.response?.status, "error:", error.message);
    return Promise.reject(error);
  },
);

export { axiosInstance };