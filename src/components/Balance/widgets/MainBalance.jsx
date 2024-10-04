import React, { useEffect, useState } from "react";
import { SearchEntidades } from "../widgets/searchEntidades";
import { TableBalance } from "../widgets/TableBalance";

const MainBalance = ({
  TipoEntidad,
  EntidadesOptions,
  EntidadData,
  CodigoOptions,
}) => {
  const [balanceData, setBalanceData] = useState(null);
  return (
    <div className="flex flex-row w-screen max-w-[1300px]">
      <div>
        <SearchEntidades
          entidadTitle={TipoEntidad}
          EntidadSelect={EntidadesOptions}
          CodigoSelect={CodigoOptions}
          EntidadAll={EntidadData}
          setBalanceData={setBalanceData}
        />
      </div>
      <div className="w-11/12 m-1 flex justify-center">
        <TableBalance balanceData={balanceData}/>
      </div>
    </div>
  );
};

export default MainBalance;
