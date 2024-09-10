import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL_2;

export const downloadDocument = async (DocId, nombreDoc) => {
  if (!DocId) {
    throw new Error("Document ID is required");
  }

  try {
    const response = await axios.get(`${apiUrl}/Documentodescargar/${DocId}/`, {
      responseType: "blob", // Asegúrate de que el backend devuelve un blob
    });

    // Crear un objeto URL para el blob recibido
    const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));

    // Crear un enlace para descargar el archivo
    const link = document.createElement("a");
    link.href = url;

    // Obtener el nombre del archivo desde los encabezados, si está disponible
    const contentDisposition = response.headers['content-disposition'];
    if (contentDisposition) {
      const matches = /filename="([^"]*)"/.exec(contentDisposition);
      if (matches != null && matches[1]) {
        link.setAttribute("download", matches[1]);
      } else {
        link.setAttribute("download", `Resumen-${nombreDoc}`);
      }
    } else {
      link.setAttribute("download", `Resumen-${nombreDoc}`);
    }

    // Añadir el enlace al DOM, hacer clic en él y eliminarlo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Liberar el objeto URL
    window.URL.revokeObjectURL(url);

  } catch (error) {
    const errorMessage = error.response?.data?.error || "Error al descargar el documento";
    console.error(errorMessage); // Puedes reemplazarlo con algún componente de UI para mostrar errores
    throw new Error(errorMessage);
  }
};