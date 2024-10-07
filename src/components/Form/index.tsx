// import { IEntidad, Person } from "../../interfaces/Person";
import { IEntidad, Entidad } from "../../interfaces/Entidad";
import { useDispatch, useSelector } from "react-redux";
// import { PersonState, setData, setPersons } from '../../features/person/personSlice';
import { EntidadState, setData, setEntidad } from '../../features/entidad/entidadSlice';
import { PersonService } from "../../services/person.service";
import { EntidadService } from "../../services/entidad.service";
import Swal from "sweetalert2";
import { useState } from "react";

export const Form = () => {

    const { person } = useSelector((state:{ person: EntidadState }) => state);
    
    const [ errorForm, setErrorForm ] = useState({
        Nit: false,
        RazonSocial: false,
        Sigla: false
    })

    const dispatch = useDispatch();

    const entidadService = new EntidadService();
  
    const setFormValue = (event:React.ChangeEvent<HTMLInputElement>) => { 
        dispatch(setData({ ...person.data, [event.target.id]: event.target.value }))
	}

    const isValidForm = ( ) => {
   
        const error = { Nit: false, RazonSocial: false, Sigla: false }

        if(!person.data.Nit) error.Nit = true 
        if(!person.data.RazonSocial) error.RazonSocial = true; 
        if(!person.data.Sigla) error.Sigla = true; 

        setErrorForm(error) 

        return error.Nit || error.RazonSocial || error.Sigla;
    }

    const fetchUpdate = async (event:React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault() 
            const data:IEntidad = await entidadService.put(person.data)
            // add item
            const dataArray:IEntidad[] =  [...person.list]  
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
                title: 'The data has been updated' 
            })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCreate = async (event:React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault() 
            // valid fields 
            if(isValidForm()) return null;

            const data:IEntidad = await entidadService.post(person.data)
            // for clean form
            dispatch(setData(new Entidad()))
            // add item
            const dataArray:IEntidad[] = [ ...person.list ]
            dataArray.push(data)
            dispatch(setEntidad(dataArray))

            Swal.fire({ 
                icon: 'success',
                title: 'Los datos han sido guardados correctamente' 
            })
        } catch (error) {
            console.log(error)
        }
    }

    const inputCSS = "block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 "
    const inputError ="border-red-400"
    
    return (
    <div className="px-8 py-4 pb-8 rounded-lg bg-gray-50">
 
        <form onSubmit={(e)=>person.data.id?fetchUpdate(e):fetchCreate(e)}>
            
            <div className="mt-4">
                <label className="mb-2  text-gray-800">Nit</label>
                <input 
                    id="Nit"
                    type="text" 
                    placeholder="Digita un NIT"
                    value={person.data.Nit}
                    onChange={(e)=>setFormValue(e)}
                    className={errorForm.Nit?inputCSS+inputError:inputCSS } />
                    {errorForm.Nit && <p className="mt-1 text-m text-red-400">Este campo es obligatorio</p>}  
            </div>

            <div className="mt-4">
                <label className="mb-2  text-gray-800">Razón social</label>
                <input 
                    id="RazonSocial"
                    type="text" 
                    placeholder="Digita la razón social"
                    value={person.data.RazonSocial}
                    onChange={(e)=>setFormValue(e)}
                    className={errorForm.RazonSocial?inputCSS+inputError:inputCSS } />
                    {errorForm.RazonSocial && <p className="mt-1 text-m text-red-400">Este campo es obligatorio</p>}  
            </div>

            <div className="mt-4">
                <label className="mb-2  text-gray-800">Sigla</label>
                <input 
                    id="Sigla"
                    type="number" 
                    placeholder="Digita la sigla" 
                    value={person.data.Sigla}
                    onChange={(e)=>setFormValue(e)}
                    className={errorForm.Sigla?inputCSS+inputError:inputCSS } />
                    {errorForm.Sigla && <p className="mt-1 text-m text-red-400">Este campo es obligatorio</p>}  
            </div>

            <button className="w-full mt-8 bg-teal-600 text-gray-50 font-semibold py-2 px-4 rounded-lg">
                {person.data.id?"Actualizar":"Crear"}
            </button>
        </form>
    </div>
    )
}