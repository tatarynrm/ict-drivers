import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, fetchAuthMe } from "./redux/slices/auth";
import PrivateRoutes from "./components/PrivateRoutes";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Transportation from "./pages/Transportation/Transportation";
import Cargo from "./pages/Cargo/Cargo";
import { fetchUser } from "./redux/slices/user";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const token = window.localStorage.getItem("token");
  const [openModalLogin, setOpenModalLogin] = useState(false);



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
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
