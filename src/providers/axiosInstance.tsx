import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { refreshToken } from "services/AuthService/authService";
import { isTokenExpired } from "helpers/authUtils";
import router from "router";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    let accessToken: string = localStorage.getItem("accessToken") ?? "";
    const refresh_token: string = localStorage.getItem("refreshToken") ?? "";

    if (isTokenExpired(refresh_token)) {
      router.navigate("/login");
    }

    if (isTokenExpired(accessToken) && !isTokenExpired(refresh_token)) {
      await refreshToken(refresh_token);
      console.log(`Token refreshed: ${accessToken}`);
    }
    accessToken = localStorage.getItem("accessToken") ?? "";
    console.log(`Using access token: ${accessToken}`);
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export { axiosInstance };