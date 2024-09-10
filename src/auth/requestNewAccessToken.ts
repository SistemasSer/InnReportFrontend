import { AccessTokenResponse } from "../types/types";
//import { API_URL } from "./authConstants";



export default async function requestNewAccessToken(refreshToken: string) {
  const API_URL = process.env.REACT_APP_API_URL_1;
  const response = await fetch(`${API_URL}/auth/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh:refreshToken }),
  });

  const jsonResponse = await response.json();

  if (response.ok) {
    if (jsonResponse.error) {
      throw new Error(jsonResponse.error);
    }
    return jsonResponse.accessToken; // Adjust this line based on the actual structure
  } else {
    throw new Error("Unable to refresh access token.");
  }
}
