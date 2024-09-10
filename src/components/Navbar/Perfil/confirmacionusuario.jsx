import React from "react";
import { updateUser } from "./apiCambioNombreEmail";
import Swal from 'sweetalert2'
import { useAuth } from "../../../auth/AuthProvider";

const ConfirmacionUsuario = ({
  isOpen,
  onClose,
  onConfirm,
  nombreUsusario,
  correoUsuario,
  identificacionUsuario,
}) => {
  const { getUser, setUser } = useAuth();

  const handleConfirm = async () => {
    if (!identificacionUsuario) {
      console.error("User ID no esta definido.");
      return;
    }

    const currentUser = getUser();

    const updatedUserData = {};
    if (nombreUsusario !== currentUser?.username) {
      updatedUserData.username = nombreUsusario;
    }
    if (correoUsuario !== currentUser?.email) {
      updatedUserData.email = correoUsuario;
    }
    try {
      await updateUser(identificacionUsuario, updatedUserData);
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedUserData,
      }));
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        animation: true,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Datos Cambiados Correctamente!!!"
      });
      onConfirm();
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        animation: true,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Algo esta mal",
        text: error.message
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={onClose}
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
          <div className="flex flex-col">
            <span className="text-lg font-normal text-gray-700">
              Nombre:{" "}
              <span className="font-semibold text-gray-800">
                {nombreUsusario}
              </span>
            </span>
            <span className="text-lg font-normal text-gray-700">
              Correo Electrico:{" "}
              <span className="font-semibold text-gray-800">
                {correoUsuario}
              </span>
            </span>
          </div>
          <hr className="w-48 h-1 mx-auto my-2 bg-gray-300 border-0 rounded" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            ¿Estas seguro de Cambiar los{" "}
            <span className="font-bold text-gray-800">Datos del Usuario</span>?
          </h3>
          <button
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            onClick={handleConfirm}
          >
            Si, Estoy seguro
          </button>
          <button
            type="button"
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionUsuario;
