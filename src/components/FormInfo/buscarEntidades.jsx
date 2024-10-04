import React, { useEffect, useState } from "react";
import Select from "react-select";

const BuscarEntidades = ({ onItemsAdded, shouldClear }) => {
  const [options, setOptions] = useState([]);
  const [entities, setEntities] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const apiUrlv1 = process.env.REACT_APP_API_URL_2;

  const fetchEntidades = async () => {
    try {
      //const response = await fetch("http://localhost:8000/api/v1/entidad_defaul");
      const response = await fetch(`${apiUrlv1}/entidad_defaul`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const sortedData = data.sort((a, b) => a.Sigla.localeCompare(b.Sigla));
      const transformedOptions = sortedData.map((entidad) => ({
        value: entidad.Nit,
        label: entidad.Sigla,
      }));
      setOptions(transformedOptions);
      setEntities(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchEntidades();
  }, []);

  useEffect(() => {
    if (shouldClear) {
      setSelectedOptions([]);
    }
  }, [shouldClear]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const handleSearch = () => {
    const selectedValues = selectedOptions.map((option) => option.value);
    const selectedEntities = entities.filter((entity) =>
      selectedValues.includes(entity.Nit)
    );

    const newAddedItems = {
      solidaria: [],
      superfinanciera: [],
    };

    selectedEntities.forEach((item) => {
      if (item.TipoEntidad === 2) {
        newAddedItems.solidaria.push({
          nit: item.Nit,
          sigla: item.Sigla,
          RazonSocial: item.RazonSocial,
          dv: item.Dv,
        });
      } else {
        newAddedItems.superfinanciera.push({
          nit: item.Nit,
          sigla: item.Sigla,
          RazonSocial: item.RazonSocial,
        });
      }
    });

    if (onItemsAdded) {
      onItemsAdded(newAddedItems);
    }
  };

  return (
    <div className="px-8 py-4 pb-3 mt-1 bg-gray-400 rounded-lg shadow-[8px_10px_10px_12px_rgba(0,0,0,0.3)]">
      <div>
        <h3 className="text-2xl font-bold dark:text-white">Buscar Entidades</h3>
        <p className="mb-3 text-left rtl:text-right text-gray-800 dark:text-gray-400">
          Puedes buscar por su sigla dentro del campo. Para realizar la búsqueda después de
          seleccionar las entidades, se debe hacer clic en el botón de buscar.
        </p>
        <hr className="h-px my-2 mb-4 bg-gray-800 border-0 dark:bg-gray-700" />
      </div>
      <form action="" className="flex flex-row justify-center w-full">
        <div className="w-11/12 ">
          <Select
            isMulti
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChange}
            placeholder="Selecciona entidades"
            value={selectedOptions}
          />
        </div>
        <button
          id="buscarentidad"
          type="button"
          className="max-w-4 max-h-10 p-2.5 ms-2 text-sm font-medium text-white bg-blue-950 rounded-lg border border-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSearch}
        >
          <svg
            className="w-4 h-4"
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
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Buscar</span>
        </button>
      </form>
    </div>
  );
};

export default BuscarEntidades;
