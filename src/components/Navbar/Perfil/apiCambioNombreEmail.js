import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL_1;

export const updateUser = async (userId, userData) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const response = await axios.patch(`${apiUrl}/users/${userId}/`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || "Error al actualizar el usuario";
    throw new Error(errorMessage);
  }
};
