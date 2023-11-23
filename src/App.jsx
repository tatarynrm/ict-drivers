import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";
import PrivateRoutes from "./components/PrivateRoutes";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Transportation from "./pages/Transportation/Transportation";
import Cargo from "./pages/Cargo/Cargo";

import Settings from "./pages/Settings/Settings";
import Admin from "./pages/Admin/Admin";

function App() {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const userData = useSelector((state) => state.auth.data);

  useEffect(() => {
    token && dispatch(fetchAuthMe());
  }, [token]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/transpotation" element={<Transportation />} />
          <Route exact path="/cargos" element={<Cargo />} />
          <Route exact path="/settings" element={<Settings />} />
          {userData?.user?.EMAIL === "admin@ict.lviv.ua" ? (
            <Route exact path="/admin" element={<Admin />} />
          ) : null}
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
