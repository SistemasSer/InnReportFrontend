import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Logito from "../../assets/Innreport 2-2.png";

export const PdfInforme = ({ data, title, imgDataChart }) => {
  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function getMonthName(monthNumber) {
    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return monthNames[monthNumber - 1];
  }

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

  doc.setFontSize(26);
  doc.text("Informe de " + capitalize(title), 14, 16);

  const lineMargin = 20;
  const lineY = imageY + imageHeight + 10;
  doc.setLineWidth(0.5);
  doc.setDrawColor(255, 255, 255);
  doc.line(lineMargin, lineY, pageWidth - lineMargin, lineY);

  const maxColumns = Math.min(data[0].saldos.length, 6);
  const tableColumn = ["Entidad"];

  for (let i = 0; i < maxColumns; i++) {
    const mes = data[0].saldos[i].mes;
    const periodo = data[0].saldos[i].periodo;
    tableColumn.push(`${getMonthName(mes)}-${periodo}`);
  }

  const tableRows = [];
  data.forEach((item) => {
    const saldoValues = item.saldos.slice(0, maxColumns).map((saldo) => saldo.saldo);
    const rowData = [item.sigla, ...saldoValues];
    tableRows.push(rowData);
  });

  const dataLength = data.length;
  autoTable(doc, {
    columnStyles: { europe: { halign: "center" } },
    head: [tableColumn],
    body: tableRows,
    startY: lineY + 5,
    theme: "striped",
    headStyles: { fillColor: [15, 23, 42] },
    styles: { fontSize: 8 }
  });

  if (dataLength > 20) {
    doc.addPage();

    try {
      doc.addImage(Logito, "PNG", imageX, imageY, imageWidth, imageHeight);
    } catch (error) {
      console.error("Error adding logo image to new page:", error);
    }

    doc.setFontSize(26);
    doc.text("Informe de " + capitalize(title), 14, 16);

    doc.setLineWidth(0.5);
    doc.setDrawColor(255, 255, 255);
    doc.line(lineMargin, lineY, pageWidth - lineMargin, lineY);
  }

  if (imgDataChart) {
    const finalY = dataLength > 20 ? 25 : doc.previousAutoTable.finalY + 10;
    doc.addImage(imgDataChart, "PNG", 10, finalY, 190, 120);
  }

  doc.save(`informe_de_${capitalize(title)}.pdf`);
};
