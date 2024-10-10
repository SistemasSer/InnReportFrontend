import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  // Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
  DocumentChartBarIcon,
  RectangleStackIcon,
  // Cog6ToothIcon,
  InboxIcon,
  ScaleIcon 
  // PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

function Sidebar() {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  const { getUser, setUser } = useAuth();
  const user = getUser() || { is_staff: false };

  const userData = [user?.is_staff];

  return (
    <div className="h-screen  max-w-[15rem] p-2 shadow-xl shadow-blue-gray-900/5 bg-slate-700">
      <List>

        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4  border-slate-500 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem
            className={`p-0 wt-2 hover:bg-slate-300 ${
              open === 1 ? "bg-slate-500" : ""
            }`}
            selected={open === 1}
          >
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className={`border-b-0 p-3 ${ !user.is_staff ? "hidden" : "flex"}`}
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className={`h-7 w-7 p-1 fill-slate-400 `} />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal text-slate-400">
                Administración
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className={`py-1 `}>
            <List className={`p-0   ${open === 1 ? "block" : "hidden"}`}>
              <Link to="/users">
                <ListItem className={`hover:bg-slate-300 h-7 ${ !user.is_staff ? "hidden" : "flex"}`}>
                  <Typography className="mr-1 font-normal text-slate-400">
                    Usuarios
                  </Typography>
                </ListItem>
              </Link>

              <Link to="/entidad">
                <ListItem className="hover:bg-slate-300 h-7">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Entidades
                  </Typography>
                </ListItem>
              </Link>
              <Link to="/puc-coop">
                <ListItem className="hover:bg-slate-300 h-7">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Puc Cooperativas
                  </Typography>
                </ListItem>
              </Link>
              <Link to="/puc-sup">
                <ListItem className="hover:bg-slate-300 h-7">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Puc Superfinanciera
                  </Typography>
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem
            className={`p-0 hover:bg-slate-300${open === 2 ? "bg-slate-500" : "" }`}
            selected={open === 2}
          >
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3 "
            >
              <ListItemPrefix>
                <RectangleStackIcon className="h-7 w-7 p-1 fill-slate-400" />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto font-normal text-slate-400"
              >
                Servicios {"       "}
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 ">
            <Link to="/cargue_balances">
              <List className={`p-0 ${open === 2 ? "block" : "hidden"} `}>
                <ListItem className="hover:bg-slate-300 h-7">
                  <Typography className="mr-1 font-normal text-slate-400 ">
                    Cargue de balance
                  </Typography>
                </ListItem>
              </List>
            </Link>
          </AccordionBody>
        </Accordion>

        <Link to="/resumen">
          <ListItem className="hover:bg-slate-300">
            <ListItemPrefix className="text-slate-400">
              <ClipboardDocumentListIcon className="h-7 w-7 p-1 fill-slate-400" />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
              className="mr-auto font-normal text-slate-400"
            >
              Resumen
            </Typography>
            {/* <ListItemSuffix> */}

              {/* <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full text-slate-400" /> */}
            {/* </ListItemSuffix> */}
          </ListItem>
        </Link>
        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4  border-slate-500 transition-transform ${
                open === 3 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem
            className={`p-0 hover:bg-slate-300 ${
              open === 3 ? "bg-slate-500" : ""
            }`}
            selected={open === 3}
          >
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-7 w-7 p-1 fill-slate-400" />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal text-slate-400">
                Informes
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className={`p-0 ${open === 3 ? "block" : "hidden"}`}>
              <Link to="/activos">
                <ListItem className="hover:bg-slate-300 h-7">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Activos
                  </Typography>
                </ListItem>
              </Link>
              <Link to="/deposito">
                <ListItem className="hover:bg-slate-300 h-7">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Deposito
                  </Typography>
                </ListItem>
              </Link>
              <Link to="/disponible">
                <ListItem className="hover:bg-slate-300 h-6">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Disponible
                  </Typography>
                </ListItem>
              </Link>
              <Link to="/cartera">
                <ListItem className="hover:bg-slate-300 h-6">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Cartera
                  </Typography>
                </ListItem>
              </Link>
              <Link to="/obligaciones">
                <ListItem className="hover:bg-slate-300 h-6">
                  <Typography className="mr-1 font-normal text-slate-400">
                    O. financieras
                  </Typography>
                </ListItem>
              </Link>
              <Link to="/capital_social">
                <ListItem className="hover:bg-slate-300 h-6">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Capital social
                  </Typography>
                </ListItem>
              </Link>

              <Link to="/excedentes">
                <ListItem className="hover:bg-slate-300 h-6">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Excedentes
                  </Typography>
                </ListItem>
              </Link>
              <Link to="/ingresos">
                <ListItem className="hover:bg-slate-300 h-6">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Ingresos
                  </Typography>
                </ListItem>
              </Link>
              <Link to="/costos">
                <ListItem className="hover:bg-slate-300 h-6">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Costos
                  </Typography>
                </ListItem>
              </Link>
              <Link to="/intereses">
                <ListItem className="hover:bg-slate-300 h-6">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Intereses
                  </Typography>
                </ListItem>
              </Link>
              <Link to="/reserva">
                <ListItem className="hover:bg-slate-300 h-6">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Reserva
                  </Typography>
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 4}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 4 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem
            className={`p-0 hover:bg-slate-300 ${
              open === 4 ? "bg-slate-500" : ""
            }`}
            selected={open === 4}
          >
            <AccordionHeader
              onClick={() => handleOpen(4)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <RectangleStackIcon className="h-7 w-7 p-1 fill-slate-400" />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto font-normal text-slate-400"
              >
                Indicadores
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <Link to="/indicador_financiero">
              <List className={`p-0 ${open === 4 ? "block" : "hidden"}`}>
                <ListItem className="hover:bg-slate-300 h-7">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Financieros
                  </Typography>
                </ListItem>
              </List>
            </Link>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 5}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 5 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem
            className={`p-0 hover:bg-slate-300 ${
              open === 5 ? "bg-slate-500" : ""
            }`}
            selected={open === 5}
          >
            <AccordionHeader
              onClick={() => handleOpen(5)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <ScaleIcon className="h-7 w-7 p-1 fill-slate-400" />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto font-normal text-slate-400"
              >
                Balance
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <Link to="/Balance-coop">
              <List className={`p-0 ${open === 5 ? "block" : "hidden"}`}>
                <ListItem className="hover:bg-slate-300 h-7">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Puc Cooperativas
                  </Typography>
                </ListItem>
              </List>
            </Link>
          </AccordionBody>
          <AccordionBody className="py-1">
            <Link to="/Balance-sup">
              <List className={`p-0 ${open === 5 ? "block" : "hidden"}`}>
                <ListItem className="hover:bg-slate-300 h-7">
                  <Typography className="mr-1 font-normal text-slate-400">
                    Puc Superfinanciera
                  </Typography>
                </ListItem>
              </List>
            </Link>
          </AccordionBody>
        </Accordion>
      </List>
    </div>
  );
}

export default Sidebar;
