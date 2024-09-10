import React, { useState, useEffect } from "react";
import "./scroll.css";
import { fetchDivisas } from "./ApiConsulta";

const Taza = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const resetLocalStorage = () => {
    localStorage.removeItem("lastFetchedDate");
    localStorage.removeItem("fxData");
  };

  const fetchData = async () => {
    try {
      const result = await fetchDivisas();
      //const result = await fetchDatita();
      //resetLocalStorage()
      setData(result);
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Error fetching the data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(`datos de divisas ${data}`);
  //console.table(data);

  const carruseldatosreales = [...data, ...data];

  return (
    <>
      <div className="h-[67px] border-l-4 border-sky-950 rounded-3xl "></div>
      <div className="overflow-hidden flex flex-row bg-gradient-to-r from-sky-800 from-20% via-sky-600 via-50% to-sky-800 to-80%">
        <div className="flex whitespace-nowrap animate-scroll justify-center items-center h-[67px]  ">
          {carruseldatosreales.map((item, index) => (
            <div
              key={`${index}`}
              className="w-[230px] h-[40px] flex flex-row whitespace-nowrap items-center justify-center gap-2   cursor-pointer font-bold mx-3"
            >
              <h1 className="text-gray-100 text-sm">{item.fromSymbol}</h1>
              <h1 className="text-gray-300 font-semibold text-sm">
                {`$${
                  item.latestClose !== null && item.latestClose !== undefined
                    ? item.latestClose.toFixed(2)
                    : "N/A"
                }`}
              </h1>
              <h1
                className={`${
                  item.percentageChange >= 0
                    ? "text-emerald-300"
                    : "text-[#ff1717]"
                }`}
              >
                {item.percentageChange !== null &&
                item.percentageChange !== undefined
                  ? `${
                      item.percentageChange >= 0
                        ? `▲ ${item.percentageChange.toFixed(2)}%`
                        : `▼ ${item.percentageChange.toFixed(2)}%`
                    }`
                  : "N/A"}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[67px] border-r-4 border-sky-950 rounded-3xl"></div>
    </>
  );
};

export default Taza;
