import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";
import PrivateRoutes from "./components/PrivateRoutes";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Transportation from "./pages/Transportation/Transportation";
import Cargo from "./pages/Cargo/Cargo";
import axios from "./utils/axios";

import Settings from "./pages/Settings/Settings";
import Admin from "./pages/Admin/Admin";
import PayDay from "./pages/PayDay/PayDay";
import CustomModal from "./components/modal/CustomModal";
import RequestDocs from "./pages/RequestDocs/RequestDocs";
import OfferDialog from "./components/offer/OfferDialog";
import OfferDialogButton from "./components/offer/OfferDialogButton";
import NotFound from "./pages/NotFound/NotFound";
import useVisitRecord from "./hooks/useVisitRecord";
import RatingModal from "./components/modal/RatngModal";
import { useDisclosure } from "@chakra-ui/react";

function App() {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const userData = useSelector((state) => state.auth.data);
  const [showRating,setShowRating]= useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const [rateVote, setRateVote] = useState(Number(localStorage.getItem("vote")) || 0);
 

  useEffect(() => {
    token &&  dispatch(fetchAuthMe());
  }, [token]);


useEffect(()=>{
const checkModalClick = async ()=>{
  try {
    const obj = {
      user_id:userData?.user?.KOD,
      ur:userData?.user?.NUR,
      count:null,
      comment:null,
      is_check:false,
      pipfull:`${userData?.user?.PRIZV} ${userData?.user?.NAME} ${userData?.user?.POBAT}`,
    }

    
    const data = await axios.post('/modals/get-check',obj);
    console.log('DATAAAAAAAAAAA',data);

    if (data.data.command === 'INSERT' ) {
      // localStorage.setItem('vote', 0)
         let timeoutId;

         timeoutId = setTimeout(() => {
          localStorage.setItem("vote", 0);
          setRateVote(0);
          onOpen();
          setShowRating(true);
        }, 3000);

    // Очищення таймера при демонту
    return () => clearTimeout(timeoutId);
    }
  

  if (data.data.command === 'SELECT' && data.data.rows[0].is_check === true) {
    localStorage.setItem('vote', 1)
   }else {
    localStorage.setItem('vote', 0)
   // localStorage.setItem('vote', 0)
   let timeoutId;

   timeoutId = setTimeout(() => {
    localStorage.setItem("vote", 0);
    setRateVote(0);
    onOpen();
    setShowRating(true);
  }, 3000);
   }
    
  } catch (error) {
    console.log(error);
    
  }
 
}

if (userData?.user?.KOD) {
  checkModalClick()
}

},[userData])



  return (
    <>
      {/* <OfferDialog/> */}
      {showRating && <RatingModal isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>}

      {location.pathname !== "/admin" && <OfferDialogButton />}
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
          ) : (
            <Route exact path="*" element={<NotFound />} />
          )}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
