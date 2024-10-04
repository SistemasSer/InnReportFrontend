import React, { useRef } from "react";
import { Table } from "../Table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
} from "recharts";

import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PucSupService } from "../../services/pucSup.service";
import { PucSupState, setPucSup } from "../../features/pucSup/pucSupSlice";
import { IPucSup } from "../../interfaces/PucSup";

import { ActiveService } from "../../services/active.service";
import { ActiveState, setActive } from "../../features/activos/activosSlice";
import { IActive } from "../../interfaces/Active";

import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { List } from "reselect/es/types";
import { PdfInforme } from "./pdfInforme";

function Report() {
  const activeService = new ActiveService();

  const dispatch = useDispatch();

  const infoButton = false;
  const deleteButton = false;
  const updateButton = false;
  const addButton = false;
  const actions = false;

  const location = useLocation();
  const {
    data,
    active,
    dateOne,
    dateTwo,
    dateThree,
    dateFour,
    dateFive,
    dateSix,
    title,
  } = location.state || {};

  const [addedItems, setAddedItems] = useState({
    superfinanciera: [],
    solidaria: [],
  });

  const generateBlueColor = (value: number): string => {
    const hue = 200 + ((value * 5) % 40);
    const saturation = 100;
    const lightness = 50;
    return hslToHex(hue, saturation, lightness);
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const getColor = (value: number): string => {
    if (value === 0) return "#1C0EB0";
    else if (value === 1) return "#0E34B0";
    else if (value === 2) return "#0E9BB0";
    else if (value === 3) return "#520EB0";
    else if (value === 4) return "#415CB5";
    else if (value === 5) return "#106DB0";
    else if (value >= 6) {
      return generateBlueColor(value);
    }
    return "#000000";
  };

  const fetchData = async () => {
    try {
      // console.log("active info: ", active);
      // console.log("data info: ", data);
      // console.log('dateOne info: ',combinedDate)

      // const res: IActive[] = await activeService.post([
      //     {
      //         "periodo": 2021,
      //         "mes": 1,
      //         "puc_codigo": "100000",
      //         "nit": [800037800,860043186,860002964,860007738,860024414,860034313,890300279,890903937,890200756,860051135]
      //     }

      // ]);
      // dispatch(setActive(res))
    } catch (error) {
      console.log("Error to failed load ==>", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  interface SaldoItem {
    mes: number;
    periodo: number;
    saldo: number;
  }

  interface ListItem {
    entidad_RS: string;
    puc_codigo: string;
    saldos: SaldoItem[];
  }

  interface Data {
    data: "";
    list: ListItem[];
  }

  let headers = ["Entidad"];
  let combinedDate1 = "";
  let combinedDate2 = "";
  let combinedDate3 = "";
  let combinedDate4 = "";
  let combinedDate5 = "";
  let combinedDate6 = "";
  let column = ["sigla"];

  const getMonthName = (monthNumber: number) => {
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
  if (dateOne) {
    combinedDate1 = `${dateOne.periodo}-${getMonthName(dateOne.mes)}`;
    headers = ["Entidad", combinedDate1];
    column = ["sigla", "saldoOne"];
  }

  if (dateTwo) {
    combinedDate1 = `${dateOne.periodo}-${getMonthName(dateOne.mes)}`;
    combinedDate2 = `${dateTwo.periodo}-${getMonthName(dateTwo.mes)}`;
    headers = ["Entidad", combinedDate1, combinedDate2];
    column = ["sigla", "saldoOne", "saldoTwo"];
  }

  if (dateThree) {
    combinedDate1 = `${dateOne.periodo}-${getMonthName(dateOne.mes)}`;
    combinedDate2 = `${dateTwo.periodo}-${getMonthName(dateTwo.mes)}`;
    combinedDate3 = `${dateThree.periodo}-${getMonthName(dateThree.mes)}`;
    headers = ["Entidad", combinedDate1, combinedDate2, combinedDate3];
    column = ["sigla", "saldoOne", "saldoTwo", "saldoThree"];
  }

  if (dateFour) {
    combinedDate1 = `${dateOne.periodo}-${getMonthName(dateOne.mes)}`;
    combinedDate2 = `${dateTwo.periodo}-${getMonthName(dateTwo.mes)}`;
    combinedDate3 = `${dateThree.periodo}-${getMonthName(dateThree.mes)}`;
    combinedDate4 = `${dateFour.periodo}-${getMonthName(dateFour.mes)}`;
    headers = [
      "Entidad",
      combinedDate1,
      combinedDate2,
      combinedDate3,
      combinedDate4,
    ];
    column = ["sigla", "saldoOne", "saldoTwo", "saldoThree", "saldoFour"];
  }

  if (dateFive) {
    combinedDate1 = `${dateOne.periodo}-${getMonthName(dateOne.mes)}`;
    combinedDate2 = `${dateTwo.periodo}-${getMonthName(dateTwo.mes)}`;
    combinedDate3 = `${dateThree.periodo}-${getMonthName(dateThree.mes)}`;
    combinedDate4 = `${dateFour.periodo}-${getMonthName(dateFour.mes)}`;
    combinedDate5 = `${dateFive.periodo}-${getMonthName(dateFive.mes)}`;
    headers = [
      "Entidad",
      combinedDate1,
      combinedDate2,
      combinedDate3,
      combinedDate4,
      combinedDate5,
    ];
    column = [
      "sigla",
      "saldoOne",
      "saldoTwo",
      "saldoThree",
      "saldoFour",
      "saldoFive",
    ];
  }

  if (dateSix) {
    combinedDate1 = `${dateOne.periodo}-${getMonthName(dateOne.mes)}`;
    combinedDate2 = `${dateTwo.periodo}-${getMonthName(dateTwo.mes)}`;
    combinedDate3 = `${dateThree.periodo}-${getMonthName(dateThree.mes)}`;
    combinedDate4 = `${dateFour.periodo}-${getMonthName(dateFour.mes)}`;
    combinedDate5 = `${dateFive.periodo}-${getMonthName(dateFive.mes)}`;
    combinedDate6 = `${dateSix.periodo}-${getMonthName(dateSix.mes)}`;
    headers = [
      "Entidad",
      combinedDate1,
      combinedDate2,
      combinedDate3,
      combinedDate4,
      combinedDate5,
      combinedDate6,
    ];
    column = [
      "sigla",
      "saldoOne",
      "saldoTwo",
      "saldoThree",
      "saldoFour",
      "saldoFive",
      "saldoSix",
    ];
  }
  // console.log(data);
  

  const transformData = (
    data: Data,
    combinedDate1: any,
    combinedDate2: any,
    combinedDate3: any,
    combinedDate4: any,
    combinedDate5: any,
    combinedDate6: any
  ) => {
    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const transformedList = data.list.map((item: ListItem) => {
      let saldoOne = 0;
      let saldoTwo = 0;
      let saldoThree = 0;
      let saldoFour = 0;
      let saldoFive = 0;
      let saldoSix = 0;
      item.saldos.forEach((saldoItem: SaldoItem) => {
        const formattedDate = `${saldoItem.periodo}-${getMonthName(
          saldoItem.mes
        )}`;

        if (formattedDate === combinedDate1) saldoOne = saldoItem.saldo;
        else if (formattedDate === combinedDate2) saldoTwo = saldoItem.saldo;
        else if (formattedDate === combinedDate3) saldoThree = saldoItem.saldo;
        else if (formattedDate === combinedDate4) saldoFour = saldoItem.saldo;
        else if (formattedDate === combinedDate5) saldoFive = saldoItem.saldo;
        else if (formattedDate === combinedDate6) saldoSix = saldoItem.saldo;
      });

      return {
        ...item,
        saldoOne: currencyFormatter.format(saldoOne),
        saldoTwo: currencyFormatter.format(saldoTwo),
        saldoThree: currencyFormatter.format(saldoThree),
        saldoFour: currencyFormatter.format(saldoFour),
        saldoFive: currencyFormatter.format(saldoFive),
        saldoSix: currencyFormatter.format(saldoSix),
      };
    });
    return {
      ...data,
      list: transformedList,
    };
  };

  // console.log("transformData");
  // console.log(transformData);
  

  const newData = transformData(
    active,
    combinedDate1,
    combinedDate2,
    combinedDate3,
    combinedDate4,
    combinedDate5,
    combinedDate6
  );

  // console.log("transform: ", newData);

  const handleFileInputChange = (e: any) => {
    Swal.fire({
      icon: "success",
      title: "Los datos fueron cargados correctamente",
    });
  };
  // console.log("newData");
  // console.log(newData);
  
  const barChartData = newData;

  interface BarChartItem {
    saldos: [];
    entidad_RS: string;
    sigla: string;
    RazonSocial: string;
    puc_codigo: string;
    saldoOne: string;
    saldoTwo: string;
    saldoThree: string;
    saldoFour: string;
    saldoFive: string;
    saldoSix: string;
  }

  const prepareChartData = (barChartData: any) => {
    return barChartData.map((item: BarChartItem) => ({
      ...item,
      saldos: item.saldos,
      sigla: item.sigla.toString(),
      RazonSocial: parseFloat(item.RazonSocial),
      saldoOne: parseFloat(item.saldoOne.replace(/[\$,]/g, "")),
      saldoTwo: parseFloat(item.saldoTwo.replace(/[\$,]/g, "")),
      saldoThree: parseFloat(item.saldoThree.replace(/[\$,]/g, "")),
      saldoFour: parseFloat(item.saldoFour.replace(/[\$,]/g, "")),
      saldoFive: parseFloat(item.saldoFive.replace(/[\$,]/g, "")),
      saldoSix: parseFloat(item.saldoSix.replace(/[\$,]/g, "")),
    }));
  };
  // console.log("barChartData.list");
  // console.log(barChartData.list);
  

  const formattedChartData = prepareChartData(barChartData.list);

  const formatYAxisTick = (value: any) => {
    if (value >= 1000000) {
      return `$${value / 1000000}MM`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}m`;
    } else {
      return value.toString();
    }
  };

  const tableRef = useRef(null);

  const exportPDF = async () => {
    const inputChart = document.getElementById("graficos");
    if (inputChart) {
      const canvasChart = await html2canvas(inputChart);
      const imgDataChart = canvasChart.toDataURL("image/png");
      // console.log("formattedChartData");   
      // console.log(formattedChartData);   
      PdfInforme({ data: formattedChartData, title, imgDataChart });
    } else {
      console.error("Element 'graficos' not found");
    }
  };

  interface Saldo {
    periodo: number;
    mes: number;
    saldo: number;
  }

  interface ListItem {
    razon_social: string;
    sigla: string;
    puc_codigo: string;
    saldos: Saldo[];
    saldoOne: string;
    saldoTwo: string;
    saldoThree: string;
    saldoFour: string;
    saldoFive: string;
    saldoSix: string;
  }

  interface Data {
    list: ListItem[];
  }

  function eliminarEntidad(array: string[]): string[] {
    const index = array.indexOf("Entidad");
    if (index !== -1) {
      array.splice(index, 1);
    }
    return array;
  }

  const exportToExcel = async (data: Data, fileName: string) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Informe_PUC");

    const headerStyle: ExcelJS.Style = {
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "1c4c96" },
      },
      font: {
        bold: true,
        color: { argb: "FFFFFF" },
      },
      alignment: {
        horizontal: "center",
        vertical: "middle",
      },
      border: {
        bottom: { style: "thin", color: { argb: "#191919" } },
      },
      numFmt: "General",
      protection: {},
    };

    const cellStyle: ExcelJS.Style = {
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "cadffb" },
      },
      font: {
        color: { argb: "191919" },
      },
      alignment: {
        horizontal: "right",
        vertical: "middle",
      },
      border: {
        bottom: { style: "thin", color: { argb: "191919" } },
      },
      numFmt: "General",
      protection: {},
    };

    const headers = ["razon_social", "sigla"];
    data.list[0].saldos.forEach((saldo) => {
      headers.push(`${getMonthName(saldo.mes)}-${saldo.periodo}`);
    });

    worksheet
      .addRow(headers)
      .eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.style = headerStyle;
      });

    data.list.forEach((item) => {
      const row: { [key: string]: string } = {
        razon_social: item.razon_social,
        sigla: item.sigla,
      };

      item.saldos.forEach((saldo) => {
        const key = `${getMonthName(saldo.mes)}-${saldo.periodo}`;
        row[key] = `$${saldo.saldo.toFixed(2)}`;
      });

      worksheet
        .addRow(Object.values(row))
        .eachCell({ includeEmpty: true }, (cell, colNumber) => {
          cell.style = cellStyle;
        });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${fileName}.xlsx`);
  };

  const handleExportToExcel = () => {
    exportToExcel(newData, `Informe de ${title} (${eliminarEntidad(headers)})`);
  };

  const [selectedChart, setSelectedChart] = useState("bar");
  const chartKeys = [
    "saldoOne",
    "saldoTwo",
    "saldoThree",
    "saldoFour",
    "saldoFive",
    "saldoSix",
  ];


  // console.log(`ChartData`);
  // console.log(formattedChartData);
  // console.log(`ChartKey `);
  // console.log(chartKeys);

  return (
    <div className="block mt-0 w-screen px-3 py-3 bg-transparent">
      <p className="mt-5 ml-12 font-bold" style={{ fontSize: 45, padding: 0 }}>
        Información {title}
      </p>

      <hr className="mb-3 mx-10 place-content-baseline bg-gray-800 h-2 rounded-lg" />
      <div className="mt-5 ml-12" style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={exportPDF}
          className="bg-red-600 hover:bg-red-800"
          style={{
            color: "white",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Exportar a PDF
        </button>
        <button
          onClick={handleExportToExcel}
          className="bg-green-600 hover:bg-green-800"
          style={{
            color: "white",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Exportar a Excel
        </button>
      </div>

      <div className="pb-6 pl-6 pt-6 relative flex flex-col justify-center items-center">
        {/* <button onClick={exportPDF}>Export to PDF</button>
        <button onClick={handleExportToExcel}>Export to excel</button> */}

        <div ref={tableRef} className="gap-6 w-[calc(1200px)]">
          <Table
            personService={activeService}
            person={newData}
            dispatch={dispatch}
            fetchData={""}
            headers={headers}
            column={column}
            actions={actions}
            info={infoButton}
            deleteButton={deleteButton}
            updateButton={updateButton}
            addButton={addButton}
            addedItems={addedItems}
            setAddedItems={setAddedItems}
          />
        </div>
        <div id="pdfChart" className="pb-6 relative">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "left",
              gap: "10px", // Spacing between buttons
              marginBottom: "20px", // Spacing between the button group and the chart
            }}
          >
            <button
              onClick={() => setSelectedChart("bar")}
              style={{
                backgroundColor: "#0C2D48",
                color: "white",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
            >
              Diagrama de barras
            </button>
            <button
              onClick={() => setSelectedChart("line")}
              style={{
                backgroundColor: "#0C2D48",
                color: "white",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
            >
              Diagrama de lineas
            </button>
            <button
              onClick={() => setSelectedChart("pie")}
              style={{
                backgroundColor: "#0C2D48",
                color: "white",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
            >
              Diagrama de torta
            </button>
          </div>
          <div id="graficos">
            {selectedChart === "bar" && (
              <BarChart
                width={1000}
                height={500}
                data={formattedChartData}
                margin={{ top: 20, left: 50, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sigla" />
                <YAxis tickFormatter={formatYAxisTick} />
                <Tooltip
                  formatter={(value, name, props) => {
                    const numericValue =
                      typeof value === "string"
                        ? parseFloat(value)
                        : typeof value === "number"
                        ? value
                        : 0;
                    const formattedValue = new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(numericValue);
                    return [formattedValue, name];
                  }}
                />

                <Legend />

                <Bar dataKey="saldoOne" name={combinedDate1} fill={getColor(0)}>
                  {formattedChartData.map(
                    (entry: BarChartItem, index: number) => (
                      <Cell key={`cell-${index}`} fill={getColor(0)} />
                    )
                  )}
                </Bar>

                {column.includes("saldoTwo") && (
                  <Bar
                    dataKey="saldoTwo"
                    name={combinedDate2}
                    fill={getColor(1)}
                  >
                    {formattedChartData.map(
                      (entry: BarChartItem, index: number) => (
                        <Cell key={`cell-${index}`} fill={getColor(1)} />
                      )
                    )}
                  </Bar>
                )}
                {column.includes("saldoThree") && (
                  <Bar
                    dataKey="saldoThree"
                    name={combinedDate3}
                    fill={getColor(2)}
                  >
                    {formattedChartData.map(
                      (entry: BarChartItem, index: number) => (
                        <Cell key={`cell-${index}`} fill={getColor(2)} />
                      )
                    )}
                  </Bar>
                )}
                {column.includes("saldoFour") && (
                  <Bar
                    dataKey="saldoFour"
                    name={combinedDate4}
                    fill={getColor(3)}
                  >
                    {formattedChartData.map(
                      (entry: BarChartItem, index: number) => (
                        <Cell key={`cell-${index}`} fill={getColor(3)} />
                      )
                    )}
                  </Bar>
                )}
                {column.includes("saldoFive") && (
                  <Bar
                    dataKey="saldoFive"
                    name={combinedDate5}
                    fill={getColor(4)}
                  >
                    {formattedChartData.map(
                      (entry: BarChartItem, index: number) => (
                        <Cell key={`cell-${index}`} fill={getColor(4)} />
                      )
                    )}
                  </Bar>
                )}
                {column.includes("saldoSix") && (
                  <Bar
                    dataKey="saldoSix"
                    name={combinedDate6}
                    fill={getColor(5)}
                  >
                    {formattedChartData.map(
                      (entry: BarChartItem, index: number) => (
                        <Cell key={`cell-${index}`} fill={getColor(5)} />
                      )
                    )}
                  </Bar>
                )}
              </BarChart>
            )}

            {selectedChart === "line" && (
              <LineChart
                width={1000}
                height={500}
                data={formattedChartData}
                margin={{ top: 20, left: 50, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sigla" />
                <YAxis tickFormatter={formatYAxisTick} />
                <Tooltip />
                <Legend />

                {column.includes("saldoOne") && (
                  <Line
                    type="monotone"
                    dataKey="saldoOne"
                    name={combinedDate1}
                    stroke={getColor(0)}
                  />
                )}
                {column.includes("saldoTwo") && (
                  <Line
                    type="monotone"
                    dataKey="saldoTwo"
                    name={combinedDate2}
                    stroke={getColor(1)}
                  />
                )}
                {column.includes("saldoThree") && (
                  <Line
                    type="monotone"
                    dataKey="saldoThree"
                    name={combinedDate3}
                    stroke={getColor(2)}
                  />
                )}
                {column.includes("saldoFour") && (
                  <Line
                    type="monotone"
                    dataKey="saldoFour"
                    name={combinedDate4}
                    stroke={getColor(3)}
                  />
                )}
                {column.includes("saldoFive") && (
                  <Line
                    type="monotone"
                    dataKey="saldoFive"
                    name={combinedDate5}
                    stroke={getColor(4)}
                  />
                )}
                {column.includes("saldoSix") && (
                  <Line
                    type="monotone"
                    dataKey="saldoSix"
                    name={combinedDate6}
                    stroke={getColor(5)}
                  />
                )}
              </LineChart>
            )}

            {selectedChart === "pie" && (
              <div className="max-w-[calc(1200px)] flex flex-wrap">
                {chartKeys.map((key, index) => (
                  <div key={key} className="w-full md:w-1/2 p-2">
                    <PieChart width={600} height={400}>
                      <Tooltip
                        formatter={(value, name, props) => {
                          const numericValue =
                            typeof value === "string"
                              ? parseFloat(value)
                              : typeof value === "number"
                              ? value
                              : 0;
                          const formattedValue = new Intl.NumberFormat(
                            "en-US",
                            {
                              style: "currency",
                              currency: "USD",
                            }
                          ).format(numericValue);
                          return [formattedValue, name];
                        }}
                      />
                      <Pie
                        data={formattedChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent, sigla }) =>
                          `${sigla}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey={key}
                        legendType="wye"
                      >
                        {formattedChartData.map(
                          (entry: any, entryIndex: any) => (
                            <Cell
                              key={`cell-${entryIndex}`}
                              fill={getColor(entryIndex)}
                            />
                          )
                        )}
                      </Pie>
                    </PieChart>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
