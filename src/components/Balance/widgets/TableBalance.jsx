import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { BalanceEntidad } from "../utils/BalanceEntidad";
import { PdfBalance } from "../utils/PdfBalance";
import { ExcelBalance } from "../utils/ExcelBalance";
import { grid } from "ldrs";

export const TableBalance = ({ balanceData }) => {
  const [responseData, setResponseData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(balanceData);

  useEffect(() => {
    const fetchData = async () => {
     
      if (balanceData) {
        setIsLoading(true);
        const { año, mes, pucCodigo, pucName, entidad } = balanceData;
        const response = await BalanceEntidad(
          año,
          mes,
          pucCodigo,
          pucName,
          entidad
        );
        if (response) {
          setResponseData(response)
          setTableData(response[0]?.entidades || []);
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [balanceData]);

  const getMonthName = (monthNumber) => {
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return monthNames[monthNumber - 1];
  };

  const formatCurrency = (value) => {
    return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const handleExportPdf = () => {
    const { entidad } = balanceData;

    var titlePdf = "";
    if (entidad.solidaria.length === 0) {
      titlePdf = "Balance Puc Super Financiera";
    } else {
      titlePdf = "Balance Puc Cooperativas";
    }
    PdfBalance({Data:responseData, TableData:tableData, Title:titlePdf})
  };

  const handleExportExcel = () => {
    const { entidad } = balanceData;

    var titlePdf = "";
    if (entidad.solidaria.length === 0) {
      titlePdf = "Balance Puc Super Financiera";
    } else {
      titlePdf = "Balance Puc Cooperativas";
    }
    ExcelBalance({Data:responseData, TableData:tableData, Title:titlePdf})
  };

  if (!balanceData) {
    return null;
  }

  console.log(tableData);
  
  grid.register();

  return (
    <>
      {isLoading ? (
        <div className="h-[400px] flex justify-center items-center">
          <l-grid
            size="120"
            speed="1.5" 
            color="black" 
          ></l-grid>
        </div>
      ) : (
        <div className="ml-4">
          <div>
            <h2 class="text-4xl font-extrabold dark:text-white">
              {balanceData?.pucName || "cargando"}
            </h2>
            <div className="w-full flex items-center place-content-between">
              <h2 class="text-2xl font-extrabold">
                {getMonthName(balanceData?.mes) || "cargando"} -{" "}
                {balanceData?.año || "cargando"}
              </h2>

              <div className=" flex flex-row justify-end gap-2 my-2 mr-5">
                <button
                  type="button"
                  className="w-9 h-9 flex justify-center items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg"
                  onClick={handleExportPdf}
                >
                  <FontAwesomeIcon
                    icon={faFilePdf}
                    size="lg"
                    style={{ color: "#ffffff" }}
                  />
                </button>
                <button
                  type="button"
                  className="w-9 h-9 flex justify-center items-center focus:outline-none text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg"
                  onClick={handleExportExcel}
                >
                  <FontAwesomeIcon
                    icon={faFileExcel}
                    size="lg"
                    style={{ color: "#ffffff" }}
                  />
                </button>
              </div>
            </div>
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-400">
              <thead class="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Nit
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Razon Social
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Sigla
                  </th>
                  <th scope="col" class="px-6 py-3 ">
                    Saldo
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b bg-gray-800 border-gray-700 hover:bg-gray-500"
                  >
                    <td className="px-6 py-4 text-white">{item.nit}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-white"
                    >
                      {item.RazonSocial}
                    </th>
                    <td className="px-6 py-4 text-white capitalize">
                      {item.sigla}
                    </td>
                    <td className="px-6 py-4 text-white  text-right ">
                      {formatCurrency(item.saldo)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
