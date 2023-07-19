import React from "react";
import { Navigate } from "react-router-dom";

import Login from "../pages/Authentication/Login";
import MyLogin from "../pages/Authentication/MyLogin";
import Logout from "../pages/Authentication/Logout";

import MyRegister from "../pages/Authentication/MyRegister";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import MyEmailVerification from "../pages/Authentication/MyEmailVerification";

import SellerDash from "../pages/Dashboard";
import CreateProduct from "../pages/CreateProduct";
const authProtectedRoutes = [
  { path: "/dashboard", component: <SellerDash /> },
  { path: "/", component: <Navigate to="/dashboard" /> },
  { path: "/create", component: <CreateProduct /> },
  { path: "/edit/:product_id", component: <CreateProduct edit={true} /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <MyLogin /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <MyRegister /> },
  { path: "/verify-email", component: <Navigate to="/register" /> },
  {
    path: "/verify-email/:registration_code",
    component: <MyEmailVerification />,
  },
];

export { authProtectedRoutes, publicRoutes };
