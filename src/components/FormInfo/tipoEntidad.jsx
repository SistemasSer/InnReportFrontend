import React, { useState, useEffect } from "react";

const TipoEntidad = ({ onSelectionChange }) => {
  const [selectedTipoEntidadIds, setSelectedTipoEntidadIds] = useState([]);
  const [selectedGremioIds, setSelectedGremioIds] = useState([]);
  const [selectedGrupoIds, setSelectedGrupoIds] = useState([]);

  useEffect(() => {
    clearSelectedIds();
  }, []);

  const clearSelectedIds = () => {
    setSelectedTipoEntidadIds([]);
    setSelectedGremioIds([]);
    setSelectedGrupoIds([]);
  };

  const handleTipoEntidadCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const idNumber = parseInt(id.slice(-1), 10);
    if (checked) {
      setSelectedTipoEntidadIds((prev) => [...prev, idNumber]);
    } else {
      setSelectedTipoEntidadIds((prev) =>
        prev.filter((item) => item !== idNumber)
      );
    }
  };

  const handleGremioCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const idNumberGremio = parseInt(id.slice(-1), 10);
    if (checked) {
      setSelectedGremioIds((prev) => [...prev, idNumberGremio]);
    } else {
      setSelectedGremioIds((prev) =>
        prev.filter((item) => item !== idNumberGremio)
      );
    }
  };

  const handleGrupoCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const idNumberGrupo = parseInt(id.slice(-1), 10);
    if (checked) {
      setSelectedGrupoIds((prev) => [...prev, idNumberGrupo]);
    } else {
      setSelectedGrupoIds((prev) =>
        prev.filter((item) => item !== idNumberGrupo)
      );
    }
  };

  const handleBuscarEntidades = () => {
    const selectedData = {
      tipoEntidad: selectedTipoEntidadIds,
      gremio: selectedGremioIds,
      grupo: selectedGrupoIds,
    };
    onSelectionChange(selectedData);
  };

  return (
    <div className="bg-gray-400 px-8 py-4 pb-3 mt-1 rounded-lg shadow-[8px_10px_10px_12px_rgba(0,0,0,0.3)]">
      <div className="flex flex-row">
        <h3 className="text-2xl font-bold ">Tipo de Entidad</h3>
      </div>
      <script
        src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
        type="module"
      ></script>
      <p className="mb-3 text-left rtl:text-right text-gray-900 dark:text-gray-400">
        Puede seleccionar las entidades dependiendo su Tipo, Gremio o Tamaño de
        activos, haciendo clic en su nombre o en la casilla a la izquierda.
        Luego, haz clic en "Buscar Entidad" para finalizar la búsqueda.
      </p>
      <div className="mt-1">
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input
                id="BancosCheck0"
                name="BancosCheck0"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                onChange={handleTipoEntidadCheckboxChange}
              />
              <label
                htmlFor="BancosCheck0"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Bancos
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input
                id="CooperativaCheck1"
                name="CooperativaCheck1"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                onChange={handleTipoEntidadCheckboxChange}
              />
              <label
                htmlFor="CooperativaCheck1"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Cooperativas Financieras
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input
                id="AhorroCheck2"
                name="AhorroCheck2"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                onChange={handleTipoEntidadCheckboxChange}
              />
              <label
                htmlFor="AhorroCheck2"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Cooperativas de Ahorro y Credito
              </label>
            </div>
          </li>
          <li className="w-full dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input
                id="CompañiasCheck3"
                name="CompañiasCheck3"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                onChange={handleTipoEntidadCheckboxChange}
              />
              <label
                htmlFor="CompañiasCheck3"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Compañias Financieras
              </label>
            </div>
          </li>
        </ul>
      </div>
      <hr className="h-px bg-gray-800 border-0 dark:bg-gray-700 mt-3" />
      <div className=" ">
        <div>
          <h3 className="text-lg mb-3 font-bold dark:text-white">Gremio</h3>
        </div>
        <div className="mt-1">
          <ul className="items-center w-1/4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="gremio_fel1"
                  name="gremio_fel1"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleGremioCheckboxChange}
                />
                <label
                  htmlFor="gremio_fel1"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Fecolfin
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <hr className="h-px bg-gray-800 border-0 dark:bg-gray-700 mt-3" />
      <div className="">
        <div>
          <h3 className="text-lg mb-3 font-bold dark:text-white">
            Tamaño de Activos
          </h3>
        </div>
        <div className="mt-1">
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="Activo_1"
                  name="Activo_1"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleGrupoCheckboxChange}
                />
                <label
                  htmlFor="Activo_1"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Menor a $10Mil M
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="Activo_2"
                  name="Activo_2"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleGrupoCheckboxChange}
                />
                <label
                  htmlFor="Activo_2"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  $10Mil M - $50Mil M
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="Activo_3"
                  name="Activo_3"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleGrupoCheckboxChange}
                />
                <label
                  htmlFor="Activo_3"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  $50Mil M - $200Mil M
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="Activo_4"
                  name="Activo_4"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleGrupoCheckboxChange}
                />
                <label
                  htmlFor="Activo_4"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  $200Mil M - $500Mil M
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center ps-3">
                <input
                  id="Activo_5"
                  name="Activo_5"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleGrupoCheckboxChange}
                />
                <label
                  htmlFor="Activo_5"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Mayor a $500Mil M
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex place-self-end place-content-end mt-1">
        <button
          className="bg-blue-950 hover:bg-blue-800 text-white font-semibold w-40 h-8 flex justify-center items-center rounded-lg relative top-5 mb-2"
          onClick={handleBuscarEntidades}
        >
          Buscar Entidades
        </button>
      </div>
    </div>
  );
};

export default TipoEntidad;
