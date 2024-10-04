import React, { useEffect, useState } from "react";
import  MainBalance  from "../widgets/MainBalance";
import { Title } from "../widgets/title";
import { EntidadesSolidaria } from "../utils/EntidadesSolidaria";
import { PucSolidaria } from "../utils/PucSolidaria";


const BalanceCoop = () => {
  const [entidad, setEntidades] = useState([]);
  const [options, setOptions] = useState([]);
  const [pucCodigo, setPucCodigo] = useState([]);

  useEffect(() => {
    const obtenerEntidades = async () => {
      const data = await EntidadesSolidaria();
      if (data) {
        const transformedOptions = data.map((entidad) => ({
          value: entidad.Nit,
          label: entidad.Sigla,
        }));
        setOptions(transformedOptions)
        setEntidades(data);
      }
    };

    obtenerEntidades();
  }, []);

  useEffect(() => {
    const obtenerPuc = async () => {
      const data = await PucSolidaria();
      if (data) {
        const transformedOptions = data.map((puc) => ({
          value: puc.Codigo,
          label: `${puc.Codigo} - ${puc.Descripcion}`
        }));
        setPucCodigo(transformedOptions);
      }
    };

    obtenerPuc();
  }, []);

  // console.log(options);
  
  return (
    <div className="block mt-0 w-screen bg-transparent rounded-full">
      <div className=" w-full h-[150px] bg-gray-500 ">
        <Title title={"Balance Puc Cooperativas"}/>
      </div>
      <div className="w-11/12">
        <MainBalance TipoEntidad={"Cooperativas"} EntidadesOptions={options} CodigoOptions={pucCodigo} EntidadData={entidad}/>
      </div>
    </div>
  );
};

export default BalanceCoop;
