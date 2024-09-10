import React from "react";

import { Table } from "../Table";
import TipoEntidad from "./tipoEntidad";
import BuscarEntidades from "./buscarEntidades";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { IEntidad } from "../../interfaces/Entidad";
import {
  EntidadState,
  setData,
  setEntidad,
} from "../../features/entidad/entidadSlice";
import { EntidadService } from "../../services/entidad.service";
import { ActiveState, setActive } from "../../features/activos/activosSlice";
import { IActive } from "../../interfaces/Active";
import { useNavigate } from "react-router-dom";
import { PdfIndicadores } from "./pdfIndicadores";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const FormInfo = (props: any) => {
  const title = props.title;
  const puc = props.puc;
  const showButton1 = props.showButton1;
  const showButton2 = props.showButton2;

  const navigate = useNavigate();

  const { active } = useSelector((state: { active: ActiveState }) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEntidad, setIsLoadingEntidad] = useState(false);

  const [errorForm, setErrorForm] = useState({
    username: false,
    email: false,
    password: false,
  });

  const inputCSS =
    "block w-full px-1 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ";
  const inputError = "border-red-400";

  const apiUrlv1 = process.env.REACT_APP_API_URL_2;

  const [addedItems, setAddedItems] = useState<AddedItems>({
    solidaria: [],
    superfinanciera: [],
  });

  const clearData = (): AddedItems => ({
    solidaria: [],
    superfinanciera: [],
  });
  const clearStatesDates = () => {
    setDateOne(null);
    setDateTwo(null);
    setDateThree(null);
    setDateFour(null);
    setDateFive(null);
    setDateSix(null);
  };

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

  //limipar buscarentidad
  const [shouldClear, setShouldClear] = useState(false);
  const [selectedTipoEntidadIds, setSelectedTipoEntidadIds] = useState<
    number[]
  >([]);
  const [selectedGremioIds, setSelectedGremioIds] = useState<number[]>([]);
  const [selectedGrupoIds, setSelectedGrupoIds] = useState<number[]>([]);
  const [showTable, setShowTable] = useState(false);

  const handleSelectionChange = (selectedData: {
    tipoEntidad: number[];
    gremio: number[];
    grupo: number[];
  }) => {
    setSelectedTipoEntidadIds(selectedData.tipoEntidad);
    setSelectedGremioIds(selectedData.gremio);
    setSelectedGrupoIds(selectedData.grupo);
  };

  const [dateOne, setDateOne] = useState<{
    periodo: number;
    mes: number;
    puc_codigo: string;
    nit: {
      superfinanciera: number[];
      solidaria: number[];
    };
  } | null>(null);
  const [dateTwo, setDateTwo] = useState<{
    periodo: number;
    mes: number;
    puc_codigo: string;
    nit: {
      superfinanciera: number[];
      solidaria: number[];
    };
  } | null>(null);
  const [dateThree, setDateThree] = useState<{
    periodo: number;
    mes: number;
    puc_codigo: string;
    nit: {
      superfinanciera: number[];
      solidaria: number[];
    };
  } | null>(null);
  const [dateFour, setDateFour] = useState<{
    periodo: number;
    mes: number;
    puc_codigo: string;
    nit: {
      superfinanciera: number[];
      solidaria: number[];
    };
  } | null>(null);
  const [dateFive, setDateFive] = useState<{
    periodo: number;
    mes: number;
    puc_codigo: string;
    nit: {
      superfinanciera: number[];
      solidaria: number[];
    };
  } | null>(null);
  const [dateSix, setDateSix] = useState<{
    periodo: number;
    mes: number;
    puc_codigo: string;
    nit: {
      superfinanciera: number[];
      solidaria: number[];
    };
  } | null>(null);

  const { entidad } = useSelector((state: { entidad: EntidadState }) => state);
  const entidadService = new EntidadService();
  const dispatch = useDispatch();
  const headers = ["Nit", "Razon social", "Sigla"];
  const column = ["Nit", "RazonSocial", "Sigla"];
  const infoButton = false;
  const deleteButton = false;
  const updateButton = false;
  const addButton = true;
  const actions = true;

  const [shouldNavigate, setShouldNavigate] = useState(false);

  interface AddedItems {
    solidaria: Array<{ nit: number; sigla: string; RazonSocial: string }>;
    superfinanciera: Array<{ nit: number; sigla: string; RazonSocial: string }>;
  }

  const fetchData = async (
    tipoEntidadIds: number[],
    gremioIds: number[],
    grupoIds: number[]
  ) => {
    if (
      tipoEntidadIds.length === 0 &&
      gremioIds.length === 0 &&
      selectedGrupoIds.length === 0
    ) {
      return;
    }
    setIsLoadingEntidad(true);
    setShowTable(false);

    try {
      setAddedItems({
        solidaria: [],
        superfinanciera: [],
      });

      const queryString = [
        tipoEntidadIds.length > 0
          ? `TipoEntidad=${tipoEntidadIds.join("&TipoEntidad=")}`
          : "",
        gremioIds.length > 0 ? `Gremio=${gremioIds.join("&Gremio=")}` : "",
        grupoIds.length > 0
          ? `Grupo_Activo=${grupoIds.join("&Grupo_Activo=")}`
          : "",
      ]
        .filter(Boolean)
        .join("&");

      const finalQueryString = queryString ? `?${queryString}` : "";

      const res: IEntidad[] = await entidadService.getAll(finalQueryString);

      const newAddedItems: AddedItems = {
        solidaria: [],
        superfinanciera: [],
      };

      res.forEach((item) => {
        if (item.TipoEntidad === 2) {
          newAddedItems.solidaria.push({
            nit: item.Nit,
            sigla: item.Sigla,
            RazonSocial: item.RazonSocial,
          });
        } else {
          newAddedItems.superfinanciera.push({
            nit: item.Nit,
            sigla: item.Sigla,
            RazonSocial: item.RazonSocial,
          });
        }
      });

      setShowTable(true);
      dispatch(setEntidad(res));
      setAddedItems(newAddedItems);
      setIsLoadingEntidad(false);
      console.log("nuevos items", newAddedItems);
    } catch (error) {
      setIsLoadingEntidad(false);
      console.log("Error ==>", error);
    }
  };

  useEffect(() => {
    if (selectedTipoEntidadIds.length > 0 || selectedGremioIds.length > 0) {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  }, [selectedTipoEntidadIds, selectedGremioIds, selectedGrupoIds]);

  useEffect(() => {
    fetchData(selectedTipoEntidadIds, selectedGremioIds, selectedGrupoIds);
  }, [selectedTipoEntidadIds, selectedGremioIds, selectedGrupoIds]);

  interface DateState {
    periodo: number;
    mes: number;
    puc_codigo: string;
    nit: {
      superfinanciera: number[];
      solidaria: number[];
    };
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [yearPart, monthPart] = e.target.value.split("-");

    const convertAddedItems = (items: AddedItems) => ({
      superfinanciera: items.superfinanciera.map((item) => item.nit),
      solidaria: items.solidaria.map((item) => item.nit),
    });

    const date: DateState = {
      periodo: parseInt(yearPart, 10),
      mes: parseInt(monthPart, 10),
      puc_codigo: puc,
      nit: convertAddedItems(addedItems),
    };

    const { id } = e.target;

    switch (id) {
      case "date_one":
        setDateOne(date);
        break;
      case "date_two":
        setDateTwo(date);
        break;
      case "date_three":
        setDateThree(date);
        break;
      case "date_four":
        setDateFour(date);
        break;
      case "date_five":
        setDateFive(date);
        break;
      case "date_six":
        setDateSix(date);
        break;
    }
  };

  useEffect(() => {
    if (shouldNavigate) {
      navigate("/report", {
        state: {
          active,
          dateOne,
          dateTwo,
          dateThree,
          dateFour,
          dateFive,
          dateSix,
          title,
        },
      });
      setShouldNavigate(false);
    }
  }, [active, shouldNavigate, navigate, dateOne]);

  const handleButtonClick = async () => {
    setIsLoading(true);

    const newNitArray = addedItems;

    const updatedDates = [
      dateOne ? { ...dateOne, nit: newNitArray } : null,
      dateTwo ? { ...dateTwo, nit: newNitArray } : null,
      dateThree ? { ...dateThree, nit: newNitArray } : null,
      dateFour ? { ...dateFour, nit: newNitArray } : null,
      dateFive ? { ...dateFive, nit: newNitArray } : null,
      dateSix ? { ...dateSix, nit: newNitArray } : null,
    ];

    const validDates = updatedDates.filter((date) => date != null);

    if (validDates.length === 0) {
      console.log("No valid dates available.");
      Swal.fire({
        icon: "error",
        title: "Datos invalidos",
        text: "No seleccionaste ninguna fecha",
      });
      setIsLoading(false);
      return;
    }

    const solidariaCount = newNitArray.solidaria.length;
    const superfinancieraCount = newNitArray.superfinanciera.length;

    if (solidariaCount + superfinancieraCount === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ninguna entidad seleccionada",
      });
      setIsLoading(false);

      return;
    }

    //const url_1 = "http://localhost:8000/api/v1/bal_sup_a";
    //const url_2 = "http://localhost:8000/api/v1/bal_coop_a";
    const url_1 = `${apiUrlv1}/bal_sup_a`;
    const url_2 = `${apiUrlv1}/bal_coop_a`;
    const payload = validDates;

    console.log("dataOne: ", JSON.stringify(payload));

    try {
      console.log("Realizando fetch a URL 1:", url_1);
      const response_1 = await fetch(url_1, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Fetch a URL 1 exitoso. Realizando fetch a URL 2:", url_2);
      const response_2 = await fetch(url_2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data_1 = await response_1.json();
      console.log(data_1);
      const data_2 = await response_2.json();
      console.log(data_2);

      const data: IActive[] = Object.values(data_1).concat(
        Object.values(data_2)
      ) as IActive[];
      dispatch(setActive(data));
      setIsLoading(false);
      setShouldNavigate(true);
    } catch (error) {
      console.error("Error making the fetch request:", error);
    }
  };

  interface DataItem {
    Entidad: string;
    entidad_nit: number;
    sigla: string;
    RazonSocial: string;
    periodo: number;
    mes: number;
    indicadorCartera: number;
    indicadorDeposito: number;
    indicadorObligaciones: number;
    indicadorCapSocial: number;
    indicadorCapInst: number;
    indicadorRoe: number;
    indicadorRoa: number;
    indicadorIngCartera: number;
    indicadorCostDeposito: number;
    indicadorCredBanco: number;
    indicadorDisponible: number;
  }

  interface DataItemCartera {
    Entidad: string;
    entidad_nit: number;
    sigla: string;
    periodo: number;
    mes: number;
    totalA: number;
    totalB: number;
    totalC: number;
    totalD: number;
    totalE: number;
    totalTotal: number;
    totalCastigos: number;
    totalIndMora: number;
    totalDeterioro: number;
    totalPorcCobertura: number;
    consumoA: number;
    consumoB: number;
    consumoC: number;
    consumoD: number;
    consumoE: number;
    consumoTotal: number;
    consumoIndMora: number;
    consumoCartImprod: number;
    consumoDeterioro: number;
    consumoPorcCobertura: number;
    microcreditoA: number;
    microcreditoB: number;
    microcreditoC: number;
    microcreditoD: number;
    microcreditoE: number;
    microcreditoTotal: number;
    microcreditoIndMora: number;
    microcreditoCartImprod: number;
    microcreditoDeterioro: number;
    microcreditoPorcCobertura: number;
    comercialA: number;
    comercialB: number;
    comercialC: number;
    comercialD: number;
    comercialE: number;
    comercialTotal: number;
    comercialIndMora: number;
    comercialCartImprod: number;
    comercialDeterioro: number;
    comercialPorcCobertura: number;
    viviendaA: number;
    viviendaB: number;
    viviendaC: number;
    viviendaD: number;
    viviendaE: number;
    viviendaTotal: number;
    viviendaIndMora: number;
    viviendaCartImprod: number;
    viviendaDeterioro: number;
    viviendaPorcCobertura: number;
    empleadosA: number;
    empleadosB: number;
    empleadosC: number;
    empleadosD: number;
    empleadosE: number;
    empleadosTotal: number;
    empleadosIndMora: number;
    empleadosCartImprod: number;
    empleadosDeterioro: number;
    empleadosPorcCobertura: number;
  }

  const formatCurrency = (value: any, locale = "en-US", currency = "USD") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(value);
  };

  const formatIndicatorsCartera = (data: any) => {
    return data.map((item: DataItemCartera) => {
      const {
        Entidad,
        totalA,
        totalB,
        totalC,
        totalD,
        totalE,
        totalTotal,
        totalCastigos,
        totalIndMora,
        totalDeterioro,
        totalPorcCobertura,
        consumoA,
        consumoB,
        consumoC,
        consumoD,
        consumoE,
        consumoTotal,
        consumoIndMora,
        consumoCartImprod,
        consumoDeterioro,
        consumoPorcCobertura,
        microcreditoA,
        microcreditoB,
        microcreditoC,
        microcreditoD,
        microcreditoE,
        microcreditoTotal,
        microcreditoIndMora,
        microcreditoCartImprod,
        microcreditoDeterioro,
        microcreditoPorcCobertura,
        comercialA,
        comercialB,
        comercialC,
        comercialD,
        comercialE,
        comercialTotal,
        comercialIndMora,
        comercialCartImprod,
        comercialDeterioro,
        comercialPorcCobertura,
        viviendaA,
        viviendaB,
        viviendaC,
        viviendaD,
        viviendaE,
        viviendaTotal,
        viviendaIndMora,
        viviendaCartImprod,
        viviendaDeterioro,
        viviendaPorcCobertura,
        empleadosA,
        empleadosB,
        empleadosC,
        empleadosD,
        empleadosE,
        empleadosTotal,
        empleadosIndMora,
        empleadosCartImprod,
        empleadosDeterioro,
        empleadosPorcCobertura,
        ...otherFields
      } = item;

      return {
        "": Entidad,
        "CARTERA GENERAL": "",
        "Calificada en A": formatCurrency(totalA),
        "Calificada en B": formatCurrency(totalB),
        "Calificada en C": formatCurrency(totalC),
        "Calificada en D": formatCurrency(totalD),
        "Calificada en E": formatCurrency(totalE),
        "Total cartera": formatCurrency(totalTotal),
        "Cartera castigada": formatCurrency(totalCastigos),
        "Indicador de calidad de cartera": totalIndMora.toFixed(2) + "%",
        Deterioro: formatCurrency(totalDeterioro),
        "Nivel de cobertura": totalPorcCobertura.toFixed(2) + "%",
        CONSUMO: "",
        "Consumo calificada en A": formatCurrency(consumoA),
        "Consumo calificada en B": formatCurrency(consumoB),
        "Consumo calificada en C": formatCurrency(consumoC),
        "Consumo calificada en D": formatCurrency(consumoD),
        "Consumo calificada en E": formatCurrency(consumoE),
        "Consumo total cartera": formatCurrency(consumoTotal),
        "Consumo indicador calidad de cartera": consumoIndMora.toFixed(2) + "%",
        "Consumo indicador cartera improductiva":
          consumoCartImprod.toFixed(2) + "%",
        "Consumo deterioro": formatCurrency(consumoDeterioro),
        "Consumo porcentaje de cobertura":
          consumoPorcCobertura.toFixed(2) + "%",
        MICROCREDITO: "",
        "Microcredito calificada en A": formatCurrency(microcreditoA),
        "Microcredito calificada en B": formatCurrency(microcreditoB),
        "Microcredito calificada en C": formatCurrency(microcreditoC),
        "Microcredito calificada en D": formatCurrency(microcreditoD),
        "Microcredito calificada en E": formatCurrency(microcreditoE),
        "Microcredito total cartera": formatCurrency(microcreditoTotal),
        "Microcredito indicador calidad de cartera":
          microcreditoIndMora.toFixed(2) + "%",
        "Microcredito indicador cartera improductiva":
          microcreditoCartImprod.toFixed(2) + "%",
        "Microcredito deterioro": formatCurrency(microcreditoDeterioro),
        "Microcredito porcentaje de cobertura":
          microcreditoPorcCobertura.toFixed(2) + "%",
        COMERCIAL: "",
        "Comercial calificada en A": formatCurrency(comercialA),
        "Comercial calificada en B": formatCurrency(comercialB),
        "Comercial calificada en C": formatCurrency(comercialC),
        "Comercial calificada en D": formatCurrency(comercialD),
        "Comercial calificada en E": formatCurrency(comercialE),
        "Comercial total cartera": formatCurrency(comercialTotal),
        "Comercial indicador calidad de cartera":
          comercialIndMora.toFixed(2) + "%",
        "Comercial indicador cartera improductiva":
          comercialCartImprod.toFixed(2) + "%",
        "Comercial deterioro": formatCurrency(comercialDeterioro),
        "Comercial porcentaje de cobertura":
          comercialPorcCobertura.toFixed(2) + "%",
        VIVIENDA: "",
        "Vivienda calificada en A": formatCurrency(viviendaA),
        "Vivienda calificada en B": formatCurrency(viviendaB),
        "Vivienda calificada en C": formatCurrency(viviendaC),
        "Vivienda calificada en D": formatCurrency(viviendaD),
        "Vivienda calificada en E": formatCurrency(viviendaE),
        "Vivienda total cartera": formatCurrency(viviendaTotal),
        "Vivienda indicador calidad de cartera":
          viviendaIndMora.toFixed(2) + "%",
        "Vivienda indicador cartera improductiva":
          viviendaCartImprod.toFixed(2) + "%",
        "Vivienda deterioro": formatCurrency(viviendaDeterioro),
        "Vivienda porcentaje de cobertura":
          viviendaPorcCobertura.toFixed(2) + "%",
        EMPLEADOS: "",
        "Empleados calificada en A": formatCurrency(empleadosA),
        "Empleados calificada en B": formatCurrency(empleadosB),
        "Empleados calificada en C": formatCurrency(empleadosC),
        "Empleados calificada en D": formatCurrency(empleadosD),
        "Empleados calificada en E": formatCurrency(empleadosE),
        "Empleados total cartera": formatCurrency(empleadosTotal),
        "Empleados indicador calidad de cartera":
          empleadosIndMora.toFixed(2) + "%",
        "Empleados indicador cartera improductiva":
          empleadosCartImprod.toFixed(2) + "%",
        "Empleados deterioro": formatCurrency(empleadosDeterioro),
        "Empleados porcentaje de cobertura":
          empleadosPorcCobertura.toFixed(2) + "%",
        ...otherFields,
      };
    });
  };

  const formatIndicatorsToPercentage = (data: any) => {
    return data.map((item: DataItem) => {
      const {
        Entidad,
        indicadorCartera,
        indicadorDeposito,
        indicadorObligaciones,
        indicadorCapSocial,
        indicadorCapInst,
        indicadorRoe,
        indicadorRoa,
        indicadorIngCartera,
        indicadorCostDeposito,
        indicadorCredBanco,
        indicadorDisponible,
        ...otherFields
      } = item;

      return {
        ...otherFields,
        "": Entidad,
        "ESTRUCTURA DE BALANCE": "",
        Disponible: indicadorDisponible.toFixed(2) + "%",
        Cartera: indicadorCartera.toFixed(2) + "%",
        Depositos: indicadorDeposito.toFixed(2) + "%",
        Obligaciones: indicadorObligaciones.toFixed(2) + "%",
        "Capital social - aportes sociales":
          indicadorCapSocial.toFixed(2) + "%",
        "Capital institucional": indicadorCapInst.toFixed(2) + "%",
        "ANALISIS CUENTA DE RESULTADOS": "",
        ROE: indicadorRoe.toFixed(2),
        ROA: indicadorRoa.toFixed(2),
        "Ingresos por cartera": indicadorIngCartera.toFixed(2) + "%",
        "Costos de depositos": indicadorCostDeposito.toFixed(2) + "%",
        "intereses credito banco": indicadorCredBanco.toFixed(2) + "%",
      };
    });
  };

  const handleButtonClick2 = async () => {
    setIsLoading(true);
    const newNitArray = addedItems;

    const updatedDates = [
      dateOne ? { ...dateOne, nit: newNitArray } : null,
      dateTwo ? { ...dateTwo, nit: newNitArray } : null,
      dateThree ? { ...dateThree, nit: newNitArray } : null,
      dateFour ? { ...dateFour, nit: newNitArray } : null,
      dateFive ? { ...dateFive, nit: newNitArray } : null,
      dateSix ? { ...dateSix, nit: newNitArray } : null,
    ];

    const validDates = updatedDates.filter((date) => date != null);

    if (validDates.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Datos Invalidos",
        text: "No seleccionaste ninguna fecha",
      });
      setIsLoading(false);
      return;
    }

    const solidariaCount = newNitArray.solidaria.length;
    const superfinancieraCount = newNitArray.superfinanciera.length;

    if (solidariaCount + superfinancieraCount === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ninguna entidad seleccionada",
      });
      setAddedItems(clearData());
      setIsLoading(false);

      return;
    }

    //const url_3 = "http://localhost:8000/api/v1/bal_sup/indicador_financiero";
    //const url_4 = "http://localhost:8000/api/v1/bal_coop/indicador_financiero";
    //const url_5 = "http://localhost:8000/api/v1/bal_sup/indicador_cartera";
    //const url_6 = "http://localhost:8000/api/v1/bal_coop/indicador_cartera";
    const url_3 = `${apiUrlv1}/bal_sup/indicador_financiero`;
    const url_4 = `${apiUrlv1}/bal_coop/indicador_financiero`;
    const url_5 = `${apiUrlv1}/bal_sup/indicador_cartera`;
    const url_6 = `${apiUrlv1}/bal_coop/indicador_cartera`;
    const payload = validDates;

    try {
      const response_3 = await fetch(url_3, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response_4 = await fetch(url_4, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response_5 = await fetch(url_5, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response_6 = await fetch(url_6, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      type JsonItem = Record<string, any>;

      const data_3: JsonItem[] = await response_3.json();
      const data_4: JsonItem[] = await response_4.json();
      const data_5: JsonItem[] = await response_5.json();
      const data_6: JsonItem[] = await response_6.json();

      const data_financiero: IActive[] = Object.values(data_3).concat(
        Object.values(data_4)
      ) as IActive[];
      const data_cartera: IActive[] = Object.values(data_5).concat(
        Object.values(data_6)
      ) as IActive[];

      const modifiedData = data_financiero.map((item) => {
        const Entidad = `${item.sigla} (${getMonthName(item.mes)} - ${
          item.periodo
        })`;
        const newItem: Record<string, any> = { Entidad };
        Object.keys(item)
          .slice(4)
          .forEach((key) => {
            newItem[key] = item[key];
          });

        return newItem;
      });

      const modifiedData2 = data_cartera.map((item) => {
        const Entidad = `${item.sigla} (${getMonthName(item.mes)} - ${
          item.periodo
        })`;
        const newItem: Record<string, any> = { Entidad };
        Object.keys(item)
          .slice(4)
          .forEach((key) => {
            newItem[key] = item[key];
          });

        return newItem;
      });

      const formattedData = formatIndicatorsToPercentage(modifiedData);
      const formattedData2 = formatIndicatorsCartera(modifiedData2);

      const keys2 = Object.keys(formattedData2[0] || {});
      const transposedData2: (string | number | null)[][] = [];

      keys2.forEach((key) => {
        const row = [key];
        formattedData2.forEach((obj: JsonItem) => {
          row.push(obj[key] || null);
        });
        transposedData2.push(row);
      });

      const keys = Object.keys(formattedData[0] || {});
      const transposedData: (string | number | null)[][] = [];

      keys.forEach((key) => {
        const row = [key];
        formattedData.forEach((obj: JsonItem) => {
          row.push(obj[key] || null);
        });
        transposedData.push(row);
      });

      const workbook = new ExcelJS.Workbook();
      const ws = workbook.addWorksheet("Financiero");
      const worksheet2 = workbook.addWorksheet("Cartera");

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

      const titleStyle: ExcelJS.Style = {
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "417ed7" },
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
          bottom: { style: "thin", color: { argb: "191919" } },
        },
        numFmt: "General",
        protection: {},
      };

      const financialTitles = [
        "ESTRUCTURA DE BALANCE",
        "ANALISIS CUENTA DE RESULTADOS",
      ];
      const carteraTitles = [
        "CARTERA GENERAL",
        "CONSUMO",
        "MICROCREDITO",
        "COMERCIAL",
        "VIVIENDA",
        "EMPLEADOS",
      ];

      const applyStylesAndMerge = (
        worksheet: ExcelJS.Worksheet,
        transposedData: (string | number | null)[][],
        titles: string[]
      ) => {
        transposedData.forEach((row, rowIndex) => {
          const excelRow = worksheet.addRow(row);
          excelRow.eachCell((cell, colNumber) => {
            if (rowIndex === 0) {
              cell.style = headerStyle;
            } else if (titles.includes(row[0] as string)) {
              cell.style = titleStyle;
              if (colNumber === 1) {
                worksheet.mergeCells(
                  rowIndex + 1,
                  colNumber,
                  rowIndex + 1,
                  row.length
                );
              }
            } else {
              cell.style = cellStyle;
            }
          });
        });
      };

      applyStylesAndMerge(ws, transposedData, financialTitles);
      applyStylesAndMerge(worksheet2, transposedData2, carteraTitles);

      const COL_WIDTH = 20;
      ws.columns = ws.columns.map((col) => ({ ...col, width: COL_WIDTH }));
      worksheet2.columns = worksheet2.columns.map((col) => ({
        ...col,
        width: COL_WIDTH,
      }));

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Indicadores.xlsx");
      setShowTable(false)
      clearStatesDates()
      setShouldClear(true);
      setAddedItems(clearData());
      setIsLoading(false);
      setTimeout(() => setShouldClear(false), 0);
    } catch (error) {
      console.error("Error making the fetch request:", error);
      setShouldClear(true);
      setAddedItems(clearData());
      setIsLoading(false);
      setTimeout(() => setShouldClear(false), 0);
    }
  };

  const handlePdfIndicador = async () => {
    setIsLoading(true);
    const newNitArray = addedItems;

    const solidariaCount = newNitArray.solidaria.length;
    const superfinancieraCount = newNitArray.superfinanciera.length;

    if (solidariaCount + superfinancieraCount === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ninguna entidad seleccionada",
      });
      //setShouldClear(true);
      setAddedItems(clearData());
      setIsLoading(false);
      //setTimeout(() => setShouldClear(false), 0);
      return;
    } else if (solidariaCount + superfinancieraCount !== 1) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Solo se permite generar un informe PDF para una entidad a la vez",
      });
      //setShouldClear(true);
      setAddedItems(clearData());
      setIsLoading(false);
      //setTimeout(() => setShouldClear(false), 0);
      return;
    }

    const updatedDates = [
      dateOne ? { ...dateOne, nit: newNitArray } : null,
      dateTwo ? { ...dateTwo, nit: newNitArray } : null,
      dateThree ? { ...dateThree, nit: newNitArray } : null,
      dateFour ? { ...dateFour, nit: newNitArray } : null,
      dateFive ? { ...dateFive, nit: newNitArray } : null,
      dateSix ? { ...dateSix, nit: newNitArray } : null,
    ];

    const validDates = updatedDates.filter((date) => date != null);

    if (validDates.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Sin fechas seleccionadas",
      });
      setIsLoading(false);
      return;
    }

    //const url_3 = "http://localhost:8000/api/v1/bal_sup/indicador_financiero";
    //const url_4 = "http://localhost:8000/api/v1/bal_coop/indicador_financiero";
    //const url_5 = "http://localhost:8000/api/v1/bal_sup/indicador_cartera";
    //const url_6 = "http://localhost:8000/api/v1/bal_coop/indicador_cartera";
    const url_3 = `${apiUrlv1}/bal_sup/indicador_financiero`;
    const url_4 = `${apiUrlv1}/bal_coop/indicador_financiero`;
    const url_5 = `${apiUrlv1}/bal_sup/indicador_cartera`;
    const url_6 = `${apiUrlv1}/bal_coop/indicador_cartera`;
    const payload = validDates;

    try {
      const response_3 = await fetch(url_3, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response_4 = await fetch(url_4, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response_5 = await fetch(url_5, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response_6 = await fetch(url_6, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      type JsonItem = Record<string, any>;

      const data_3: JsonItem[] = await response_3.json();
      const data_4: JsonItem[] = await response_4.json();
      const data_5: JsonItem[] = await response_5.json();
      const data_6: JsonItem[] = await response_6.json();

      const data_financiero: IActive[] = Object.values(data_3).concat(
        Object.values(data_4)
      ) as IActive[];
      const data_cartera: IActive[] = Object.values(data_5).concat(
        Object.values(data_6)
      ) as IActive[];

      const modifiedData = data_financiero.map((item) => {
        const Entidad = `${item.sigla} (${getMonthName(item.mes)} - ${
          item.periodo
        })`;
        const newItem: Record<string, any> = { Entidad };
        Object.keys(item)
          .slice(4)
          .forEach((key) => {
            newItem[key] = item[key];
          });

        return newItem;
      });

      const modifiedData2 = data_cartera.map((item) => {
        const Entidad = `${item.sigla} (${getMonthName(item.mes)} - ${
          item.periodo
        })`;
        const newItem: Record<string, any> = { Entidad };
        Object.keys(item)
          .slice(4)
          .forEach((key) => {
            newItem[key] = item[key];
          });

        return newItem;
      });

      const formattedData = formatIndicatorsToPercentage(modifiedData);
      const formattedData2 = formatIndicatorsCartera(modifiedData2);

      const keys2 = Object.keys(formattedData2[0] || {});
      const transposedData2: (string | number | null)[][] = [];

      keys2.forEach((key) => {
        const row = [key];
        formattedData2.forEach((obj: JsonItem) => {
          row.push(obj[key] || null);
        });
        transposedData2.push(row);
      });

      const keys = Object.keys(formattedData[0] || {});
      const transposedData: (string | number | null)[][] = [];

      keys.forEach((key) => {
        const row = [key];
        formattedData.forEach((obj: JsonItem) => {
          row.push(obj[key] || null);
        });
        transposedData.push(row);
      });

      PdfIndicadores({ data1: transposedData, data2: transposedData2, title });

      setShowTable(false)
      setShouldClear(true);
      clearStatesDates()
      setAddedItems(clearData());
      setIsLoading(false);
      setTimeout(() => setShouldClear(false), 0);
    } catch (error) {
      console.error("Error making the fetch request:", error);
      setShouldClear(true);
      setAddedItems(clearData());
      setIsLoading(false);
      setTimeout(() => setShouldClear(false), 0);
    }
  };

  useEffect(() => {}, [
    dateOne,
    dateTwo,
    dateThree,
    dateFour,
    dateFive,
    dateSix,
    active,
  ]);

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  const handleNewItems = (newItems: any) => {
    setAddedItems((prevItems) => ({
      solidaria: [...prevItems.solidaria, ...newItems.solidaria],
      superfinanciera: [
        ...prevItems.superfinanciera,
        ...newItems.superfinanciera,
      ],
    }));
  };

  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div className="block mt-0 w-screen px-3 py-3 bg-transparent">
      {isLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-20 h-20 text-gray-400 animate-spin dark:text-gray-600 fill-blue-950"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <p
            className="mt-5 ml-12 font-bold"
            style={{ fontSize: 45, padding: 0 }}
          >
            Informe de {title}{" "}
          </p>

          <hr className="mb-3 mx-10 place-content-baseline bg-gray-800 h-2 rounded-lg" />
          <div className="flex flex-col justify-center items-center">
            <div className="gap-3 w-[calc(1200px)] pr-20 pb-7">
              <div className="px-8 py-3 pb-6 mt-6 bg-gray-400 rounded-lg shadow-[8px_10px_10px_12px_rgba(0,0,0,0.3)]">
                <form className="grid grid-cols-6 gap-4">
                  <div className="mt-4">
                    <label className="mb-2 text-gray-800 font-bold">
                      Periodo 1
                    </label>
                    <input
                      id="date_one"
                      type="month"
                      placeholder="Selecciona un periodo"
                      onChange={handleDateChange}
                      className={
                        errorForm.username ? inputCSS + inputError : inputCSS
                      }
                    />
                    {errorForm.username && (
                      <p className="mt-1 text-m text-red-400">
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="mb-2  text-gray-800 font-bold">
                      Periodo 2
                    </label>
                    <input
                      id="date_two"
                      type="month"
                      placeholder="Selecciona un periodo"
                      disabled={!dateOne}
                      onChange={handleDateChange}
                      className={
                        errorForm.email ? inputCSS + inputError : inputCSS
                      }
                    />
                    {errorForm.email && (
                      <p className="mt-1 text-m text-red-400">
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="mb-2  text-gray-800 font-bold">
                      Periodo 3
                    </label>
                    <input
                      id="date_three"
                      type="month"
                      disabled={!dateTwo}
                      placeholder="Selecciona un periodo"
                      onChange={handleDateChange}
                      className={
                        errorForm.password ? inputCSS + inputError : inputCSS
                      }
                    />
                    {errorForm.password && (
                      <p className="mt-1 text-m text-red-400 ">
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="mb-2 text-gray-800 font-bold">
                      Periodo 4
                    </label>
                    <input
                      id="date_four"
                      type="month"
                      disabled={!dateThree}
                      placeholder="Selecciona un periodo"
                      onChange={handleDateChange}
                      className={
                        errorForm.username ? inputCSS + inputError : inputCSS
                      }
                    />
                    {errorForm.username && (
                      <p className="mt-1 text-m text-red-400">
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="mb-2  text-gray-800 font-bold">
                      Periodo 5
                    </label>
                    <input
                      id="date_five"
                      type="month"
                      disabled={!dateFour}
                      placeholder="Selecciona un periodo"
                      onChange={handleDateChange}
                      className={
                        errorForm.email ? inputCSS + inputError : inputCSS
                      }
                    />
                    {errorForm.email && (
                      <p className="mt-1 text-m text-red-400">
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="mb-2  text-gray-800 font-bold">
                      Periodo 6
                    </label>
                    <input
                      id="date_six"
                      type="month"
                      disabled={!dateFive}
                      placeholder="Selecciona un periodo"
                      onChange={handleDateChange}
                      className={
                        errorForm.password ? inputCSS + inputError : inputCSS
                      }
                    />
                    {errorForm.password && (
                      <p className="mt-1 text-m text-red-400">
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-row w-9/12 justify-end">
              <div className="border-b border-gray-200 dark:border-neutral-700">
                <nav
                  className="-mb-0.5 flex justify-end space-x-6"
                  aria-label="Tabs"
                  role="tablist"
                  aria-orientation="horizontal"
                >
                  <button
                    type="button"
                    className={`hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-950 focus:outline-none focus:text-blue-950 ${
                      activeTab === "tab1"
                        ? "font-bold border-blue-600 text-blue-600"
                        : ""
                    }`}
                    onClick={() => handleTabChange("tab1")}
                    aria-selected={activeTab === "tab1"}
                    role="tab"
                  >
                    Entidades
                  </button>
                  <button
                    type="button"
                    className={`hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-950 focus:outline-none focus:text-blue-950 ${
                      activeTab === "tab2"
                        ? "font-bold border-blue-600 text-blue-6  00"
                        : ""
                    }`}
                    onClick={() => handleTabChange("tab2")}
                    aria-selected={activeTab === "tab2"}
                    role="tab"
                  >
                    Tipo Entidad
                  </button>
                </nav>
              </div>
            </div>

            <div className="gap-3 w-[calc(1200px)] pr-20 pb-7 flex justify-center">
              {isLoadingEntidad ? (
                <div className="flex justify-center items-center h-[200px]">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-20 h-20 text-gray-400 animate-spin dark:text-gray-600 fill-blue-950"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  {activeTab === "tab1" && (
                    <div id="horizontal-right-alignment-1" role="tabpanel">
                      <BuscarEntidades
                        onItemsAdded={handleNewItems}
                        shouldClear={shouldClear}
                      />
                    </div>
                  )}
                  {activeTab === "tab2" && (
                    <div id="horizontal-right-alignment-2" role="tabpanel">
                      <TipoEntidad onSelectionChange={handleSelectionChange} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-start items-center mt-10">
            <div className="flex justify-end pb-3 pl-6 w-10/12 ml-10">
              {showButton1 && (
                <button
                  onClick={handleButtonClick}
                  className="bg-teal-600 hover:bg-teal-800 text-gray-50 font-semibold py-2 px-4 rounded-lg cursor-pointer"
                >
                  Generar
                </button>
              )}
              {showButton2 && (
                <div className="flex flex-row-reverse placeholder:">
                  <button
                    onClick={handleButtonClick2}
                    className="bg-teal-600 hover:bg-teal-800 text-gray-50 font-semibold py-2 px-4 mx-3 rounded-lg cursor-pointer"
                  >
                    Exportar Excel
                  </button>
                  <button
                    onClick={handlePdfIndicador}
                    className="bg-red-600 hover:bg-red-800 text-gray-50 font-semibold py-2 px-4 rounded-lg cursor-pointer"
                  >
                    Exportar PDF
                  </button>
                </div>
              )}
            </div>

            <div className="gap-6">
              {showTable && (
                <Table
                  personService={entidadService}
                  person={entidad}
                  dispatch={dispatch}
                  fetchData={fetchData}
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
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FormInfo;
