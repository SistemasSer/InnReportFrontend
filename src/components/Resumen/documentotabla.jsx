import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import Swal from "sweetalert2";
import {
  PencilSquareIcon,
  DocumentArrowDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { fetchDocumentos } from "./apidocumento";
import { downloadDocument } from "./apiDescargarDocumento";
import Informemodal from "./informemodal";
import EditarDocumento from "./editarDocumento";
import DeleteDoc from "./borrarDocumento";


const Documentotabla = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [informeOpen, setInformeOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const itemsPerPage = 6;
  const apiUrlv1 = process.env.REACT_APP_API_URL_2;

  const { getUser, setUser } = useAuth();
  const user = getUser();

  const userData = [user?.is_staff];


  const loadDocumentos = async () => {
    try {
      const data = await fetchDocumentos();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch documentos:", error);
    }
  };

  useEffect(() => {
    loadDocumentos();
  }, []);

  const handleModalClose = () => {
    setInformeOpen(false);
    setDeleteOpen(false);
    const loadDocumentos = async () => {
      try {
        const data = await fetchDocumentos();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch documentos:", error);
      }
    };

    loadDocumentos();
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getFilteredItems = () => {
    return items.filter((item) =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const sortItemsByDate = (items) => {
    return items.sort((a, b) => {
      const dateA = new Date(a.fecha);
      const dateB = new Date(b.fecha);
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const getPageItems = () => {
    const filteredItems = getFilteredItems();
    const sortedItems = sortItemsByDate(filteredItems);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedItems.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(getFilteredItems().length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = [];
  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 2);
    i++
  ) {
    pageNumbers.push(i);
  }

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };


    const handleDownload = async (item) => {
      if (!item?.id || !item?.nombre) return;
  
      try {
        await downloadDocument(item.id, item.nombre);
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 1900,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: (`Documento ${item.nombre} descargado con éxito.`)
        });
      } catch (error) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 1900,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: (error.message || "Error al descargar el documento.")
        });
      }
    }

  const abririnforme = () => {
    setInformeOpen(true);
  };

  const abrirEditarDoc = (item) => {
    setSelectedItem(item);
    setEditOpen(true);
  };

  const abrirDeleteDoc = (item) => {
    setSelectedItem(item);
    setDeleteOpen(true);
  };

  return (
    <div>
      <div className="w-full flex place-content-end">
        <button
          className={`h-10 w-35 px-4 m-4 text-white font-bold rounded-lg border-2 border-blue-800 bg-blue-950 hover:bg-white hover:text-blue-950 ease-in duration-300 ${
            !user.is_staff ? "hidden" : "block"
          }`}
          onClick={abririnforme}
        >
          Informe
        </button>
      </div>
      <Informemodal
        isOpen={informeOpen}
        closeModal={() => setInformeOpen(false)}
        onSuccess={handleModalClose}
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-col bg-gray-300">
          <div className="overflow-x-auto min-h-[410px] ">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table id="default-table" className="min-w-full">
                  <thead className="bg-blue-950  border-b border-gray-200 dark:border-neutral-700">
                    <tr>
                      <th
                        scope="col"
                        className="w-2/4 py-1 group text-start font-normal focus:outline-none"
                      >
                        <div className="py-1 pl-3 inline-flex items-center border border-transparent font-bold text-base text-white rounded-md hover:border-gray-200 dark:text-neutral-500 dark:hover:border-neutral-700">
                          Nombre del documento
                        </div>
                        <div className="relative max-w-xs pl-4">
                          <label
                            htmlFor="BuscarDocumento"
                            className="sr-only"
                          ></label>
                          <input
                            type="text"
                            name="BuscarDocumento"
                            id="BuscarDocumento"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="py-2 px-3  ps-9 m-1 block w-4/5 h-[calc(30px)]  shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500  disabled:opacity-50 disabled:pointer-events-none bg-neutral-600 border-neutral-700 text-neutral-100 placeholder-neutral-100 focus:ring-neutral-600"
                            placeholder="Documento"
                          />
                          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none pl-6">
                            <svg
                              className="size-4  text-gray-100 dark:text-neutral-500"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="11" cy="11" r="8"></circle>
                              <path d="m21 21-4.3-4.3"></path>
                            </svg>
                          </div>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="py-1 group text-center font-normal focus:outline-none"
                      >
                        <div
                          className="py-1 px-2.5 inline-flex items-center border border-transparent font-bold text-base text-white rounded-md hover:border-gray-200 dark:text-neutral-500 dark:hover:border-neutral-700"
                          onClick={toggleSortDirection}
                        >
                          Fecha
                          <svg
                            className="size-3.5 ms-1 -me-0.5 text-white dark:text-neutral-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path
                              className={`hs-datatable-ordering-asc:text-blue-600 dark:hs-datatable-ordering-asc:text-blue-500 ${
                                sortDirection === "asc"
                                  ? "text-blue-600"
                                  : "text-blue-900"
                              }`}
                              d="m7 15 5 5 5-5"
                            ></path>
                            <path
                              className={`hs-datatable-ordering-desc:text-blue-600 dark:hs-datatable-ordering-desc:text-blue-500 ${
                                sortDirection === "desc"
                                  ? "text-blue-600"
                                  : "text-blue-900"
                              }`}
                              d="m7 9 5-5 5 5"
                            ></path>
                          </svg>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="w-28 bg-blue-800 py-2 px-3 text-center font-bold text-base text-white --exclude-from-ordering dark:text-neutral-500"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {getPageItems().map((item, index) => (
                      <tr key={index}>
                        <td className="p-3 pl-8 whitespace-nowrap bg-gray-500 text-sm font-medium text-gray-100 dark:text-neutral-200 border-y-2 border-gray-900">
                          {item.nombre}
                        </td>
                        <td className="p-3 whitespace-nowrap bg-gray-500 text-center text-sm font-medium text-gray-100 dark:text-neutral-200 border-y-2 border-gray-900">
                          {item.fecha}
                        </td>
                        <td
                          className={`${
                            !user.is_staff
                              ? "justify-center"
                              : "place-content-between"
                          } flex  p-3 whitespace-nowrap bg-gray-400 text-sm font-medium text-gray-100  dark:text-neutral-200 border-y-2 border-gray-800 gap-1`}
                        >
                          <button
                            type="button"
                            className={`w-8 h-8 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm  focus:outline-none flex justify-center items-center ${
                              !user.is_staff ? "hidden" : "block"
                            }`}
                            onClick={() => abrirDeleteDoc(item)}
                          >
                            <TrashIcon className="h-5 w-5 text-gray-100" />
                          </button>
                          <button
                            type="button"
                            className={`w-8 h-8 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm  focus:outline-none flex justify-center items-center hidden`}
                            onClick={() => abrirEditarDoc(item)}
                          >
                            <PencilSquareIcon className="h-5 w-5 text-gray-100" />
                          </button>

                          <button
                            type="button"
                            className="w-8 h-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  focus:outline-none flex justify-center items-center" 
                            onClick={() => handleDownload(item)}
                          >
                            <DocumentArrowDownIcon className="h-5 w-5 text-gray-100" />
                          </button>
                        </td>
                        <DeleteDoc
                          isOpen={deleteOpen}
                          closeModal={() => setDeleteOpen(false)}
                          item={selectedItem}
                          onSuccess={handleModalClose}
                        />
                        <EditarDocumento
                          isOpen={editOpen}
                          closeModal={() => setEditOpen(false)}
                          item={selectedItem}
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center mt-3">
          <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-8 text-sm">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Anterior</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </button>
              </li>
              {pageNumbers.map((number) => (
                <li key={number}>
                  <button
                    onClick={() => handlePageChange(number)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                      number === currentPage
                        ? "z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  >
                    {number}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Siguiente</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Documentotabla;
