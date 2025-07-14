import { FC, useLayoutEffect, useRef } from "react";
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { authenticate, refreshToken } from "services/AuthService/authService";
import { isTokenExpired } from "helpers/authUtils";
import router from "router";

const axiosInstance = axios.create();

//TODO: intercept on request and add Authorization header to it, if not exist or expire then go to login page, for response, if backend said token expired, then go to login page
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken: string = localStorage.getItem("accessToken") ?? "";
    const refresh_token: string = localStorage.getItem("refreshToken") ?? "";

    if (isTokenExpired(refresh_token)) {
      router.navigate("/login");
      //TODO: cancel request
    }

    if (isTokenExpired(accessToken) && !isTokenExpired(refresh_token)) {
      await refreshToken(refresh_token);
      //TODO: continue with the new accessToken
    }
    accessToken = localStorage.getItem("accessToken") ?? "";
    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
