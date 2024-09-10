import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { updateDocument } from "./apiEditarDocumento"; // Asegúrate de que esta función esté bien implementada

const EditarDocumento = ({ isOpen, closeModal, item }) => {
  // const [nombreDocumento, setNombreDocumento] = useState("");
  // const [fechaDocumento, setFechaDocumento] = useState("");
  // const [file, setFile] = useState(null);

  // // Efecto para inicializar o resetear el estado del formulario cuando `item` cambia
  // useEffect(() => {
  //   if (isOpen && item) {
  //     setNombreDocumento(item.nombre || "");
  //     setFechaDocumento(item.fecha || "");
  //     // Comentar esta línea para evitar limpiar el archivo al abrir el modal
  //     // setFile(null);
  //   }
  // }, [isOpen, item]);

  // // Función para limpiar el estado del formulario
  // const resetForm = () => {
  //   setNombreDocumento("");
  //   setFechaDocumento("");
  //   // Comentar esta línea para evitar limpiar el archivo al resetear el formulario
  //   // setFile(null);
  // };

  // // Función para cerrar el modal y limpiar el formulario
  // const handleCloseModal = () => {
  //   resetForm(); // Si quieres resetear el formulario al cerrar el modal
  //   closeModal();
  // };

  // // Función para manejar el cambio en el campo de nombre
  // const handleNombreChange = (e) => {
  //   setNombreDocumento(e.target.value);
  // };

  // // Función para manejar el cambio en el campo de fecha
  // const handleFechaChange = (e) => {
  //   setFechaDocumento(e.target.value);
  // };

  // // Función para manejar el cambio del archivo
  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files ? event.target.files[0] : null;
  //   console.log('Archivo seleccionado:', selectedFile);
  //   if (selectedFile) {
  //     setFile(selectedFile);
  //     // Verifica el estado inmediatamente después de actualizarlo
  //     setTimeout(() => console.log('Estado del archivo después de setFile:', file), 0);
  //   }
  // };

  // // Función para manejar el envío del formulario
  // const handleSubmit = async () => {
  //   console.log("handleSubmit - Estado actual del archivo:", file);
  //   console.log("handleSubmit - Nombre Documento:", nombreDocumento);
  //   console.log("handleSubmit - Fecha Documento:", fechaDocumento);

  //   if (!file) {
  //     Swal.fire("Error", "Por favor, selecciona un archivo", "error");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("nombre", nombreDocumento);
  //   formData.append("fecha", fechaDocumento);
  //   formData.append("archivo", file);

  //   try {
  //     await updateDocument(item.id, formData);
  //     Swal.fire("Éxito", "Documento actualizado con éxito", "success");
  //     handleCloseModal(); // Cerrar el modal y limpiar el formulario
  //   } catch (error) {
  //     console.log("handleSubmit - Error al actualizar el documento:", error);
  //     Swal.fire("Error", "Hubo un problema al actualizar el documento", "error");
  //   }
  // };

  const [nombreDoc, setNombreDoc] = useState(item ? item.nombre || "" : "");
  const [fechaDoc, setFechaDoc] = useState(item ? item.fecha || "" : "");
  const [archivo, setArchivo] = useState(item ? item.archivo || null : null);

  useEffect(() => {
    if (isOpen) {
      // Limpia los campos si el modal está abierto
      setNombreDoc("");
      setFechaDoc("");
      setArchivo(null);
    }
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(nombreDoc);
    console.log(fechaDoc);
    console.log(archivo);
    

    const formData = new FormData();
    formData.append("nombre", nombreDoc);
    formData.append("fecha", fechaDoc);
    formData.append("archivo", archivo);

    try {
      await updateDocument(item.id, formData);
      Swal.fire("Éxito", "Documento actualizado con éxito", "success");
    } catch (error) {
      console.log("handleSubmit - Error al actualizar el documento:", error);
      Swal.fire(
        "Error",
        "Hubo un problema al actualizar el documento",
        "error"
      );
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className="fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-black bg-opacity-10 z-20 flex justify-center items-center transition duration-500"
    >
      <div className="relative p-4 w-full max-w-md max-h-full m-auto bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Editar Datos sobre el Documento
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeModal}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="Ndocumento"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nombre de documento
              </label>
              <input
                type="text"
                name="nombreDoc"
                id="nombreDoc"
                className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-300"
                value={nombreDoc}
                onChange={(e) => setNombreDoc(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="fechadoc"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fecha
              </label>
              <input
                type="date"
                name="fechadoc"
                id="fechadoc"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={fechaDoc}
                onChange={(e) => setFechaDoc(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
            <hr className="w-48 h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-10 dark:bg-gray-700" />
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="fileDocument"
                className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ArrowDownIcon className="h-6 w-6 my-3 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      Click para Actualizar{" "}
                    </span>
                    el archivo
                  </p>
                </div>
                <input
                  id="fileDocument"
                  type="file"
                  className="hidden"
                  onChange={(e) => setArchivo(e.target.files[0])}
                />
              </label>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar Documento
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarDocumento;
