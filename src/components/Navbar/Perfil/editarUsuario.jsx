import React, { useState } from "react";
import ConfirmacionUsuario from "./confirmacionusuario";

const EditUsuario = ({ isOpen, onClose, prompUser }) => {
  const [isConfirUsuarioOpen, setIsConfirUsuarioOpen] = useState(false);
  const [username, setUsername] = useState(prompUser[1] || "");
  const [userEmail, setUserEmail] = useState(prompUser[2] || "");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleUserName = (event) => setUsername(event.target.value);
  const handleUserEmail = (event) => setUserEmail(event.target.value);

  

  const validateUsername = (value) => {
    const regex = /^[A-Za-z ]+$/;
    if (!value) return "El nombre de usuario no puede estar vacío.";
    if (!regex.test(value)) return "El nombre de usuario solo puede contener letras de la A a la Z.";
    return "";
  };

  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) return "El Correo no puede estar vacío.";
    if (!regex.test(value)) return "La dirección de correo electrónico proporcionada no parece válida. Asegúrate de incluir un '@' y un dominio válido.";
    return "";
  };

  const handleSaveChanges = () => {
    const usernameError = validateUsername(username);
    const emailError = validateEmail(userEmail);

    if (usernameError || emailError) {
      setError(usernameError || emailError);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    setError("");
    setIsConfirUsuarioOpen(true);
  };

  const handleClearUser = () => {
    setUsername(prompUser[1]);
    setUserEmail(prompUser[2]);
    onClose();
  };

  const handleConfirm = () => {
    setIsConfirUsuarioOpen(false);
    onClose();
  };

  const handleCancel = () => {
    setIsConfirUsuarioOpen(false); 
  };
  // console.log(prompUser);
  

  if (!isOpen) return null;

  return (
    <>
      {showAlert && (
        <div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 transition-transform duration-300 ease-in-out"
          role="alert"
          aria-live="assertive"
          style={{ zIndex: 9999 }}
        >
          <div className="flex flex-row items-center">
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Alerta!!!</span>
            </div>
          </div>
          <div>
            <span>{error}</span>
          </div>
        </div>
      )}

      <div
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Editar Usuario
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleClearUser}
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
          <div className="p-4 md:p-5">
            <form className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  className={`bg-gray-50 border ${
                    error && validateUsername(username) ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  value={username}
                  onChange={handleUserName}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className={`bg-gray-50 border ${
                    error && validateEmail(userEmail) ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  value={userEmail}
                  onChange={handleUserEmail}
                />
              </div>
              <div className="w-full flex justify-end">
                <button
                  type="button"
                  className="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSaveChanges}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ConfirmacionUsuario
        isOpen={isConfirUsuarioOpen}
        onClose={() => handleCancel()}
        onConfirm={() => handleConfirm()}
        nombreUsusario={username}
        correoUsuario={userEmail}
        identificacionUsuario={prompUser[0]}
      />
    </>
  );
};

export default EditUsuario;
