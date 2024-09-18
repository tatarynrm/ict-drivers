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
import axios from './utils/axios'

import Settings from "./pages/Settings/Settings";
import Admin from "./pages/Admin/Admin";
import PayDay from './pages/PayDay/PayDay';
import CustomModal from "./components/modal/CustomModal";
import RequestDocs from "./pages/RequestDocs/RequestDocs";

function App() {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const userData = useSelector((state) => state.auth.data);

  useEffect(() => {
    token && dispatch(fetchAuthMe());
  }, [token]);
  // useEffect(() => {
  //  dispatch(fetchAuthMe());
  // }, []);

//   useEffect(()=>{

    
// if (userData) {
// const activity = async ()=>{
//   try {
//     const data = await axios.post('/check-activity',{KOD_PERUS:userData?.user?.KOD,PAGE_NAME:"MAIN"})
//   } catch (error) {
//     console.log(error);
//   }
// }
// activity()
// }
//   },[userData])


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/transpotation" element={<Transportation />} />
          <Route exact path="/cargos" element={<Cargo />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/request-docs" element={<RequestDocs />} />
          <Route exact path="/pay-day" element={<PayDay />} />
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
