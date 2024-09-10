import React from "react";
import { Table } from "../Table";
import  NewEntity  from "./crearEntidad";
import { IEntidad } from "../../interfaces/Entidad";
import {
  EntidadState,
  setData,
  setEntidad,
} from "../../features/entidad/entidadSlice";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { EntidadService } from "../../services/entidad.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Entidad() {
  const [createEntityOpen, setCreateEntityOpen] = useState(false);

  const entidad = useSelector(
    (state: { entidad: EntidadState }) => state.entidad,
    shallowEqual
  );
  // console.log('entidad',entidad)

  const entidadService = new EntidadService();

  const dispatch = useDispatch();

  const headers = ["Nit", "Razon social", "Sigla"];

  const column = ["Nit", "RazonSocial", "Sigla"];

  const infoButton = true;
  const deleteButton = true;
  const updateButton = false;
  const addButton = false;
  const actions = true;

  const fetchData = async () => {
    try {
      const res: IEntidad[] = await entidadService.getAll();
      // console.log(setEntidad(res));

      dispatch(setEntidad(res));
    } catch (error) {
      console.log("Error to failed load ==>", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEntityCreated = () => {
    fetchData(); 
  };

  const abrirCrearEntidad = () => {
    setCreateEntityOpen(true);
  };

  return (
    <div className="block mt-0 w-screen bg-transparent">
      <p className="mt-5 ml-12 font-bold" style={{ fontSize: 45, padding: 0 }}>
        Entidades{" "}
      </p>

      <hr className="mb-3 mx-10 place-content-baseline bg-gray-800  h-2 rounded-lg" />
      <div className="flex flex-col justify-start items-center mt-10">
        <div className="pb-3 pl-6 w-full ml-10">
          {/* <Link to="/entidad/create">
            <button className="bg-teal-600 text-gray-50 font-semibold py-2 px-4 rounded-lg">
              Nuevo
            </button>
          </Link> */}
          <button
            type="button"
            className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:teal-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none "
            onClick={() => abrirCrearEntidad()}
          >
            Nueva Entidad
          </button>
          <NewEntity
            isOpen={createEntityOpen}
            closeModal={() => setCreateEntityOpen(false)}
            onEntityCreated={handleEntityCreated}
          />
        </div>
        <div className="gap-6 w-[calc(1100px)]">
          <Table
            personService={entidadService}
            person={entidad}
            dispatch={dispatch}
            fetchData={fetchData}
            headers={headers}
            column={column}
            actions={actions}
            info={infoButton}
            deleteButton={deleteButton}
            updateButton={updateButton}
            addButton={addButton}
            addedItems={{ superfinanciera: [], solidaria: [] }}
            setAddedItems={""}
            entityType="Entidad"
          />
        </div>
      </div>
    </div>
  );
}

export default Entidad;
