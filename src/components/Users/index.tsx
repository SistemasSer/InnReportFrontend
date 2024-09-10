import React, { useState, useEffect } from "react";
import { Table } from "../Table";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { UserService } from "../../services/user.service";
import { IUser } from "../../interfaces/User";
import { UserState, setData, setUser } from "../../features/user/userSlice";
import  NewUser  from "./crearUsuario";

function Users() {
  const [createUserOpen, setCreateUserOpen] = useState(false);

  const { user } = useSelector((state: { user: UserState }) => state);

  const userService = new UserService();

  const dispatch = useDispatch();

  const headers = ["ID", "Nombre de Usuario", "Correo Electronico"];

  const column = ["id", "username", "email"];

  const infoButton = false;
  const deleteButton = true;
  const updateButton = false;
  const addButton = false;
  const actions = true;

  const fetchData = async () => {
    try {
      const res: IUser[] = await userService.getAll();
      dispatch(setUser(res));
    } catch (error) {
      console.log("Error to failed load ==>", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const abrirCrearUsuario = () => {
    setCreateUserOpen(true);
  };

  return (
    <div className="block mt-0 w-screen px-3 bg-transparent">
      <p className="mt-5 ml-12 font-bold" style={{ fontSize: 45, padding: 0 }}>
        Usuarios{" "}
      </p>

      <hr className="mb-3 mx-10 place-content-baseline bg-gray-800  h-2 rounded-lg" />
      <div className="flex flex-col justify-start items-center mt-10">
        <div className="pb-3 pl-6 w-full ml-10">
          {/* <Link to="/users/create">
            <button className="bg-teal-600 hover:bg-teal-800 text-gray-50 font-semibold py-2 px-4 rounded-lg">
              Nuevo
            </button>
          </Link> */}
          <button
            type="button"
            className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none "
            onClick={() => abrirCrearUsuario()}
          >
            Nuevo Usuario
          </button>
          <NewUser
            isOpen={createUserOpen}
            closeModal={() => setCreateUserOpen(false)}
          />
        </div>
        <div className="gap-6 w-[calc(1100px)]">
          <Table
            personService={userService}
            person={user}
            dispatch={dispatch}
            fetchData={fetchData}
            headers={headers}
            column={column}
            info={infoButton}
            actions={actions}
            deleteButton={deleteButton}
            updateButton={updateButton}
            addButton={addButton}
            addedItems={{ superfinanciera: [], solidaria: [] }}
            setAddedItems={""}
            entityType="Usuario"
          />
        </div>
      </div>
    </div>
  );
}

export default Users;
