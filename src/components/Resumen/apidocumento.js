const apiUrlv1 = process.env.REACT_APP_API_URL_2;

export const fetchDocumentos = async () => {
  try {
    const response = await fetch(`${apiUrlv1}/Documento`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || "Error al traer los datos de los Documentos";
    throw new Error(errorMessage);
  }
};