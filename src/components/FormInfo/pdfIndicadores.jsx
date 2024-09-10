import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const PdfIndicadores = async ({ data1, data2, title }) => {
  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const [firstRow] = data1;
  const preentity = firstRow[1];
  const parenthesisIndex = preentity.indexOf("(");

  const entity =
    parenthesisIndex !== -1
      ? preentity.substring(0, parenthesisIndex).trim()
      : preentity;

  const dates = firstRow.slice(1);

  const tableColumns = [
    "Indicadores ",
    ...dates.map((date) => {
      const match = date.match(/\(([^)]+)\)/);
      return match ? match[1] : date;
    }),
  ];

  const tableRows = [];
  const headStyles = { fillColor: [15, 23, 42], cellPadding: 3, fontSize: 9 };
  const styles = { fontSize: 8, cellPadding: 1 };

  data1.forEach((row, index) => {
    if (index === 0) return;

    if (row[0] && !row.slice(1).some((cell) => cell !== null)) {
      tableRows.push([row[0], ...Array(tableColumns.length - 1).fill("")]);
    } else {
      tableRows.push(row);
    }
  });

  const tableRows2 = data2.slice(1);
  tableRows.push(...tableRows2);

  const doc = new jsPDF({
    orientation: "p",
    format: "a4",
  });

  doc.setFontSize(22);
  doc.text(`Informe de ${capitalize(title)}`, 20, 10);
  doc.setFontSize(16);
  doc.text(`${capitalize(entity)}`, 15, 27);

  const highlightNames = [
    "ESTRUCTURA DE BALANCE",
    "ANALISIS CUENTA DE RESULTADOS",
    "CARTERA GENERAL",
    "CONSUMO",
    "MICROCREDITO",
    "COMERCIAL",
    "VIVIENDA",
    "EMPLEADOS",
  ];

  autoTable(doc, {
    head: [tableColumns],
    body: tableRows,
    startY: 30,
    theme: "striped",
    headStyles: { ...headStyles },
    styles: { ...styles, fontSize: 8, cellPadding: 1 },
    didParseCell: (data) => {
      if (highlightNames.includes(data.cell.text[0])) {
        data.cell.styles.fillColor = [178, 178, 179];
        data.cell.styles.textColor = [255, 255, 255];
        data.cell.styles.fontStyle = "bold";

        const numColumns = tableColumns.length;
        for (let i = 1; i < numColumns; i++) {
          if (data.row.cells[i]) {
            data.row.cells[i].styles.fillColor = [178, 178, 179];
            data.row.cells[i].styles.textColor = [255, 255, 255];
          }
        }
      }
    },
  });

  doc.save(`${capitalize(title)}-${capitalize(entity)}.pdf`);
};
