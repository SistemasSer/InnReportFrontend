import React, { useState, useEffect } from "react";
import {
  XMarkIcon,
  DocumentIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const Informemodal = ({ isOpen, closeModal, onSuccess }) => {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [archivo, setArchivo] = useState(null);
  const apiUrlv1 = process.env.REACT_APP_API_URL_2;

  useEffect(() => {
    if (isOpen) {
      setNombre("");
      setFecha("");
      setArchivo(null);
    }
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("fecha", fecha);
    formData.append("archivo", archivo);

    try {
      const response = await fetch(`${apiUrlv1}/subirDocumento`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          animate: true,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          text: result.message || "Documento subido exitosamente.",
        });

        if (onSuccess) {
          onSuccess();
        }

        closeModal();
      } else {
        const error = await response.json();

        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          animate: true,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          text: "Error al subir el documento: " + error.detail,
        });
      }
    } catch (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        animate: true,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        text: "Error en la solicitud: " + error.message,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-black bg-opacity-40 z-20 flex justify-center items-center transition duration-500">
      <div className="bg-gray-200 px-10 pt-10 pb-0 rounded-[20px] shadow-[3xp_3x_5xp_3xp_rgb(37,37,37)] w-[620px] h-[520px] overflow-y-auto">
        <div className="flex flex-row place-content-between">
          <h3 className="text-3xl font-bold dark:text-white">
            Subir el Informe
          </h3>
          <button
            className="hover:bg-gray-300 w-8 h-8 flex justify-center items-center rounded-lg relative bottom-7 left-7 ease-in duration-200 text-gray-700 hover:text-red-700"
            onClick={closeModal}
          >
            <XMarkIcon className="h-6 w-6 " />
          </button>
        </div>
        <hr className="h-px my-8 bg-gray-950 border-0 dark:bg-gray-700" />
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col">
          <div>
            <label
              htmlFor="nameDocument"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombre del Informe
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <DocumentIcon className="h-6 w-6 text-gray-500" />
              </div>
              <input
                type="text"
                id="nameDocument"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Informe"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="dateDocument"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fecha del Informe
            </label>
            <div className="relative mb-6">
              <input
                type="date"
                id="dateDocument"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="fileDocument"
                className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ArrowDownIcon className="h-6 w-6 my-3 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click para subir </span>
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
          </div>
          <div className="w-full flex place-self-end place-content-end">
            <button
              type="submit"
              className="h-10 w-35 px-4 mt-4 text-white font-bold rounded-lg border-2 border-blue-800 bg-blue-950 hover:bg-white hover:text-blue-950 ease-in duration-300"
            >
              Subir Informe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Informemodal;
