import { jwtDecode, JwtPayload } from "jwt-decode";

export function isTokenExpired(token: string): boolean {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    // The 'exp' claim is in seconds since the Unix epoch
    const currentTime = Date.now() / 1000;
    return (
      decodedToken.exp === undefined || null || decodedToken.exp < currentTime
    ); //no exp or expired then return true
  } catch (error) {
    // Handle invalid token or decoding errors
    console.error("Error decoding token:", error);
    return true; // Consider invalid tokens as expired
  }
}
