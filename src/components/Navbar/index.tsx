import React, { useState } from "react";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/solid";

import Innreport from "../../assets/Innreport 2-2.png";

import { useAuth } from "../../auth/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import Taza from "./tazas";

function Navbar() {
  const { getUser, signout } = useAuth();
  const user = getUser()?.username;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);

    setTimeout(() => {
      setIsDropdownOpen(isDropdownOpen);
    }, 4000); 
  };

  const handleLogout = () => {
    signout();
    navigate("/login");
  };

  return (
    <nav className="p-1 fixed w-full h-[70px] top-0 z-10 bg-gray-950 flex flex-row ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Image Logo */}
        <div className="text-white text-lg font-bold">
          <img src={Innreport} alt="Logo" className="h-10" />
        </div>

        <div className="w-full max-w-[700px] sm-max:w-[400px] md-max:w-[250px] lg-max:hidden h-[60px] flex items-center">
          <Taza />
        </div>

        <ul className="flex space-x-4 items-center">
          {/* User Display */}
          {user && (
            <li className="text-white pr-4 flex capitalize">
              <UserIcon className="h-6 w-6 mr-3 text-blue-400" />
              {user}
            </li>
          )}

          {/* Dropdown Menu */}
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white rounded-full p-1"
            >
              <div
                className={`w-10 h-10 rounded-full border border-x-2 border-blue-950 bg-blue-300 ${
                  isDropdownOpen ? "" : ""
                }`}
              >
                <Bars3Icon className="fill-blue-950"></Bars3Icon>
              </div>
            </button>
            {isDropdownOpen && (
              <ul className="absolute top-10 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md z-60 w-max">
                <li>
                  <Link to="/Perfil">
                    <p className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">Perfil</p>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white w-full text-left"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
