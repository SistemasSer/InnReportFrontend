import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { deleteDocument } from "./apiEliminarDocumento";

const DeleteDoc = ({ isOpen, closeModal, item, onSuccess }) => {
  const [nombreDocumento, setNombreDocumento] = useState("");

  console.log(item);

  useEffect(() => {
    if (isOpen && item) {
      setNombreDocumento(item.nombre || "");
    }
  }, [isOpen, item]);

  const handleClickOutside = (e) => {
    if (e.target.id === "popup-modal") {
      closeModal();
    }
  };

  const handleDelete = async () => {
    if (!item) return;

    try {
      await deleteDocument(item.id);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1900,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Documento eliminado con éxito."
      });
      if (onSuccess) {
        onSuccess();
      }
      closeModal();
    } catch (error) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 1900,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: (error.message || "Error al eliminar el documento.")
          });
    //   console.log(error.message || "Error al eliminar el documento.");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed top-0 right-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-10 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div className="relative p-4 w-full max-w-md max-h-full bg-white dark:bg-gray-700 rounded-lg shadow">
        <button
          type="button"
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
        <div className="p-4 md:p-5 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-1 text-lg font-normal text-gray-500 dark:text-gray-400 flex flex-col">
            `<span>¿Estas seguro de querer borrar?</span>{" "}
            <span className="capitalize font-bold">{nombreDocumento}</span>`
          </h3>
          <button
            onClick={handleDelete}
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            Si, Estoy Seguro
          </button>
          <button
            onClick={closeModal}
            type="button"
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDoc;
