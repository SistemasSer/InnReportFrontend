import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../auth/AuthProvider";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Perfil from "../components/Navbar/Perfil/index";
import Sidebar from "../components/Sidebar";
import Entidad from "../components/Entidad";
import CreateEntidad from "../components/Entidad/create";
import Users from "../components/Users";
import UsersCreate from "../components/Users/create";
import PucCoop from "../components/PucCoop";
import PucSup from "../components/PucSup";
import Clientes from "../components/Clientes";
import CreateClientes from "../components/Clientes/create";
import CargueBalances from "../components/CargueBalances";
import FormInfo from "../components/FormInfo";
import Deposito from "../components/Deposito";
import Activo from "../components/Activo";
import Report from "../components/FormInfo/info";
import Home from "../components/Home";
import Login from "../components/Login";
import CapitalSocial from "../components/CapitalSocial";
import Cartera from "../components/Cartera";
import Costo from "../components/Costo";
import Resumen from "../components/Resumen";
import BalanceCoop from "../components/Balance/pages/BalanceCoop";
import BalanceSup from "../components/Balance/pages/BalanceSup";
import Disponible from "../components/Disponible";
import Excedente from "../components/Excedente";
import Ingreso from "../components/Ingreso";
import Interes from "../components/Interes";
import Obligacion from "../components/Obligaciones";
import Reserva from "../components/Reserva";
import IFinanciero from "../components/IndicadorFinanciero";
import ICartera from "../components/IndicadorCartera";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import ProtectedRoute from "../routes/ProtectedRoute";

function MainLayout() {
  const location = useLocation();
  const showNavAndFooter = location.pathname !== "/login";

  return (
    <>
      {showNavAndFooter && <Navbar />} {/* Conditionally render Navbar */}
      <div className={`flex ${showNavAndFooter ? "mt-12" : ""} max-h-[89vh]`}>
        {showNavAndFooter && <Sidebar />} {/* Conditionally render Sidebar */}
        <main className="bg-white w-screen h-screen flex overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>

            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>

            <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>}/>

            <Route path="/users/create" element={<ProtectedRoute><UsersCreate /></ProtectedRoute>}/>

            <Route path="/entidad"element={<ProtectedRoute><Entidad /></ProtectedRoute>}/>

            <Route path="/entidad/create"element={<ProtectedRoute><CreateEntidad /></ProtectedRoute>}/>

            <Route path="/puc-coop" element={<ProtectedRoute><PucCoop /></ProtectedRoute>}/>

            <Route path="/puc-sup"element={<ProtectedRoute><PucSup /></ProtectedRoute>}/>

            <Route path="/clients" element={<ProtectedRoute><Clientes /></ProtectedRoute>}/>

            <Route path="/clients/create" element={<ProtectedRoute><CreateClientes /></ProtectedRoute>}/>

            <Route path="/cargue_balances" element={<ProtectedRoute><CargueBalances /></ProtectedRoute>}/>

            <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>}/>

            <Route path="/activos" element={<ProtectedRoute><Activo /></ProtectedRoute>}/>

            <Route path="/deposito" element={<ProtectedRoute><Deposito /></ProtectedRoute>}/>

            <Route path="/capital_social" element={<ProtectedRoute><CapitalSocial /></ProtectedRoute>}/>

            <Route path="/cartera" element={<ProtectedRoute><Cartera /></ProtectedRoute>}/>

            <Route path="/costos" element={<ProtectedRoute><Costo /></ProtectedRoute>}/>

            <Route path="/disponible" element={<ProtectedRoute><Disponible /></ProtectedRoute>}/>

            <Route path="/excedentes" element={<ProtectedRoute><Excedente /></ProtectedRoute>}/>

            <Route path="/ingresos" element={<ProtectedRoute><Ingreso /></ProtectedRoute>}/>

            <Route path="/intereses" element={<ProtectedRoute><Interes /></ProtectedRoute>}/>

            <Route path="/obligaciones" element={<ProtectedRoute><Obligacion /></ProtectedRoute>}/>

            <Route path="/reserva" element={<ProtectedRoute><Reserva /></ProtectedRoute>}/>

            <Route path="/indicador_financiero"element={<ProtectedRoute><IFinanciero /></ProtectedRoute>}/>

            <Route path="/indicador_cartera" element={<ProtectedRoute><ICartera /></ProtectedRoute>}/>

            <Route path="/resumen"element={<ProtectedRoute><Resumen /></ProtectedRoute>}/>

            <Route path="/Perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>}/>

            <Route path="/Balance-coop" element={<ProtectedRoute><BalanceCoop /></ProtectedRoute>}/>

            <Route path="/Balance-sup" element={<ProtectedRoute><BalanceSup /></ProtectedRoute>}/>
          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/*" element={<MainLayout />}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
