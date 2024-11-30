import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";
import PrivateRoutes from "./components/PrivateRoutes";
import { Navigate, Route, Routes } from "react-router-dom";
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
import OfferDialog from "./components/offer/OfferDialog";
import OfferDialogButton from "./components/offer/OfferDialogButton";
import NotFound from "./pages/NotFound/NotFound";
import useVisitRecord from "./hooks/useVisitRecord";

function App() {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const userData = useSelector((state) => state.auth.data);



  useEffect(() => {
    token && dispatch(fetchAuthMe());
  }, [token]);


  useEffect(()=>{
   if (userData) {
   
   }
  },[userData])





  return (
    <>
     {/* <OfferDialog/> */}

     <OfferDialogButton/>
      <Header />
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/transpotation" element={<Transportation />} />
          <Route exact path="/cargos" element={<Cargo />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/request-docs" element={<RequestDocs />} />
          <Route exact path="/pay-day" element={<PayDay />} />
          {userData?.user?.ISADMIN === 1 ? (
            <Route exact path="/admin" element={<Admin />} />
          ) :     <Route exact path="*" element={<NotFound/>} />}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

   
    </>
  );
}

export default App;
