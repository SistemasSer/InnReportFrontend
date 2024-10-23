import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL_2;

export const downloadDocument = async (DocId, nombreDoc) => {
  if (!DocId) {
    throw new Error("Id de Documento es necesario");
  }
  if (!nombreDoc) {
    throw new Error("Nombre de Documento es necesario");
  }

  try {
    console.log(`Iniciando descarga para el documento ID: ${DocId} con nombre: ${nombreDoc}`);
    
    const response = await axios.get(`${apiUrl}/Documentodescargar/${DocId}/`, {
      responseType: "blob",
    });

    // Obtener el tipo MIME desde los encabezados de la respuesta
    const mimeType = response.headers['content-type'] || 'application/application/vnd.openxmlformats-officedocument.wordprocessingml.document-stream';
    console.log(`Tipo MIME obtenido: ${mimeType}`);

    // Crear el Blob utilizando el tipo MIME correcto
    const blob = new Blob([response.data], { type: mimeType });
    console.log(`Blob creado con tamaño: ${blob.size} bytes`);

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    const contentDisposition = response.headers['content-disposition'];
    if (contentDisposition) {
      const matches = /filename="([^"]*)"/.exec(contentDisposition);
      if (matches != null && matches[1]) {
        link.setAttribute("download", matches[1]);
        console.log(`Nombre de archivo extraído del content-disposition: ${matches[1]}`);
      } else {
        link.setAttribute("download", `Resumen-${nombreDoc}`);
        console.log(`Nombre de archivo por defecto utilizado: Resumen-${nombreDoc}`);
      }
    } else {
      link.setAttribute("download", `Resumen-${nombreDoc}`);
      console.log(`Nombre de archivo por defecto utilizado: Resumen-${nombreDoc}`);
    }

    document.body.appendChild(link);
    link.click();
    console.log("Descarga iniciada.");

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url); // Liberar el objeto URL
    console.log("Objeto URL liberado.");
    
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Error al descargar el documento";
    console.error(`Error durante la descarga: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};