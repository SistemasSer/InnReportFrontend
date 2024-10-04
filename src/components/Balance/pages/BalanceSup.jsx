import React, { useEffect, useState } from "react";
import  MainBalance  from "../widgets/MainBalance";
import { Title } from "../widgets/title";
import { EntidadesFinanciera } from "../utils/EntidadesFinanciera";
import { PucFinanciera } from "../utils/PucFinanciero";

const CACHE_KEY = 'pucData';
const CACHE_EXPIRY_KEY = 'pucDataExpiry';

const obtenerPucConCache = async () => {
  const now = new Date().getTime();
  const expiry = localStorage.getItem(CACHE_EXPIRY_KEY);

  if (expiry && now < expiry) {
    const cachedData = localStorage.getItem(CACHE_KEY);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  const data = await PucFinanciera();
  if (data) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_EXPIRY_KEY, now + 5 * 60 * 1000);
  }
  return data;
};


const BalanceSup = () => {
  const [entidad, setEntidades] = useState([]);
  const [options, setOptions] = useState([]);
  const [pucCodigo, setPucCodigo] = useState([]);

  useEffect(() => {
    const obtenerEntidades = async () => {
      const data = await EntidadesFinanciera();
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
      const data = await obtenerPucConCache();
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

  // console.log(pucCodigo);
  

  return (
    <div className="block mt-0 w-screen bg-transparent rounded-full">
      <div className=" w-full h-[150px] bg-gray-500 ">
        <Title title={"Balance Puc Super Financiera"}/>
      </div>
      <div className="w-11/12">
        <MainBalance TipoEntidad={"Super Financiera"} EntidadesOptions={options} CodigoOptions={pucCodigo} EntidadData={entidad}/>
      </div>
    </div>
  );
};

export default BalanceSup;
