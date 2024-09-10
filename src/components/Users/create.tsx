import React from 'react';

import { Form } from '../Form';
import { Table } from '../Table';
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import Swal from "sweetalert2";
import { InformationCircleIcon,PencilSquareIcon,TrashIcon } from "@heroicons/react/24/outline";
import { PersonState,  setPersons } from "../../features/person/personSlice";
import { useState } from "react";

import { IUser,User } from '../../interfaces/User';
import { UserState, setData, setUser } from "../../features/user/userSlice";
import { UserService } from '../../services/user.service';


function CreateUsers() {

  // const { user } = useSelector((state:{ user: UserState }) => state);
    
  // const [ errorForm, setErrorForm ] = useState({
  //   username: false, 
  //   email: false, 
  //   password: false
  // })

  // const dispatch = useDispatch();

  // const userService = new UserService();

  // const setFormValue = (event:React.ChangeEvent<HTMLInputElement>) => { 
  //     dispatch(setData({ ...user.data, [event.target.id]: event.target.value }))
  // }

  // const isValidForm = ( ) => {
 
  //     const error = { 
  //       username: false, 
  //       email: false, 
  //       password: false
  //     }

  //     if(!user.data.username) error.username = true 
  //     if(!user.data.email) error.email = true; 
  //     if(!user.data.password) error.password = true; 

  //     setErrorForm(error) 
  //     console.log(error)
  //     return (
  //       error.username || 
  //       error.email || 
  //       error.password 
  //     );
  // }

  // const fetchUpdate = async (event:React.FormEvent<HTMLFormElement>) => {
  //   try {
  //     event.preventDefault() 
  //     const data:IUser = await userService.put(user.data)
  //     // add item
  //     const dataArray:IUser[] =  [...user.list]  
  //     // search index 
  //     let index:number = dataArray.findIndex((item:IUser)=>item.id === data.id )
  //     // replace item 
  //     dataArray.splice(index, 1, data); 
  //     //update item
  //     dispatch(setUser(dataArray))
  //     // for clean form
  //     dispatch(setData(new User()))

  //     Swal.fire({ 
  //         icon: 'success',
  //         title: 'La entidad fue creada con exito' 
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const fetchCreate = async (event:React.FormEvent<HTMLFormElement>) => {
  //   try {

  //       event.preventDefault() 
  //       // valid fields 
  //       console.log(isValidForm())
  //       if(!isValidForm()) {
  //         console.log("asdasd")
          
  //                 const data:IUser = await userService.post(user.data)
  //                 // for clean form
  //                 dispatch(setData(new User()))
  //                 // add item
  //                 const dataArray:IUser[] = [ ...user.list ]
  //                 dataArray.push(data)
  //                 dispatch(setUser(dataArray))
          
  //                 Swal.fire({ 
  //                     icon: 'success',
  //                     title: 'El usuario fue creado con exito' 
  //                 })

  //       }
  //   } catch (error) {
  //       console.log(error)
  //   }
  // // }  
    const inputCSS = "block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 "
    const inputError ="border-red-400"
    return (
    <div className="block mt-0 w-[calc(1220px)] px-3 py-3 bg-transparent">
      <p style={{ fontSize: 32, padding: 0 }}>Usuarios (Crear) </p>

      <hr className="my-3 place-content-baseline border-gray-200 dark:border-gray-700" />
      
      <div className="gap-3 w-[calc(1200px)] pr-20 pb-7">
      
        

      <div className="px-8 py-4 pb-8 bg-gray-100">
        {/* <form className="grid grid-cols-2 gap-4" onSubmit={(e)=>user.data.id?fetchUpdate(e):fetchCreate(e)}> */}
{/* 
          <div className="mt-4">
            <label className="mb-2 text-gray-800">Nombre de usuario</label>
            <input
              id="username"
              type="text"
              placeholder="Digita un nombre de usuario"
              value={user.data.username}
              onChange={(e)=>setFormValue(e)}
              className={errorForm.username?inputCSS+inputError:inputCSS } />
              {errorForm.username && <p className="mt-1 text-m text-red-400">Este campo es obligatorio</p>}  
          </div>
          <div className="mt-4">
            <label className="mb-2  text-gray-800">Email</label>
            <input 
                id="email"
                type="email" 
                placeholder="Digita el correo electrónico" 
                value={user.data.email}
                onChange={(e)=>setFormValue(e)}
                className={errorForm.email?inputCSS+inputError:inputCSS } />
                {errorForm.email && <p className="mt-1 text-m text-red-400">Este campo es obligatorio</p>}            
          </div>
          <div className="mt-4">
            <label className="mb-2  text-gray-800">Contraseña</label>
            <input 
                id="password"
                type="password" 
                placeholder="Digita la contraseña" 
                value={user.data.password}
                onChange={(e)=>setFormValue(e)}
                className={errorForm.password?inputCSS+inputError:inputCSS } />
                {errorForm.password && <p className="mt-1 text-m text-red-400">Este campo es obligatorio</p>}            
          </div>
          <div className="mt-4">
            <label className=" text-gray-800">Rol</label>
            <select
              id="rol"
              // onChange={(e) => setFormValue(e)}
              className={inputCSS}
            >
              <option value="">Selecciona un rol</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Consulta">Consulta</option>
            </select>
            {/* {errorForm.RepresentanteLegal && (
              <p className="mt-1 text-sm text-red-400">Este campo es obligatorio</p>
            )} */}
          {/* </div> */}

          <div className="mt-4">
            <label className="mb-2 text-gray-800">Client</label>
            <select
              id="client"
              // onChange={(e) => setFormValue(e)}
              className={inputCSS}
            >
              <option value="">Selecciona un cliente</option>
              <option value="Fecolfin">Fecolfin</option>
              <option value="No client">No cliente</option>
            </select>
            {/* {errorForm.RepresentanteLegal && (
              <p className="mt-1 text-sm text-red-400">Este campo es obligatorio</p>
            )} */}
          </div>

          <div className="col-span-2 mt-4">
            <button className=" bg-teal-600 text-gray-50 font-semibold py-2 px-4 rounded-lg">
              Crear
            </button>
          </div> 
        {/* </form> */}
      </div>

        
      </div>
    </div>

  );
}

export default CreateUsers;
