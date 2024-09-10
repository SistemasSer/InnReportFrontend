import React from "react";
import { Table } from "../Table";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { PucCoopService } from "../../services/pucCoop.service";
import { IPucCoop } from "../../interfaces/PucCoop";
import { PucCoopState, setPucCoop } from "../../features/pucCoop/pucCoopSlice";

import XLSX from "xlsx";
import Swal from "sweetalert2";

function PucCoop() {
  const { pucCoop } = useSelector((state: { pucCoop: PucCoopState }) => state);

  const pucCoopService = new PucCoopService();

  const dispatch = useDispatch();

  const headers = ["Cuenta", "Descripcion"];

  const column = ["Codigo", "Descripcion"];

  const infoButton = false;
  const deleteButton = false;
  const updateButton = false;
  const addButton = false;
  const actions = false;

  const fetchData = async () => {
    try {
      const res: IPucCoop[] = await pucCoopService.getAll();
      dispatch(setPucCoop(res));
    } catch (error) {
      console.log("Error to failed load ==>", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleFileInputChange = (e: any) => {
    Swal.fire({
      icon: "success",
      title: "Los datos fueron cargados correctamente",
    });
    // const file = e.target.files[0];

    // if (file) {
    //   const reader = new FileReader();

    //   reader.onload = (e) => {
    //     const data = e.target.result;
    //     const workbook = XLSX.read(data, { type: 'array' });

    //     // Assuming the first sheet is the one you want to parse.
    //     const sheetName = workbook.SheetNames[0];
    //     const worksheet = workbook.Sheets[sheetName];

    //     // Parse the sheet data (adjust as needed).
    //     const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

    //     // Do something with jsonData, e.g., save it to state.
    //     console.log('Imported data:', jsonData);
    //   };

    //   reader.readAsArrayBuffer(file);
    // }
  };

  return (
    <div className="block mt-0 w-screen px-3 py-3 bg-transparent">
      <p className="mt-5 ml-12 font-bold" style={{ fontSize: 45, padding: 0 }}>
        Puc Supersolidaria{" "}
      </p>

      <hr className="mb-3 mx-10 place-content-baseline bg-gray-800  h-2 rounded-lg" />
      <div className="flex flex-col justify-start items-center mt-10">
        <div className="pb-6 pl-6 relative w-full ml-10">
          <label
            htmlFor="fileInput"
            className="hidden bg-teal-600 hover:bg-teal-800 text-gray-50 font-semibold py-2 px-4 rounded-lg cursor-pointer"
          >
            {/* <img
              src="/pngwing.com-2.png" // Replace with the path to your Excel logo image
              alt="Excel Logo"
              className="w-6 h-6 absolute"
            /> */}
            Importar
          </label>

          <input
            type="file"
            id="fileInput"
            accept=".xlsx, .xls"
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>

        <div className="gap-6 w-[calc(1100px)]">
          <Table
            personService={pucCoopService}
            person={pucCoop}
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
          />
        </div>
      </div>
    </div>
  );
}

export default PucCoop;
