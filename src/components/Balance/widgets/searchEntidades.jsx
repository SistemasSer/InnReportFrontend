import React, { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";

export const SearchEntidades = ({
  entidadTitle,
  EntidadSelect,
  EntidadAll,
  CodigoSelect,
  setBalanceData,
}) => {
  const [entidadSave, setEntidadSave] = useState([]);
  const [periodo, setPeriodo] = useState('');
  const [pucCodigo, setPucCodigo] = useState('');
  const [pucName, setPucName] = useState('');

  const handleEntidadSelect = (selected) => {
    setEntidadSave(selected);
  };

  const isEntidadDisabled = (option) => {
    return entidadSave.length >= 4 && !entidadSave.find(o => o.value === option.value);
  };

  const handleCodigoSelect = (selectedOption) => {
    setPucCodigo(selectedOption ? selectedOption.value : null);
    const preNameCount = (selectedOption ? selectedOption.label : null);

    if (preNameCount) {
      const partAfterDash = preNameCount.split('-')[1]?.trim();
      setPucName(partAfterDash)
  }
  };

  const [errors, setErrors] = useState({
    entidadSave: "",
    periodo: "",
    pucCodigo: "",
  });

  const validate = () => {
    const newErrors = {};
    if (!periodo) newErrors.periodo = "Debes seleccionar un periodo";
    if (!pucCodigo) newErrors.pucCodigo = "Debes seleccionar un número de cuenta";
    if (entidadSave.length === 0) newErrors.entidadSave = "Debes seleccionar al menos una entidad";
    
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

  const handleBalanceSend = () => {

    if (validate()) {
      const [year, month] = periodo.split('-');
      const Entidad = entidadSave.map((option) => option.value);
      const selectedEntities = EntidadAll.filter((EntidadAll) =>
        Entidad.includes(EntidadAll.Nit)
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

    const DatosBalance = {
      año: parseInt(year),
      mes: parseInt(month),
      pucCodigo: pucCodigo,
      pucName: pucName,
      entidad: newAddedItems,
    };

    // console.log(DatosBalance);
    setBalanceData(DatosBalance);
    
    
    }
  };

  return (
    <div class="relative w-[500px] h-[600px] max-w-[24rem] rounded-lg overflow-hidden shadow-sm ml-4 bottom-9">
      <div class="flex flex-col bg-gray-300">
        <div class=" m-2 items-center flex justify-center text-white h-24 rounded-md bg-slate-800">
          <h3 class="text-2xl font-bold">Entidades {entidadTitle}</h3>
        </div>
        <div class="flex flex-col gap-2 px-6 py-2">
          <div>
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Periodo
            </label>
            <input
              type="month"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>

          <div class="w-full max-w-sm min-w-[200px] mt-2">
            <Select
              options={CodigoSelect}
              onChange={handleCodigoSelect}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Selecciona Numero de Cuenta"
            />
          </div>

          <div class="w-full max-w-sm min-w-[200px] mt-3">
            <Select
              isMulti
              options={EntidadSelect}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Selecciona entidades"
              onChange={handleEntidadSelect}
              isOptionDisabled={isEntidadDisabled}
            />
          </div>


        </div>
        <div class="p-6 pt-0 mt-20 flex justify-end">
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={handleBalanceSend}
          >
            Buscar Entidades
          </button>
        </div>
      </div>
    </div>
  );
};
