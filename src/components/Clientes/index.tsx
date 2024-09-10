import React from 'react';
import { Form } from '../Form';
import { Table } from '../Table';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import Swal from "sweetalert2";

import { EntidadService } from '../../services/entidad.service';
import { IEntidad } from "../../interfaces/Entidad"
import { EntidadState, setData, setEntidad } from "../../features/entidad/entidadSlice";

function Clientes() {

  const { entidad } = useSelector((state:{ entidad: EntidadState }) => state);

  const entidadService = new EntidadService();
  
  const dispatch = useDispatch();

  const headers = [ 'Nit', 'Razon social', 'Sigla'];

  const column = [ 'Nit', 'RazonSocial', 'Sigla'];
  const info = false;
  const deleteButton = true;
  const updateButton = false;
  const addButton = false;
  const actions = true;

  const fetchData  = async () => {
      try {
          const res:IEntidad[] = await entidadService.getAll()
          dispatch(setEntidad(res))
      } catch (error) {
        Swal.fire({ 
          icon: 'error',
          title: 'No se pudieron traer los datos de clientes',
          timer: 2000
        })
          console.log('Error to failed load ==>',error)
      }
  }
  useEffect(()=>{ 
      fetchData() 
  },[ ])

  return (
    <div className="block mt-0 w-[calc(1220px)] px-3 py-3 bg-transparent">
      <p style={{ fontSize: 32, padding: 0 }}>Clientes </p>

      <hr className="my-3 place-content-baseline border-gray-200 dark:border-gray-700" />

      <div className="pb-3 pl-6 ">
        <Link to="/clients/create">
            <button className="bg-teal-600 text-gray-50 font-semibold py-2 px-4 rounded-lg"  >
                Nuevo
            </button>
        </Link>
      </div>
      <div className="gap-6 w-[calc(1200px)]">
              <Table  
                  personService={entidadService} 
                  person={entidad} 
                  dispatch={dispatch} 
                  fetchData={fetchData} 
                  headers={headers}
                  column={column}
                  info={info}
                  actions={actions}
                  deleteButton={deleteButton}
                  updateButton={updateButton}
                  addButton={addButton}
                  addedItems={{ superfinanciera: [], Solidaria: [] }}
                  setAddedItems={''}
              />
      </div>
    </div>
  );
}

export default Clientes;