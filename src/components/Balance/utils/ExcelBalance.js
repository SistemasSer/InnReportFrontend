import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const ExcelBalance = async ({ Data, TableData, Title }) => {
    function getMonthName(monthNumber) {
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
    }
  
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Balance");

    worksheet.mergeCells("A1:B2");
    worksheet.getCell("A1").value = Title;
  
    worksheet.getCell("A1").style = {
      font: {
        bold: true,
        size: 13, 
      },
      alignment: {
        horizontal: "center",
        vertical: "middle",
      },
    };
  
    if (Array.isArray(Data) && Data.length > 0) {
      const dataItem = Data[0];
      worksheet.getCell("A3").value = `${getMonthName(dataItem.mes)} - ${dataItem.año}`;
      worksheet.getCell("A4").value = `${dataItem.puc_codigo}`;
      worksheet.getCell("A5").value = `${dataItem.pucName}`;
      worksheet.getCell("A6").value = ` `;
    }

    const headerStyle = {
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
    };
  
    const cellStyle = {
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
    };

    worksheet
      .addRow(["NIT", "RAZON SOCIAL", "SIGLA", "SALDO"])
      .eachCell((cell, colNumber) => {
        cell.style = headerStyle;
      });

    TableData.forEach((row) => {
      const newRow = worksheet.addRow([row.nit, row.RazonSocial, row.sigla, row.saldo]);
      newRow.getCell(4).numFmt = '"$"#,##0.00'; 
      newRow.eachCell((cell) => {
        cell.style = cellStyle;
      });
    });
  
    try {
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
    //   saveAs(blob, `excel.xlsx`);
      if (Array.isArray(Data) && Data.length > 0) {
        const dataItem = Data[0];
        saveAs(blob, `Balance_${dataItem.puc_codigo}_${getMonthName(dataItem.mes)} - ${dataItem.año}.xlsx`);
      }
    } catch (error) {
      console.error("Error generating Excel file:", error);
    }
  };