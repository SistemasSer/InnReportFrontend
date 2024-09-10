import React from "react";
import { Form } from "../Form";
import { Table } from "../Table";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";

import { EntidadService } from "../../services/entidad.service";
import { IEntidad } from "../../interfaces/Entidad";
import {
  EntidadState,
  setData,
  setEntidad,
} from "../../features/entidad/entidadSlice";

function Home() {
  const { entidad } = useSelector((state: { entidad: EntidadState }) => state);

  const entidadService = new EntidadService();

  const dispatch = useDispatch();

  const headers = ["Nit", "Razon social", "Sigla"];

  const column = ["Nit", "RazonSocial", "Sigla"];

  const fetchData = async () => {
    try {
      const res: IEntidad[] = await entidadService.getAll();
      dispatch(setEntidad(res));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudieron traer los datos de clientes",
        timer: 2000,
      });
      console.log("Error to failed load ==>", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-200 to-90% w-screen h-screen">
    <div 
      style={{
        //backgroundImage: `url('/f4.png')`,
        backgroundImage: `url('/innreport 2-2.png')`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        minWidth: "95%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></div>
    </div>
  );
}

export default Home;
