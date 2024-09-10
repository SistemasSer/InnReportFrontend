import React, { useState } from "react";
import Swal from 'sweetalert2'
import PasswordIcon from "./passwordIcon"; 
import { updatePassword } from "./apiCambioContraseña";
import { useAuth } from "../../../auth/AuthProvider";

const PassUsiario = ({ isOpen, onClose, identificacionUsuario }) => {
  const [passwordOld, setPasswordOld] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    numbers: false,
    special: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordOld, setShowPasswordOld] = useState(false);

  const checkPasswordStrength = (pass) => {
    const lengthCheck = pass.length >= 8;
    const lowercaseCheck = /[a-z]/.test(pass);
    const uppercaseCheck = /[A-Z]/.test(pass);
    const numbersCheck = /[0-9]/.test(pass);
    const specialCheck = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    setPasswordStrength({
      length: lengthCheck,
      lowercase: lowercaseCheck,
      uppercase: uppercaseCheck,
      numbers: numbersCheck,
      special: specialCheck,
    });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleOldPasswordChange = (e) => {
    setPasswordOld(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const togglePasswordVisibilityOld = () => {
    setShowPasswordOld(!showPasswordOld);
  };

  const getClassName = (condition) =>
    condition ? "text-teal-500 font-bold" : "text-gray-500";

  const getClassInput = (condition) =>
    condition
      ? "border-teal-200 rounded-md text-sm focus:border-teal-500 focus:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none"
      : "border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";

  const handleClearUser = () => {
    setPassword('');
    setPasswordOld('');
    setShowPassword(false);
    setShowPasswordOld(false);
    setPasswordStrength({
      length: false,
      lowercase: false,
      uppercase: false,
      numbers: false,
      special: false,
    });
    onClose();
  };

  const { getUser, setUser } = useAuth();
  // console.log(identificacionUsuario);
  

  const handlePassword = async () => {
    if (!identificacionUsuario) {
      console.error("User ID no está definido.");
      return;
    }

    const PasswordData = {
      old_password: passwordOld,
      new_password: password,
    };

    try {
      await updatePassword(identificacionUsuario, PasswordData);
      setUser((prevUser) => ({
        ...prevUser,
        
      }));
      // console.log(`Se cambio la contrasela correctamente ${PasswordData}` );
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
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
        icon: "success",
        title: "Contraseña Cambiada Correctamente!!!"
      });
      
      handleClearUser();
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
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
        title: "Algo salio mal",
        text: error.message
      });
    }
  };

  if (!isOpen) return null;
  return (
    <div
      id="small-modal"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h5 className="text-xl font-bold dark:text-white">
              Cambiar Contraseña
            </h5>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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

          <div className="p-4 md:p-5 space-y-4">
            <div className="max-w-sm">
              <h6 className="text-lg font-bold dark:text-white mb-1">
                Contraseña Antigua
              </h6>
              <div className="relative mb-2">
                <input
                  type={showPasswordOld ? "text" : "password"}
                  id="passwordOld"
                  name="passwordOld"
                  value={passwordOld}
                  onChange={handleOldPasswordChange}
                  className={`py-3 px-4 block w-full rounded-lg border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
                  placeholder="Contraseña Antigua"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibilityOld}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 rounded-r-md focus:outline-none"
                >
                  {showPasswordOld ? (
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                      />
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <hr className="w-48 h-1 mx-auto my-4 bg-gray-300 border-0 rounded" />
              <h6 className="text-lg font-bold dark:text-white mb-1">
                Contraseña Nueva
              </h6>
              <div className="relative mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`py-3 px-4 block w-full rounded-lg ${getClassInput(
                    Object.values(passwordStrength).every(Boolean)
                  )}`}
                  placeholder="Contraseña Nueva"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 rounded-r-md focus:outline-none"
                >
                  {showPassword ? (
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                      />
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4 space-y-2">
              <ul>
                <li className={`flex items-center space-x-2 ${getClassName(passwordStrength.length)}`}>
                  <PasswordIcon condition={passwordStrength.length} />
                  <span
                    className={`text-sm font-medium ${passwordStrength.length ? "text-teal-600" : "text-gray-500"}`}
                  >
                    Al menos 8 caracteres
                  </span>
                </li>
                <li className={`flex items-center space-x-2 ${getClassName(passwordStrength.lowercase)}`}>
                  <PasswordIcon condition={passwordStrength.lowercase} />
                  <span
                    className={`text-sm font-medium ${passwordStrength.lowercase ? "text-teal-600" : "text-gray-500"}`}
                  >
                    Al menos una letra minúscula
                  </span>
                </li>
                <li className={`flex items-center space-x-2 ${getClassName(passwordStrength.uppercase)}`}>
                  <PasswordIcon condition={passwordStrength.uppercase} />
                  <span
                    className={`text-sm font-medium ${passwordStrength.uppercase ? "text-teal-600" : "text-gray-500"}`}
                  >
                    Al menos una letra mayúscula
                  </span>
                </li>
                <li className={`flex items-center space-x-2 ${getClassName(passwordStrength.numbers)}`}>
                  <PasswordIcon condition={passwordStrength.numbers} />
                  <span
                    className={`text-sm font-medium ${passwordStrength.numbers ? "text-teal-600" : "text-gray-500"}`}
                  >
                    Al menos un número
                  </span>
                </li>
                <li className={`flex items-center space-x-2 ${getClassName(passwordStrength.special)}`}>
                  <PasswordIcon condition={passwordStrength.special} />
                  <span
                    className={`text-sm font-medium ${passwordStrength.special ? "text-teal-600" : "text-gray-500"}`}
                  >
                    Al menos un carácter especial
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex w-full justify-end gap-2">
              <button
                type="button"
                className={`text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  Object.values(passwordStrength).every(Boolean)
                    ? "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300"
                    : "bg-gray-700 hover:bg-gray-800 focus:ring-gray-300"
                }`}
                disabled={!Object.values(passwordStrength).every(Boolean)}
                onClick={handlePassword}
              >
                Cambiar Contraseña
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                onClick={handleClearUser}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassUsiario;
