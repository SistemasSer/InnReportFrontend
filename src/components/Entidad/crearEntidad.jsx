import React, { useState } from "react";
import Swal from "sweetalert2";
import { EntidadService } from "../../services/entidad.service";

const NewEntity = ({ isOpen, closeModal, onEntityCreated  }) => {
  const [nit, setNit] = useState("");
  const [dv, setDv] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [tipoEntidad, setTipoEntidad] = useState("");
  const [sigla, setSigla] = useState("");
  const [codigoSuper, setCodigoSuper] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [representante, setRepresentante] = useState("");
  const [gremio, setGremio] = useState("");
  const [ciiu, setCiiu] = useState("");

  const handleClearUser = () => {
    setNit("");
    setDv("");
    setRazonSocial("");
    setTipoEntidad("");
    setSigla("");
    setCodigoSuper("");
    setDescripcion("");
    setDepartamento("");
    setCiudad("");
    setDireccion("");
    setTelefono("");
    setDireccion("");
    setEmail("");
    setRepresentante("");
    setGremio("");
    setCiiu("");
    closeModal();
  };

  const entidadService = new EntidadService();

  const [errors, setErrors] = useState({
    nit: "",
    dv: "",
    razonSocial: "",
    tipoEntidad: "",
    sigla: "",
    gremio: "",
    codigoSuper: "",
    ciiu: "",
  });

  const validate = () => {
    const onlyLetter = /^[a-zA-Z\s]+$/; 
    const newErrors = {};
    if (nit.length!==9) newErrors.nit = "El NIT debe ser un numero de 9 cifras";
    if (!nit) newErrors.nit = "El NIT no puede estar vacío.";
    if (dv.length!==1) newErrors.dv = "El DV debe ser un numero de una cifra";
    if (!dv) newErrors.dv = "El DV no puede estar vacío.";
    if (!onlyLetter.test(razonSocial)) newErrors.razonSocial = "La Razon Social solo puede contener letras y espacios.";
    if (!razonSocial)newErrors.razonSocial = "La Razon Social no puede estar vacía.";
    if (!onlyLetter.test(sigla)) newErrors.sigla = "La Sigla solo puede contener letras y espacios.";
    if (!sigla) newErrors.sigla = "La Sigla  no puede estar vacía.";
    if (!tipoEntidad)newErrors.tipoEntidad = "El Tipo Entidad no puede estar vacío.";
    if (!codigoSuper)newErrors.codigoSuper = "El Codigo Super no puede estar vacío.";
    if (!gremio) newErrors.gremio = "El Gremio no puede estar vacío.";
    if (!ciiu) newErrors.ciiu = "El CIIU no puede estar vacío.";

    setErrors(newErrors);

    const firstErrorField = Object.keys(newErrors)[0];
    if (firstErrorField) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
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
        title: newErrors[firstErrorField],
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    if (validate()) {
      console.log("Datos válidos, se pueden guardar:", {
        nit,
        dv,
        razonSocial,
        tipoEntidad,
        sigla,
        codigoSuper,
        descripcion,
        departamento,
        ciudad,
        direccion,
        telefono,
        email,
        representante,
        gremio,
        ciiu,
      });

      try {
        const entityData = {
          Nit: nit,
          Dv: dv,
          RazonSocial: razonSocial,
          TipoEntidad: tipoEntidad,
          Sigla: sigla,
          CodigoSuper: codigoSuper,
          Descripcion: descripcion,
          Departamento: departamento,
          Ciudad: ciudad,
          Direccion: direccion,
          Telefono: telefono,
          Email: email,
          RepresentanteLegal: representante,
          Gremio: gremio,
          CIIU: ciiu,
        };
        console.log(entityData);
        

        await entidadService.post(entityData);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
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
          title: "Entidad Creada correctamente!!",
        });

        if (onEntityCreated) onEntityCreated(); 

        handleClearUser();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.id === "crud-modal") {
      handleClearUser();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      className="fixed top-0 right-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div className="relative p-4 w-11/12 h-auto max-w-md  bg-white rounded-lg shadow-lg ">
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h4 className="text-2xl font-bold dark:text-white">Nueva Entidad</h4>

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
          <div className="grid gap-4 mb-4 grid-cols-2 h-[500px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="nit"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nit
              </label>
              <input
                type="number"
                value={nit}
                onChange={(e) => setNit(e.target.value)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.nit ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="Nit"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="dv"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Dv
              </label>
              <input
                type="number"
                value={dv}
                onChange={(e) => setDv(e.target.value)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.dv ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="DV"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="razonSocial"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Razon Social
              </label>
              <input
                type="text"
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.razonSocial ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="Razon Social"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="sigla"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Sigla
              </label>
              <input
                type="text"
                value={sigla}
                onChange={(e) => setSigla(e.target.value)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.sigla ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="Sigla"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="tipoEntidad"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tipo Entidad
              </label>
              <select
                id="tipoEntidad"
                value={tipoEntidad}
                onChange={(e) => setTipoEntidad(e.target.value)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.tipoEntidad ? "border-red-500" : "border-gray-500"
                }`}
              >
                <option value="" hidden>
                  Seleccione el Tipo
                </option>
                <option value="0">Banco</option>
                <option value="3">Compañía</option>
                <option value="2">Ahorro y crédito</option>
                <option value="1">Cooperativa</option>
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="codigoSuper"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Codigo Super
              </label>
              <input
                type="number"
                value={codigoSuper}
                onChange={(e) => setCodigoSuper(e.target.value)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.codigoSuper ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="Codigo Super"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="descripcion"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Descripción
              </label>
              <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.descripcion ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="Descripcion"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="departamento"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Departamento
              </label>
              <input
                type="text"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.departamento ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="Departamento"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="ciudad"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Ciudad
              </label>
              <input
                type="text"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.ciudad ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="Ciudad"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="direccion"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Dirección
              </label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.direccion ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="Direccion"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="telefono"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Teléfono
              </label>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.telefono ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="Telefono"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.email ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="Correo Electronico"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="representante"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Representante Legal
              </label>
              <input
                type="text"
                value={representante}
                onChange={(e) => setRepresentante(e.target.value)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.representante ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="Representante Legal"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="gremio"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Gremio
              </label>
              <select
                id="gremio"
                value={gremio}
                onChange={(e) => setGremio(e.target.value)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.gremio ? "border-red-500" : "border-gray-500"
                }`}
              >
                <option value="" hidden>
                  Seleccione el Gremio
                </option>
                <option value="1">Fecolfin</option>
                <option value="0">Sin Gremio</option>
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="representante"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                CIIU
              </label>
              <input
                type="number"
                value={ciiu}
                onChange={(e) => setCiiu(e.target.value)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.ciiu ? "border-red-500" : "border-gray-500"
                }`}
                placeholder="CIIU"
              />
            </div>
          </div>

          <div className="w-full flex justify-end">
            <button
              type="button"
              className="flex items-center text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center w-[160px] bg-blue-700 hover:bg-blue-800 focus:ring-blue-300"
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
              Crear Entidad
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEntity;
