/* eslint-disable no-unused-vars */
/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Assessment from "@material-ui/icons/Assessment";
import UserProfile from "views/UserProfile/UserProfile.js";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PlanProfile from "views/Preweight/Plan";
import PlanList from "views/Preweight/PlanList";
import Warehouselist from "views/Preweight/Warehouselist";
import WarehouseProfile from "views/Preweight/Warehouse";
import RaportWykonanych from "views/Preweight/Raport";
import UserList from "views/Preweight/UserList";
import PrewList from "views/Preweight/PrewList";
import PrewProfile from "views/Preweight/Prew";
import MatList from "views/Preweight/MaterialList";
import MatProfile from "views/Preweight/Material";
import RecipeList from "views/Preweight/RecipeList";
import RecipeProfile from "views/Preweight/Recipe";
import DashboardAdmin from "views/Dashboard/DashboardAdmin";

const dashboardRoutes = [
 {
    path: "/plan/:id",
    name: "Plan produkcji",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: PlanProfile,
    layout: "/admin",
    role: "None",
  },

  {
    path: "/dashboard/:id",
    name: "Dashboard",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Dashboard,
    component: DashboardAdmin,
    layout: "/admin",
    role: "None",
  },

  {
  path: "/Planlist/:id",
  name: "Lista do wykonania",
  rtlName: "ملف تعريفي للمستخدم",
  icon: Dashboard,
  component: PlanList,
  layout: "/admin",
  role: "User",
  },

  {
    path: "/WarehouseList/:id",
    name: "Stany na magazynie",
    rtlName: "ملف تعريفي للمستخدم",
    icon: MonetizationOnIcon,
    component: Warehouselist,
    layout: "/admin",
    role: "User",
  },

  {
    path: "/Warehouse/:id",
    name: "Plan produkcji",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: WarehouseProfile,
    layout: "/admin",
    role: "None",
  },

  {
    path: "/RaportWykonanych/:id",
    name: "Raport wykonanych",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Assessment,
    component: RaportWykonanych,
    layout: "/admin",
    role: "User",
  },

  {
    path: "/UserList/:id",
    name: "Lista użytkowników",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserList,
    layout: "/admin",
    role: "Admin",
  },

  {
    path: "/user/:id",
    name: "Edycja u zytkownika",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    role: "None",
  },

  {
    path: "/PrewList/:id",
    name: "Naważki",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Dashboard,
    component: PrewList,
    layout: "/admin",
    role: "Admin",
  },

  {
    path: "/PrewProfile/:id",
    name: "Naważka edycja",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: PrewProfile,
    layout: "/admin",
    role: "None",
  },

  {
    path: "/Matlist/:id",
    name: "LIsta Materiałów",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Dashboard,
    component: MatList,
    layout: "/admin",
    role: "Admin",
  },

  {
    path: "/MaterialProfile/:id",
    name: "Naważka edycja",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: MatProfile,
    layout: "/admin",
    role: "None",
  },

  {
    path: "/RecipeList/:id",
    name: "LIsta Receptur",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Dashboard,
    component: RecipeList,
    layout: "/admin",
    role: "Admin",
  },

  {
    path: "/RecipeProfile/:id",
    name: "Receptura edycja",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: RecipeProfile,
    layout: "/admin",
    role: "None",
  },

];

export default dashboardRoutes;
