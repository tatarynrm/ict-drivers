import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import PrivateRoutes from "../components/PrivateRoutes";
import { AccoutContext } from "../components/AccountContext";
import SidebarWithHeader from "../components/layout/SideBar";
import { useSelector } from "react-redux";

const Views = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes  />}>
        <Route path="/" exact element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Views;
