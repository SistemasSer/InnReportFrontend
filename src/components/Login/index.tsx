import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authSlice from "../../store/slices/auth";


import { useAuth } from "../../auth/AuthProvider";
import { AuthResponse, AuthResponseError } from "../../types/types";
import { Navigate } from "react-router-dom";

function Login() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const [errorResponse, setErrorResponse] = useState("");
  const [username, setUsername] = useState("");
  const auth = useAuth();
  const { getUser, signout } = useAuth();
  const user = getUser()?.username;

  function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const apiUrl = process.env.REACT_APP_API_URL_1;

      const response = await fetch(`${apiUrl}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // console.log("Código de estado de la respuesta:", response.status);

      if (response.ok) {
        const json = (await response.json()) as AuthResponse;

        if (json.access && json.refresh) {
          auth.saveUser(json);
          navigate("/home");
        }
      } else {
        const errorText = await response.text();

        try {
          const errorJson = JSON.parse(errorText) as AuthResponseError;

          setErrorResponse(errorJson.body.error);

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorJson.body.error,
          });
        } catch (parseError) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error desconocido del servidor",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Verifica las credenciales ingresadas",
      });
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url('/F5.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-1/3 bg-white p-8 rounded-lg shadow-md top-0"
      >
        <div
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
          }}
        >
          <img src="/Innreport1.png" alt="Logo" className="mb-4 h-44" />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded-md"
            placeholder="Digite su correo electrónico en el campo"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded-md"
            placeholder="Digite su contraseña en el campo"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600 mt-20"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
