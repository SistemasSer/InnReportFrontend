import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Logito from "../../../assets/Innreport 2-2.png";

export const PdfBalance = ({ Data, TableData, Title }) => {  

  function getMonthName(monthNumber) {
    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return monthNames[monthNumber - 1];
  }

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  };

  const formatCurrency = (value) => {
    return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const doc = new jsPDF();
  const margin = 14;
  const imageWidth = 50;
  const imageHeight = 12;
  const pageWidth = doc.internal.pageSize.getWidth();
  const imageX = pageWidth - margin - imageWidth;
  const imageY = 7;

  try {
    doc.addImage(Logito, "PNG", imageX, imageY, imageWidth, imageHeight);
  } catch (error) {
    console.error("Error adding logo image:", error);
  }

  if (Array.isArray(Data) && Data.length > 0) {
    const dataItem = Data[0];

    doc.setFontSize(26);
    doc.text(Title, 14, 16);

    doc.setFontSize(20);
    doc.text(`${getMonthName(dataItem.mes)} - ${dataItem.año}`, 15, 30);

    const maxLength = 55;
    const truncatedPucName = truncateText(dataItem.pucName, maxLength);

    doc.setFontSize(14);
    doc.text(`${dataItem.puc_codigo} - ${truncatedPucName}`, 15, 45);
  } else {
    console.error("Data is empty or not an array");
  }

  const tableColumn = ["NIT", "RAZON SOCIAL", "SIGLA", "SALDO"];

  const tableRows = TableData.map(item => [
    item.nit,
    item.RazonSocial,
    item.sigla,
    formatCurrency(item.saldo)
  ]);

  const columnStyles = {
    0: { halign: "center" }, // NIT
    1: { halign: "center" }, // RAZON SOCIAL
    2: { halign: "center" }, // SIGLA
    3: { halign: "right" }  // SALDO
  };
  
  const headStyles = { 
    fillColor: [15, 23, 42], 
    halign: "center" 
  };
  

  autoTable(doc, {
    columnStyles,
    head: [tableColumn],
    body: tableRows,
    startY: 50,
    theme: "striped",
    headStyles,
    styles: { fontSize: 10 }
  });

  // doc.save(`Balance_${dataItem.puc_codigo}_${getMonthName(dataItem.mes)} - ${dataItem.año}.pdf`);

  if (Array.isArray(Data) && Data.length > 0) {
    const dataItem = Data[0];
    doc.save(`Balance_${dataItem.puc_codigo}_${getMonthName(dataItem.mes)} - ${dataItem.año}.pdf`);
  }
};