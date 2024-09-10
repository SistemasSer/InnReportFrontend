import React, { useState } from "react";
import axios from "axios";
import IUser from "../../interfaces/User";
import { UserService } from "../../services/user.service";
import Swal from "sweetalert2";
import PasswordIcon from "../Navbar/Perfil/passwordIcon";

const NewUser = ({ isOpen, closeModal }) => {
  const apiUrl = process.env.REACT_APP_API_URL_1;
  const [usuarioName, setUsuarioName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [permissions, setPermissions] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClearUser = () => {
    setUsuarioName("");
    setUserEmail("");
    setPasswordNew("");
    setPermissions(false);
    closeModal();
  };

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    numbers: false,
    special: false,
  });

  const handleUserName = (event) => setUsuarioName(event.target.value);
  const handleUserEmail = (event) => setUserEmail(event.target.value);
  const handlePermissionsChange = (event) => setPermissions(event.target.value);

  const validateUsername = (value) => {
    if (!value) return "El nombre de usuario no puede estar vacío.";
    return "";
  };

  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) return "El correo no puede estar vacío.";
    if (!regex.test(value))
      return "La dirección de correo electrónico proporcionada no parece válida. Asegúrate de incluir un '@' y un dominio válido.";
    return "";
  };

  const validatePermissions = (value) => {
    if (!value) return "El campo de permisos no puede estar vacío.";
    return "";
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    const usernameError = validateUsername(usuarioName);
    const emailError = validateEmail(userEmail);
    const permissionsError = validatePermissions(permissions);

    if (usernameError || emailError || permissionsError) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        animation: true,
        showConfirmButton: false,
        timer: 1900,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

      Toast.fire({
        icon: "error",
        text: `${usernameError} ${emailError} ${permissionsError}`.trim(),
      });

      return;
    }

    const booleanPermissions = permissions === "1";

    const dataUser = {
      username: usuarioName,
      email: userEmail,
      password: passwordNew,
      is_staff: booleanPermissions,
    };

    try {
      const response = await axios.post(`${apiUrl}/auth/register/`, dataUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Usuario registrado con éxito:", response.data);
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        animation: true,
        showConfirmButton: false,
        timer: 1900,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

      Toast.fire({
        icon: "success",
        title: `Usuario registrado con éxito`,
      });
      handleClearUser();
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error al crear el usuario.";
    
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          animation: true,
          showConfirmButton: false,
          timer: 1900,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
      
        Toast.fire({
          icon: "error",
          title: errorMessage,
        });
  };
};

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
    setPasswordNew(newPassword);
    checkPasswordStrength(newPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getClassName = (condition) =>
    condition ? "text-teal-500 font-bold" : "text-gray-500";

  const getClassInput = (condition) =>
    condition
      ? "border-teal-200 rounded-md text-sm focus:border-teal-500 focus:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none"
      : "border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";

  const handleClickOutside = (e) => {
    if (e.target.id === "crud-modal") {
      handleClearUser();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      className="fixed top-0 right-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div className="relative p-4 w-10/12 max-w-md max-h-full bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h6 className="text-lg font-bold dark:text-white">
            Crear Nuevo Usuario
          </h6>
          <button
            type="button"
            onClick={handleClearUser}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
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

        <form className="p-4">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="EmailNewUser"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Correo Electrónico
              </label>
              <input
                type="text"
                value={userEmail}
                onChange={handleUserEmail}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  validateEmail(userEmail)
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Correo electrónico"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="newUsername"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                value={usuarioName}
                onChange={handleUserName}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  validateUsername(usuarioName)
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Nombre de Usuario"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="permissions"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Permisos
              </label>
              <select
                value={permissions}
                onChange={handlePermissionsChange}
                className={` bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ${
                  validatePermissions(permissions)
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="" hidden>
                  Rol del Usuario
                </option>
                <option value="1">Administrador</option>
                <option value="0">Usuario</option>
              </select>
            </div>

            <div className="col-span-2">
              <hr className="w-10/12 h-1 mx-auto my-2 bg-gray-400 border-0 rounded"></hr>
              <h6 className="block mb-2 text-sm font-medium text-gray-900">
                Contraseña
              </h6>
              <div className="relative mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordNew}
                  onChange={handlePasswordChange}
                  className={`py-3 px-4 block w-full rounded-lg ${getClassInput(
                    Object.values(passwordStrength).every(Boolean)
                  )}`}
                  placeholder="Contraseña"
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
              <div>
                <ul>
                  <li
                    className={`flex items-center space-x-2 ${getClassName(
                      passwordStrength.length
                    )}`}
                  >
                    <PasswordIcon condition={passwordStrength.length} />
                    <span
                      className={`text-sm font-medium ${
                        passwordStrength.length
                          ? "text-teal-600"
                          : "text-gray-500"
                      }`}
                    >
                      Al menos 8 caracteres
                    </span>
                  </li>
                  <li
                    className={`flex items-center space-x-2 ${getClassName(
                      passwordStrength.lowercase
                    )}`}
                  >
                    <PasswordIcon condition={passwordStrength.lowercase} />
                    <span
                      className={`text-sm font-medium ${
                        passwordStrength.lowercase
                          ? "text-teal-600"
                          : "text-gray-500"
                      }`}
                    >
                      Al menos una letra minúscula
                    </span>
                  </li>
                  <li
                    className={`flex items-center space-x-2 ${getClassName(
                      passwordStrength.uppercase
                    )}`}
                  >
                    <PasswordIcon condition={passwordStrength.uppercase} />
                    <span
                      className={`text-sm font-medium ${
                        passwordStrength.uppercase
                          ? "text-teal-600"
                          : "text-gray-500"
                      }`}
                    >
                      Al menos una letra mayúscula
                    </span>
                  </li>
                  <li
                    className={`flex items-center space-x-2 ${getClassName(
                      passwordStrength.numbers
                    )}`}
                  >
                    <PasswordIcon condition={passwordStrength.numbers} />
                    <span
                      className={`text-sm font-medium ${
                        passwordStrength.numbers
                          ? "text-teal-600"
                          : "text-gray-500"
                      }`}
                    >
                      Al menos un número
                    </span>
                  </li>
                  <li
                    className={`flex items-center space-x-2 ${getClassName(
                      passwordStrength.special
                    )}`}
                  >
                    <PasswordIcon condition={passwordStrength.special} />
                    <span
                      className={`text-sm font-medium ${
                        passwordStrength.special
                          ? "text-teal-600"
                          : "text-gray-500"
                      }`}
                    >
                      Al menos un carácter especial
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              type="button"
              className={`flex items-center text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[160px] ${
                Object.values(passwordStrength).every(Boolean)
                  ? "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300"
                  : "bg-gray-700 hover:bg-gray-800 focus:ring-gray-300"
              }`}
              disabled={!Object.values(passwordStrength).every(Boolean)}
              onClick={handleSaveChanges}
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
