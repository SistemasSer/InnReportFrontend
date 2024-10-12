import { useEffect, useState } from "react";
import React from "react";
import { UserService } from "../../services/user.service";
import { EntidadService } from "../../services/entidad.service";
import { alert, Button, IconButton } from "@material-tailwind/react";
import Swal from "sweetalert2";
import {
  InformationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";

export const Table = (props: any) => {
  const person = props.person;
  const personService = props.personService;
  const dispatch = props.dispatch;
  const fetchData = props.fetchData;
  const header = props.headers;
  const column = props.column;
  const actions = props.actions;
  const info = props.info;
  const deleteButton = props.deleteButton;
  const addButton = props.addButton;
  const entityType = props.entityType;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(person.list);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const userService = new UserService();
  const entidadService = new EntidadService();

  useEffect(() => {
    setFilteredData(person.list);
  }, [person.list]);

  const onClickDelete = (item: any) => {
    Swal.fire({
      title: `¿Quieres eliminar un(a) ${entityType}?`,
      text: `Eliminar ${item[column[1]]}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#252525",
      cancelButtonColor: "#ff1d1d",
      confirmButtonText: "Eliminar Dato",
    }).then((result) => {
      if (result.isConfirmed) {
        if (entityType === "Usuario") {
          // console.log("usuario");
          const fetchDelete = async (item: any) => {
            try {
              await userService.delete(item);

              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1900,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: `${entityType} eliminado con exito!!!`,
              });

              fetchData();
            } catch (error) {
              console.log("Error to failed load ==>", error);
            }
          };

          fetchDelete(item); // Llama a la función para eliminar el usuario
        } else if (entityType === "Entidad") {
          console.log("Entidad");

          const fetchDelete = async (item: any) => {
            console.log(item);
            
            try {
              await entidadService.delete(item);

              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1900,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: `${entityType} eliminado con exito!!!`,
              });

              fetchData();
            } catch (error) {
              console.log("Error to failed load ==>", error);
            }
          };
          fetchDelete(item);
        }
      }
    });
  };

  const onClickInfo = async (item: any) => {
    try {
      const data: any = await personService.getById(item.id!);
      Swal.fire({
        title: "Información",
        icon: "info",
        html:
          `<b>${header[0]}</b> : ${data[column[0]]} <br>` +
          `<b>${header[1]}</b> : ${data[column[1]]} <br>` +
          `<b>${header[2]}</b> : ${data[column[2]]} <br>`,
        //   `<b>${header[3]}</b> : ${data[column[3]]} <br>`,
        showCloseButton: false,
        showCancelButton: false,
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.log("Error ==>", error);
    }
  };

  const { addedItems, setAddedItems } = props;

  const onClickAdd = (item: any) => {
    try {
      const newAddedItems = { ...addedItems };

      if (item.TipoEntidad === 2) {
        newAddedItems.solidaria = [
          ...newAddedItems.solidaria,
          { nit: item.Nit, sigla: item.Sigla, RazonSocial: item.RazonSocial },
        ];
      } else {
        newAddedItems.superfinanciera = [
          ...newAddedItems.superfinanciera,
          { nit: item.Nit, sigla: item.Sigla, RazonSocial: item.RazonSocial },
        ];
      }
      setAddedItems(newAddedItems);
    } catch (error) {
      console.log("Error ==>", error);
    }
  };

  interface EntityItem {
    id: number;
    nit: number;
    sigla?: string;
    RazonSocial?: string;
  }

  const onClickRemove = (item: any) => {
    try {
      const newAddedItems = { ...addedItems };

      if (item.TipoEntidad === 2) {
        newAddedItems.solidaria = newAddedItems.solidaria.filter(
          (entry: EntityItem) => entry.nit !== item.Nit
        );
      } else {
        newAddedItems.superfinanciera = newAddedItems.superfinanciera.filter(
          (entry: EntityItem) => entry.nit !== item.Nit
        );
      }

      setAddedItems(newAddedItems);
    } catch (error) {
      console.log("Error ==>", error);
    }
  };

  useEffect(() => {
    const filtered = person.list.filter((item: any) =>
      Object.values(item).some((value) => {
        if (typeof value === "string" || typeof value === "number") {
          return value
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );

    setFilteredData(filtered);
  }, [searchQuery]);

  const handleInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleItemsPerPageChange = (e: any) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getItemsToDisplay = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  interface Entity {
    id: number;
    nit: number;
    sigla: string;
    RazonSocial: string;
  }

  return (
    <div className="block xl:w-[calc(1100px)] 2xl:w-[calc(970px)] justify-start">
      <div className="flex xl:w-[calc(1100px)] justify-between px-10">
        <div className="relative w-2 min-w-[100px]">
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Registros
          </label>
        </div>
        <div className="flex flex-row relative h-10 float-right">
          <input
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-500"
            placeholder=" "
            value={searchQuery}
            onChange={handleInputChange}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Buscar
          </label>
          {/** 
          <div>
            <form className="flex items-center max-w-sm mx-auto">
              <label id="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search branch name..."
                  required
                />
              </div>
            </form>
          </div>
          <div>
            <form className="flex items-center max-w-sm mx-auto">
              <label id="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search branch name..."
                  required
                />
              </div>
            </form>
          </div>
          <div>
            <form className="flex items-center max-w-sm mx-auto">
              <label id="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search branch name..."
                  required
                />
              </div>
            </form>
          </div>
          <div>
            <form className="flex items-center max-w-sm mx-auto">
              <label id="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search branch name..."
                  required
                />
              </div>
            </form>
          </div>
          <div>
            <form className="flex items-center max-w-sm mx-auto">
              <label id="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search branch name..."
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>*/}
        </div>
      </div>
      <br></br>
      <div className=" xl:w-[calc(1100px)] border-gray-200">
        <table
          id="pdfTable"
          className="w-full divide-y xl:w-[calc(1100px)] divide-gray-200 "
        >
          <thead className="bg-slate-900 rounded-t-5">
            <tr>
              {header.map((column: string) => (
                <th
                  key={column}
                  scope="col"
                  className="px-4 py-3 text-slate-50 font-bold text-left"
                >
                  {column}
                </th>
              ))}
              {actions === true ? (
                <th
                  scope="col"
                  className="px-4 py-3.5 text-slate-50 font-medium text-center"
                >
                  Acciones
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getItemsToDisplay().length === 0 ? (
              <tr>
                <td
                  colSpan={header.length + 1}
                  className="px-4 py-3 text-gray-500 font-extrabold text-center"
                >
                  No se encuentran datos
                </td>
              </tr>
            ) : (
              getItemsToDisplay().map((item: any, i: any) => {
                const isAdded =
                  addedItems.superfinanciera.some(
                    (entity: Entity) => entity.nit === item.Nit
                  ) ||
                  addedItems.solidaria.some(
                    (entity: Entity) => entity.nit === item.Nit
                  );

                return (
                  <tr key={i}>
                    {column.map((column: string) => (
                      <td
                        key={column}
                        className="px-4 py-3 text-left font-medium text-xs"
                      >
                        {item[column]}
                      </td>
                    ))}
                    {actions === true ? (
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-x-6">
                          {info === true ? (
                            <button
                              className="bg-sky-600 text-sky-50 font-semibold py-2 px-4 rounded-lg"
                              onClick={() => onClickInfo(item)}
                            >
                              <InformationCircleIcon className="h-6 w-6 text-gray-50" />
                            </button>
                          ) : null}

                          {/* <button className="bg-gray-600 text-gray-50 font-semibold py-2 px-4 rounded-lg"  onClick={()=>dispatch(setData(item))}>
                                                <PencilSquareIcon className="h-6 w-6 text-gray-50" />
                                                </button> */}

                          {deleteButton === true ? (
                            <button
                              className="bg-red-600 text-gray-50 font-semibold py-2 px-4 rounded-lg"
                              onClick={() => onClickDelete(item)}
                            >
                              <TrashIcon className="h-6 w-6 text-gray-50" />
                            </button>
                          ) : null}
                          {addButton === true ? (
                            <div>
                              {isAdded ? (
                                <button
                                  //className="bg-red-600 text-gray-50 font-semibold py-2 px-4 rounded-lg"
                                  className="bg-green-600 text-gray-50 font-semibold py-2 px-4 rounded-lg"
                                  onClick={() => onClickRemove(item)}
                                >
                                  <MinusIcon className="h-6 w-6 text-gray-50" />
                                </button>
                              ) : (
                                <button
                                  //className="bg-green-600 text-gray-50 font-semibold py-2 px-4 rounded-lg"
                                  className="bg-red-600 text-gray-50 font-semibold py-2 px-4 rounded-lg"
                                  onClick={() => onClickAdd(item)}
                                >
                                  <PlusIcon className="h-6 w-6 text-gray-50" />
                                </button>
                              )}
                            </div>
                          ) : null}
                        </div>
                      </td>
                    ) : null}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Pagina {currentPage} de {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Siguiente
          </Button>
        </div>
      </CardFooter>
    </div>
  );
};
