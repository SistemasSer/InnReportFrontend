//api-key
const apikeydemo = "demo";
const apikey = "3T408UWJLOA36LRD";

//consulta materia prima
const fetchRawMaterial = async (functionName) => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=${functionName}&interval=monthly&apikey=${apikeydemo}`
    );
    if (!response.ok)
      throw new Error(`${functionName} Network response was not ok`);

    const data = await response.json();
    //console.log(`Fetched data for ${functionName}:`, data);
    
    
    return data;
  } catch (error) {
    // console.error(`Error fetching ${functionName}:`, error);
    throw error;
  }
};

const rawMaterialData = (data) => {
  if (!data.data || !Array.isArray(data.data)) {
    //console.error("Data is missing or has an incorrect format:", data);
    return { latestClose: null, previousClose: null, percentageChange: null };
  }

  const prices = data.data;
  const dates = prices
    .map((entry) => entry.date)
    .sort((a, b) => new Date(b) - new Date(a));
  const [latestDate, previousDate] = dates;

  const latestClose = latestDate
    ? parseFloat(prices.find((entry) => entry.date === latestDate).value)
    : null;
  const previousClose = previousDate
    ? parseFloat(prices.find((entry) => entry.date === previousDate).value)
    : null;

  const percentageChange = previousClose
    ? ((latestClose - previousClose) / previousClose) * 100
    : null;

  //console.log("Processed raw material data:", {latestClose,previousClose,percentageChange,});

  return {
    latestClose,
    previousClose,
    percentageChange,
  };
};
//consulta cambio de divisa
const fetchFxData = async (fromSymbol, toSymbol) => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&apikey=${apikey}`
    );
    if (!response.ok)
      throw new Error(`FX Network response for ${fromSymbol}/${toSymbol} was not ok`);

    const data = await response.json();
    // console.log(`Fetched FX data for ${fromSymbol}/${toSymbol}:`, data);
    // console.log(data);
    return data;
  } catch (error) {
    //console.error(`Error fetching FX data for ${fromSymbol}/${toSymbol}:`, error);
    throw error;
  }
};


const processFxData = (data) => {
  const { "Meta Data": fxMetaData, "Time Series FX (Monthly)": fxTimeSeries } = data;
  if (!fxMetaData || !fxTimeSeries) {
    return { latestClose: null, previousClose: null, percentageChange: null };
  }

  const { "2. From Symbol": fromSymbol, "3. To Symbol": toSymbol } = fxMetaData;
  const fxDates = Object.keys(fxTimeSeries).sort(
    (a, b) => new Date(b) - new Date(a)
  );
  const [latestFxDate, previousFxDate] = fxDates;

  const latestFxClose = latestFxDate
    ? parseFloat(fxTimeSeries[latestFxDate]["4. close"])
    : null;
  const previousFxClose = previousFxDate
    ? parseFloat(fxTimeSeries[previousFxDate]["4. close"])
    : null;

  const percentageChange = previousFxClose
    ? ((latestFxClose - previousFxClose) / previousFxClose) * 100
    : null;

  return {
    fromSymbol,
    toSymbol,
    latestClose: latestFxClose,
    previousClose: previousFxClose,
    percentageChange,
  };
};

//fetch
export const fetchDivisas = async () => {
  const now = new Date();
  const lastFetched = localStorage.getItem("lastFetchedDate");
  const storedData = localStorage.getItem("fxData");

  if (
    lastFetched &&
    new Date(lastFetched).toDateString() === now.toDateString() &&
    storedData
  ) {
    //console.log("Returning stored data.");
    return JSON.parse(storedData);
  }

  try {
    // FX Data for multiple pairs
    const fxPairs = [
      //{ from: "EUR", to: "USD" },
      { from: "EUR", to: "COP" },
      { from: "USD", to: "COP" },
      { from: "MXN", to: "COP" },
      { from: "VEF", to: "COP" },
    ];

    const fxDataPromises = fxPairs.map((pair) =>
      fetchFxData(pair.from, pair.to)
    );
    const fxDataResults = await Promise.all(fxDataPromises);

    const combinedData = fxDataResults.map((data, index) => {
      return processFxData(data);
    });

    // Fetch additional data
    const oilData = await fetchRawMaterial("WTI");
    const oilResults = rawMaterialData(oilData);

    const oilBrentData = await fetchRawMaterial("BRENT");
    const oilBrentResults = rawMaterialData(oilBrentData);

    const cottonData = await fetchRawMaterial("COTTON");
    const cottonResults = rawMaterialData(cottonData);

    const sugarData = await fetchRawMaterial("SUGAR");
    const sugarResults = rawMaterialData(sugarData);

    const cafeData = await fetchRawMaterial("COFFEE");
    const cafeResults = rawMaterialData(cafeData);

    combinedData.push(
      { fromSymbol: "Petroleo WTI", ...oilResults },
      { fromSymbol: "Petroleo BRENT", ...oilBrentResults },
      { fromSymbol: "Algodón", ...cottonResults },
      { fromSymbol: "Azúcar", ...sugarResults },
      { fromSymbol: "Café", ...cafeResults }
    );

    //console.log("Combined Data:", combinedData);

    localStorage.setItem("fxData", JSON.stringify(combinedData));
    localStorage.setItem("lastFetchedDate", now.toISOString());
    

    return combinedData;
  } catch (error) {
    //console.error("Error fetching the data:", error);
    throw error;
  }
};
