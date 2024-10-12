import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../auth/AuthProvider";

import { PencilSquareIcon, LockClosedIcon } from "@heroicons/react/24/outline";

import EditUsuario from "./editarUsuario";
import PassUsiario from "./contraseñaUsiarip";

function Perfil() {
  const [isEditusuarioOpen, setIsEditusuarioOpen] = useState(false);
  const [isPassUsuarioOpen, setIsPassUsuarioOpen] = useState(false);

  const toggleEditusuario = () => setIsEditusuarioOpen(!isEditusuarioOpen);
  const togglePassUsuario = () => setIsPassUsuarioOpen(!isPassUsuarioOpen);

  // const { getUser } = useAuth();
  // const identificacionUsuario = getUser()?.id;
  // const userName = getUser()?.username;
  // const correo = getUser()?.email;
  // const create = getUser()?.created_at;
  // const admin = getUser()?.is_staff;

  const { getUser, setUser } = useAuth();
  const user = getUser();

  const userData = [
    user?.id,
    user?.username,
    user?.email,
    user?.created_at,
    user?.is_staff,
  ];

  // console.log(userData);
  // console.log(user.is_staff);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const day = String(date.getDate()).padStart(2, "0");
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  // console.log(`id del usuario ${user.id}`);

  return (
    <>
      <div className="flex justify-center items-center mt-0 w-screen px-3 py-3 bg-transparent ">
        <div className=" w-9/12 h-auto rounded-lg shadow-[8px_10px_10px_12px_rgba(0,0,0,0.3)]">
          <div className="bg-white  shadow overflow-hidden sm:rounded-lg">
            <div className="w-full  flex gap-2">
              <div className="flex-none w-[400px]">
                <img
                  src="/Innreport1.png"
                  alt="Logo"
                  className="flex justify-center items-center w-[400px] h-[400px] p-10 "
                />
              </div>
              <div className="flex-1">
                <div className="bg-white  shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-2xl leading-6 font-bold text-gray-900">
                      Datos Del Usuario
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Detalles e información sobre el Usuario.
                    </p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-500 ">
                          Nombre Completo
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                          {user.username}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-500">
                          Correo Electrónico
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {user.email}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-500">
                          Fecha de Creación
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {formatDate(user.created_at)}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-bold text-gray-500">
                          Permisos
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {user.is_staff === true ? (
                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                              Administrador
                            </span>
                          ) : (
                            <span className="bg-red-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                              Usuario
                            </span>
                          )}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div></div>
                        <div></div>
                        <div className="flex justify-end gap-4">
                          <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 m-y-2 focus:outline-none"
                            onClick={toggleEditusuario}
                          >
                            <PencilSquareIcon className="h-6 w-6 text-gray-100" />
                          </button>

                          <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 m-y-2 focus:outline-none0"
                            onClick={togglePassUsuario}
                          >
                            <LockClosedIcon className="h-6 w-6 text-gray-100" />
                          </button>
                          <EditUsuario
                            isOpen={isEditusuarioOpen}
                            onClose={toggleEditusuario}
                            prompUser={userData}
                          />
                          <PassUsiario
                            isOpen={isPassUsuarioOpen}
                            onClose={togglePassUsuario}
                            identificacionUsuario={user.id}
                          />
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;
