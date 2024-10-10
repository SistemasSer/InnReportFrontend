import { AccessTokenResponse } from "../types/types";
//import { API_URL } from "./authConstants";



export default async function requestNewAccessToken(refreshToken: string) {
  const API_URL = process.env.REACT_APP_API_URL_1;

  // console.log("Requesting new access token with refresh token:", refreshToken);

  const response = await fetch(`${API_URL}/auth/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  // console.log("Response status:", response.status);

  const jsonResponse = await response.json();
  // console.log("Response JSON:", jsonResponse);

  if (response.ok) {
    if (jsonResponse.error) {
      // console.error("Error in response:", jsonResponse.error);
      throw new Error(jsonResponse.error);
    }
    // console.log("New access token received:", jsonResponse.access); // Asegúrate de acceder al campo correcto
    return jsonResponse.access; // Devuelve el campo correcto
  } else {
    console.error("Unable to refresh access token. Response:", jsonResponse);
    throw new Error("Unable to refresh access token.");
  }
}