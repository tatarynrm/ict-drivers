import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AccoutContext } from "./AccountContext";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../pages/Login/Login";
import { fetchAuthMe } from "../redux/slices/auth";

const PrivateRoutes = ({ children }) => {
  const token = window.localStorage.getItem("token");
  const isAuth = useSelector((state) => state.auth.isAuth);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
