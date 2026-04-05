// import axios from "providers/axiosInstance";
import { io } from "socket.io-client";
import { refreshToken } from "services/AuthService/authService";
import { isTokenExpired } from "helpers/authUtils";
import router from "router";

export async function sendTextMessage(socket: io, textMessage: string) {
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

  socket.emit("textMessage", { token: accessToken, textMessage: textMessage });

}
