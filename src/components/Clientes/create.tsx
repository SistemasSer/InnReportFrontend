import React from 'react';
import { Form } from '../Form';
import { Table } from '../Table';
import { IEntidad, Entidad } from "../../interfaces/Entidad"
import { EntidadState, setData, setEntidad } from "../../features/entidad/entidadSlice";
import { useDispatch, useSelector } from "react-redux"
import { EntidadService } from '../../services/entidad.service';
import { useEffect } from "react";
import Swal from "sweetalert2";
import { InformationCircleIcon,PencilSquareIcon,TrashIcon } from "@heroicons/react/24/outline";
import { PersonState,  setPersons } from "../../features/person/personSlice";
import { useState } from "react";


function CreateClientes() {

  const { entidad } = useSelector((state:{ entidad: EntidadState }) => state);
    
  const [ errorForm, setErrorForm ] = useState({
      Nit: false,
      RazonSocial: false,
      Sigla: false,
      Direccion: false,
      Telefono: false,
      Email: false,
      RepresentanteLegal: false
  })

  const dispatch = useDispatch();

  const entidadService = new EntidadService();

  const setFormValue = (event:React.ChangeEvent<HTMLInputElement>) => { 
      dispatch(setData({ ...entidad.data, [event.target.id]: event.target.value }))
  }

  const isValidForm = ( ) => {
 
      const error = { 
        Nit: false, 
        RazonSocial: false, 
        Sigla: false, 
        Direccion: false,
        Telefono: false,
        Email: false,
        RepresentanteLegal: false
      }

      if(!entidad.data.Nit) error.Nit = true 
      if(!entidad.data.RazonSocial) error.RazonSocial = true; 
      if(!entidad.data.Sigla) error.Sigla = true; 
      if(!entidad.data.Direccion) error.Direccion = true; 
      if(!entidad.data.Telefono) error.Telefono = true; 
      if(!entidad.data.Email) error.Email = true; 
      if(!entidad.data.RepresentanteLegal) error.RepresentanteLegal = true; 

      setErrorForm(error) 
      console.log(error)
      return (
        error.Nit || 
        error.RazonSocial || 
        error.Sigla || 
        error.Direccion ||
        error.Telefono ||
        error.Email ||
        error.RepresentanteLegal
      );
  }

  const fetchUpdate = async (event:React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault() 
      const data:IEntidad = await entidadService.put(entidad.data)
      // add item
      const dataArray:IEntidad[] =  [...entidad.list]  
      // search index 
      let index:number = dataArray.findIndex((item:IEntidad)=>item.id === data.id )
      // replace item 
      dataArray.splice(index, 1, data); 
      //update item
      dispatch(setEntidad(dataArray))
      // for clean form
      dispatch(setData(new Entidad()))

      Swal.fire({ 
          icon: 'success',
          title: 'La entidad fue creada con exito' 
      })
    } catch (error) {
      console.log(error)
    }
  }
  const fetchCreate = async (event:React.FormEvent<HTMLFormElement>) => {
    try {

        event.preventDefault() 
        // valid fields 
        console.log(isValidForm())
        if(!isValidForm()) {
          console.log("asdasd")
          
                  const data:IEntidad = await entidadService.post(entidad.data)
                  // for clean form
                  dispatch(setData(new Entidad()))
                  // add item
                  const dataArray:IEntidad[] = [ ...entidad.list ]
                  dataArray.push(data)
                  dispatch(setEntidad(dataArray))
          
                  Swal.fire({ 
                      icon: 'success',
                      title: 'The data has been saved' 
                  })

        }
    } catch (error) {
      Swal.fire({ 
        icon: 'error',
        title: 'No se pudo crear el cliente',
        timer: 2000
      })
        console.log(error)
    }
  }  
    const inputCSS = "block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 "
    const inputError ="border-red-400"
    return (
    <div className="block mt-0 w-[calc(1220px)] px-3 py-3 bg-transparent">
      <p style={{ fontSize: 32, padding: 0 }}>Clientes (Crear) </p>

      <hr className="my-3 place-content-baseline border-gray-200 dark:border-gray-700" />
      
      <div className="gap-3 w-[calc(1200px)] pr-20 pb-7">
      
        

      <div className="px-8 py-4 pb-8 bg-gray-100">
        <form className="grid grid-cols-2 gap-4" onSubmit={(e)=>entidad.data.id?fetchUpdate(e):fetchCreate(e)}>
          <div className="mt-4">
            <label className="mb-2 text-gray-800">Nit</label>
            <input
              id="Nit"
              type="text"
              placeholder="Digita un NIT"
              value={entidad.data.Nit}
              onChange={(e)=>setFormValue(e)}
              className={errorForm.Nit?inputCSS+inputError:inputCSS } />
              {errorForm.Nit && <p className="mt-1 text-m text-red-400">Este campo es obligatorio</p>}  
          </div>

          <div className="mt-4">
            <label className="mb-2 text-gray-800">Razón social</label>
            <input
              id="RazonSocial"
              type="text"
              placeholder="Digita la razón social"
              value={entidad.data.RazonSocial}
              onChange={(e)=>setFormValue(e)}
              className={errorForm.RazonSocial?inputCSS+inputError:inputCSS } />
              {errorForm.RazonSocial && <p className="mt-1 text-m text-red-400">Este campo es obligatorio</p>}              
          </div>

          <div className="mt-4">
            <label className="mb-2 text-gray-800">Sigla</label>
            <input
              id="Sigla"
              type="text"
              placeholder="Digita la sigla"
              value={entidad.data.Sigla}
              onChange={(e)=>setFormValue(e)}
              className={errorForm.Sigla?inputCSS+inputError:inputCSS } />
              {errorForm.Sigla && <p className="mt-1 text-m text-red-400">Este campo es obligatorio</p>}  
          </div>
          <div className="mt-4">
            <label className="mb-2  text-gray-800">Dirección</label>
            <input 
                id="Direccion"
                type="text" 
                placeholder="Digita la dirección" 
                value={entidad.data.Direccion}
                onChange={(e)=>setFormValue(e)}
                className={errorForm.Direccion?inputCSS+inputError:inputCSS } />
                {errorForm.Direccion && <p className="mt-1 text-m text-red-400">Este campo es obligatorio</p>}            
          </div>
          <div className="mt-4">
            <label className="mb-2  text-gray-800">Teléfono</label>
            <input 
                id="Telefono"
                type="number" 
                placeholder="Digita el telefono" 
                value={entidad.data.Telefono}
                onChange={(e)=>setFormValue(e)}
                className={errorForm.Telefono?inputCSS+inputError:inputCSS } />
                {errorForm.Telefono && <p className="mt-1 text-m text-red-400">Este campo es obligatorio</p>}            
          </div>
          <div className="mt-4">
            <label className="mb-2  text-gray-800">Email</label>
            <input 
                id="Email"
                type="email" 
                placeholder="Digita el correo electrónico" 
                value={entidad.data.Email}
                onChange={(e)=>setFormValue(e)}
                className={errorForm.Email?inputCSS+inputError:inputCSS } />
                {errorForm.Email && <p className="mt-1 text-m text-red-400">Este campo es obligatorio</p>}            
          </div>
          <div className="mt-4">
            <label className="mb-2  text-gray-800">Representante legal</label>
            <input 
                id="RepresentanteLegal"
                type="text" 
                placeholder="Digita el nombre del representante legal" 
                value={entidad.data.RepresentanteLegal}
                onChange={(e)=>setFormValue(e)}
                className={errorForm.RepresentanteLegal?inputCSS+inputError:inputCSS } />
                {errorForm.RepresentanteLegal && <p className="mt-1 text-m text-red-400">Este campo es obligatorio</p>}            
          </div>
          <div className="col-span-2 mt-4">
            <button className=" bg-teal-600 text-gray-50 font-semibold py-2 px-4 rounded-lg">
              Crear
            </button>
          </div>
        </form>
      </div>

        
      </div>
    </div>
  );
}

export default CreateClientes;