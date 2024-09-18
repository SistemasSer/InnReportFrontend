import React from "react";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { saveAs } from 'file-saver';

const BotonArchivo = () => {
  const handleDownload = () => {
    const url = '/archivos/Formato_Ahorro_Credito.xlsx'; 
    console.log(`Intentando descargar desde: ${url}`);

    fetch(url, {
      method: 'GET', 
    })
      .then(response => {
        console.log(`Respuesta de GET: ${response.status} ${response.statusText}`);
        if (response.ok) {
          return response.blob(); 
        } else {
          throw new Error('El archivo no está disponible.');
        }
      })
      .then(blob => {
        saveAs(blob, 'Formato_Ahorro_Credito.xlsx'); 
      })
      .catch(error => {
        console.error('Error al intentar descargar el archivo:', error);
        alert('Error al intentar descargar el archivo.');
      });
  };

  return (
    <button
      type="button"
      className="p-2 w-10 h-10 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-300 flex justify-center items-center"
      onClick={handleDownload}
    >
      <DocumentArrowDownIcon className="h-6 w-6 text-gray-900 hover:text-blue-600" />
    </button>
  );
};

export default BotonArchivo;
