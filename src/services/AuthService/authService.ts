import * as AUTH_CONSTANTS from "constants/login";

export async function authenticate(username: string, password: string) {
  let response;
  let data;

  try {
    response = await fetch(AUTH_CONSTANTS.PATHS.AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: username,
        password: password,
        grant_type: "password",
        scope: AUTH_CONSTANTS.SCOPE,
        client_id: AUTH_CONSTANTS.CLIENT_ID,
        client_secret: AUTH_CONSTANTS.CLIENT_SECRET,
      }),
    });
    if (!response.ok) {
      // response.ok is true for 2xx status codes
      const errorBody = await response.json(); // Or response.text() depending on content type
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText || "Unknown error"}`,
      );
    }
    data = await response.json();
    console.log("auth success");
    localStorage.setItem("accessToken", data.access_token); //TODO: CRUD on localStorage should not be done in service
    localStorage.setItem("refreshToken", data.refresh_token);
  } catch (error: unknown) {
    //pass
    console.error("auth error"); //TODO: dispatch an error, showing a invalid pop up or something like that
    throw error;
  }
}

export async function refreshToken(refresh_token: string) {
  let response;
  let data;
  try {
    response = await fetch(AUTH_CONSTANTS.PATHS.REFRESH_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        scope: AUTH_CONSTANTS.SCOPE,
        client_id: AUTH_CONSTANTS.CLIENT_ID,
        client_secret: AUTH_CONSTANTS.CLIENT_SECRET,
        refresh_token: refresh_token,
      }),
    });
    data = await response.json();
    console.log("refresh success");
  } catch {
    console.error("refresh error"); //TODO: dispatch an error, showing a invalid pop up or something like that
  }
  localStorage.setItem("accessToken", data.access_token); //TODO: CRUD on localStorage should not be done in service
  localStorage.setItem("refreshToken", data.refresh_token);
}

export async function logout(refresh_token: string) {
  try {
    const response = await fetch(AUTH_CONSTANTS.PATHS.LOGOUT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: AUTH_CONSTANTS.CLIENT_ID,
        client_secret: AUTH_CONSTANTS.CLIENT_SECRET,
        refresh_token: refresh_token,
      }),
    });
    console.log("logout success");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken"); //TODO: CRUD on localStorage should not be done in service
  } catch {
    console.error("logout error");
  }
}
