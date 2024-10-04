const apiUrlv1 = process.env.REACT_APP_API_URL_2;

export const BalanceEntidad = async (
  year,
  month,
  pucCodigo,
  pucName,
  newAddedItems
) => {
  const dataToSend = {
    año: parseInt(year),
    mes: parseInt(month),
    pucCodigo: pucCodigo,
    pucName: pucName,
    entidad: newAddedItems,
  };

  var url_balance = "";
  if (newAddedItems.solidaria.length === 0) {
    url_balance = "bal_sup";
  } else {
    url_balance = "bal_coop";
  }

  try {
    const response = await fetch(`${apiUrlv1}/${url_balance}/balance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const results = await response.json();
    // // console.log('Resultados recibidos:', results);
    return results;
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};
