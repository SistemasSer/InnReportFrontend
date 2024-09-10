import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL_1;

export const updatePassword = async (userId, PasswordData) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const response = await axios.patch(`${apiUrl}/change-password/${userId}/`, PasswordData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || "Error al actualizar la contraseña";
    throw new Error(errorMessage);
  }
};
