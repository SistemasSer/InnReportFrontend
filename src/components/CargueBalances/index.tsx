import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../auth/AuthProvider";
import { PucCoopService } from "../../services/pucCoop.service";
import { PucCoopState, setPucCoop } from "../../features/pucCoop/pucCoopSlice";
import { IPucCoop } from "../../interfaces/PucCoop";
import BotonArchivo from "./BotonArchivo";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

const CargueBalance: React.FC = () => {
  const { getUser } = useAuth(); 
  const user = getUser();
  const isStaff = user?.is_staff || false;

  const [isLoading, setIsLoading] = useState(false);
  const [periodo, setPeriodo] = useState<number | null>(null);
  const [mes, setMes] = useState<number | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const apiUrlv1 = process.env.REACT_APP_API_URL_2;
  const dispatch = useDispatch();

  const [extractedData, setExtractedData] = useState<any[]>([]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [yearPart, monthPart] = e.target.value.split("-");
    const parsedPeriodo = parseInt(yearPart, 10);
    const parsedMes = parseInt(monthPart, 10);
    setPeriodo(parsedPeriodo);
    setMes(parsedMes);
    setButtonDisabled(isNaN(parsedPeriodo) || isNaN(parsedMes));
  };

  //FORMATO BANCOS,COMPAÑIAS Y COOPERATIVAS FINANCIERAS
  const extractDataFromExcel = (file: File) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e?.target?.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          });

          let pucRowIndex = null;
          let entityRowIndex = null;

          for (let row = 0; row < 50; row++) {
            if (jsonData[row] && jsonData[row][0] === "100000") {
              pucRowIndex = row;
              //console.log("PUC Row Index found:", pucRowIndex);
              break;
            }
          }

          for (let row = 0; row < 50; row++) {
            if (jsonData[row] && jsonData[row][1] === "Nombre Cuenta") {
              entityRowIndex = row;
              //console.log("Entity Row Index found:", entityRowIndex);
              break;
            }
          }

          if (pucRowIndex === null || entityRowIndex === null) {
            //console.log(`cuenta ${pucRowIndex}`);
            //console.log(`entidad ${entityRowIndex}`);
            Swal.fire({
              icon: "error",
              title: "Formato Incorrecto",
              text: "El formato no es compatible.",
            });
            setIsLoading(false);
            return;
          }

          const extractedData: any[] = [];
          //console.log("Starting data extraction");

          for (let pucIndex = pucRowIndex; pucIndex <= 3854; pucIndex++) {
            if (!jsonData[pucIndex]) continue;
            for (let entityIndex = 2; entityIndex <= 180; entityIndex++) {
              if (
                !jsonData[entityRowIndex] ||
                !jsonData[entityRowIndex][entityIndex]
              )
                continue;
              if (!jsonData[pucIndex][entityIndex]) continue;
              const entidad_RS = jsonData[entityRowIndex][entityIndex];
              const extractedItem = {
                periodo,
                mes,
                entidad_RS,
                puc_codigo: jsonData[pucIndex][0],
                saldo: jsonData[pucIndex][entityIndex],
              };
              extractedData.push(extractedItem);
            }
          }

          resolve(extractedData);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  //FUNCION BOTON BANCOS,COMPAÑIAS Y COOPERATIVAS FINANCIERAS
  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const extractedData: any = await extractDataFromExcel(file);
        console.log("Extracted data:", extractedData);
        setExtractedData(extractedData);
        //const response = await fetch("http://localhost:8000/api/v1/bal_sup", {
        const response = await fetch(`${apiUrlv1}/bal_sup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(extractedData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log("jsonData:", jsonData);
        setPeriodo(null);
        setMes(null);
        setButtonDisabled(true);
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Datos guardados con éxito!",
          text: "La información se subió correctamente.",
        });
      } catch (error) {
        console.error("Error extracting data:", error);
        setPeriodo(null);
        setMes(null);
        setButtonDisabled(true);
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while extracting data from the Excel file.",
        });
      }
    }
  };

  //FORMATO SUPERSOLIDARIA
  const extractDataFromExcelSolidaria = (file: File) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e?.target?.result;
          const workbook = XLSX.read(data, { type: "array" });

          const sheetName = workbook.SheetNames[0];

          const worksheet = workbook.Sheets[sheetName];

          const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          });

          let pucRowIndex = null;
          let entityRowIndex = null;

          for (let row = 0; row < 50; row++) {
            if (jsonData[row] && jsonData[row][0] === "CUENTA") {
              pucRowIndex = row + 2;
              break;
            }
          }

          for (let row = 0; row < 50; row++) {
            if (jsonData[row] && jsonData[row][2] === "NOMBRE ENTIDAD") {
              entityRowIndex = row;
              break;
            }
          }

          if (pucRowIndex === null || entityRowIndex === null) {
            Swal.fire({
              icon: "error",
              title: "Formato Incorrecto",
              text: "El formato no es compatible.",
            });
            setIsLoading(false);
            return;
          }

          const extractedData: any[] = [];

          for (let pucIndex = pucRowIndex; pucIndex <= 3854; pucIndex++) {
            if (!jsonData[pucIndex]) continue;
            for (let entityIndex = 3; entityIndex <= 180; entityIndex++) {
              if (
                !jsonData[entityRowIndex] ||
                !jsonData[entityRowIndex][entityIndex]
              )
                continue;
              if (!jsonData[pucIndex][entityIndex]) continue;
              const extractedItem = {
                periodo,
                mes,
                entidad_RS: jsonData[entityRowIndex][entityIndex],
                puc_codigo: jsonData[pucIndex][0],
                saldo: jsonData[pucIndex][entityIndex],
              };
              extractedData.push(extractedItem);
            }
          }
          setExtractedData(extractedData);
          // console.log(extractedData);
          resolve(extractedData);
        } catch (error) {
          console.error("Error processing file:", error);
          reject(error);
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  //FUNCION BOTON SOLIDARIA
  const handleFileInputChangeSolidaria = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    console.log("File selected:", file);

    if (file) {
      try {
        const extractedData: any = await extractDataFromExcelSolidaria(file);
        console.log("Extracted data:", extractedData);
        const response = await fetch(`${apiUrlv1}/bal_coop`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ extractedData, isStaff }),
        });

        // Leer la respuesta solo una vez
        const responseData = await response.json();

        if (!response.ok) {
          // Utilizar el mensaje de error obtenido de la respuesta
          const errorMessage =
            responseData.errors?.join(", ") || 
            `HTTP error! Status: ${response.status}`;
          console.error(
            `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
          );
          throw new Error(errorMessage);
        }

        console.log("Response JSON data:", responseData);

        setPeriodo(null);
        setMes(null);
        setButtonDisabled(true);
        setIsLoading(false);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          text: "La información se subió correctamente.",
        });
      } catch (error) {
        console.error("Error extracting data or uploading:", error);
        setIsLoading(false);
        setPeriodo(null);
        setMes(null);
        setButtonDisabled(true);
        // Mostrar el mensaje de error específico en la alerta
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          text:
            (error as Error).message ||
            "Revise que el formato sea sobre el cargue de balance",
        });
      }
    }
  };

  return (
    <div className="block mt-0 w-screen px-3 py-3 bg-transparent">
      {isLoading ? (
        <div className="mt-20 flex flex-col justify-center items-center h-[500px]">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-20 h-20 text-gray-400 animate-spin dark:text-gray-600 fill-blue-950"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <div className="mt-10 flex flex-col justify-center items-center">
            <p className="font-bold" style={{ fontSize: 20 }}>
              La extraccion de datos puede tardar uno o varios minutos
              dependiento de la cantidad de elementos.
            </p>
            <p className="mt-6 text-gray-800 font-semibold ">
              Cantidad de datos:{" "}
              <span className="font-bold">{extractedData.length}</span>
            </p>
            <p className="mt-6 text-blue-700 font-semibold">
              Por favor no salga de la pagina hasta que termine el proceso.
            </p>
          </div>
        </div>
      ) : (
        <>
          <p
            className="mt-5 ml-12 font-bold"
            style={{ fontSize: 45, padding: 0 }}
          >
            Cargue de balances{" "}
          </p>

          <hr className="mb-3 mx-10 place-content-baseline bg-gray-800 h-2 rounded-lg" />
          <div className="flex justify-center ">
            <div className="w-[calc(1000px)] my-3 mt-3 mx-24 px-8 py-4 pb-8 bg-gray-400 rounded-lg shadow-[8px_10px_10px_12px_rgba(0,0,0,0.3)]">
              <form className="grid gap-4">
                <div className="mt-4 flex flex-row place-content-between items-center">
                  <div className="flex flex-row items-center">
                    <label
                      className="mb-2 text-gray-700 font-semibold my-2 mr-5 ml-2"
                      style={{ fontSize: 28 }}
                    >
                      Periodo a cargar
                    </label>
                    <div className="w-[calc(250px)]">
                      <input
                        id="date_one"
                        type="month"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleDateChange}
                        placeholder="Selecciona un periodo"
                      />
                    </div>
                  </div>
                  <div>
                    <BotonArchivo />
                  </div>
                </div>
              </form>
              <hr className="my-2 place-content-baseline bg-gray-100 h-px" />
              <div className="flex place-content-around columns-4">
                <div className="pt-8">
                  <label
                    htmlFor="fileInput"
                    className="bg-teal-600 hover:bg-teal-800 text-gray-50 font-semibold py-5 px-3 rounded-lg cursor-pointer"
                  >
                    Bancos
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    accept=".xlsx, .xls"
                    className="hidden"
                    onChange={handleFileInputChange}
                    disabled={buttonDisabled}
                  />
                </div>
                <div className="pt-8">
                  <label
                    htmlFor="fileInput"
                    className="bg-teal-600 hover:bg-teal-800 text-gray-50 font-semibold py-5 px-3 rounded-lg cursor-pointer"
                  >
                    Compañias de financiamiento
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    accept=".xlsx, .xls"
                    className="hidden"
                    onChange={handleFileInputChange}
                    disabled={buttonDisabled}
                  />
                </div>
                <div className="pt-8">
                  <label
                    htmlFor="fileInput"
                    className="bg-teal-600 hover:bg-teal-800 text-gray-50 font-semibold py-5 px-3 rounded-lg cursor-pointer"
                  >
                    Cooperativas financieras
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    accept=".xlsx, .xls"
                    className="hidden"
                    onChange={handleFileInputChange}
                    disabled={buttonDisabled}
                  />
                </div>
                <div className="pt-8">
                  <label
                    htmlFor="fileInput2"
                    className="bg-teal-600 hover:bg-teal-800 text-gray-50 font-semibold py-5 px-3 rounded-lg cursor-pointer"
                  >
                    Super Solidaria
                  </label>
                  <input
                    type="file"
                    id="fileInput2"
                    accept=".xlsx, .xls"
                    className="hidden"
                    onChange={handleFileInputChangeSolidaria}
                    disabled={buttonDisabled}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CargueBalance;
