// import { HamburgerIcon } from "@chakra-ui/icons";
// import {
//   Box,
//   Button,
//   Divider,
//   Drawer,
//   DrawerBody,
//   DrawerCloseButton,
//   DrawerContent,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   IconButton,
//   Text,
//   useDisclosure,
// } from "@chakra-ui/react";
// import React, { useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import UserProfile from "./UserProfile";
// import { ImExit, IoExit } from "react-icons/im";
// import { SiTelegram, SiTga } from "react-icons/si";
// import { MdOutlineMail } from "react-icons/md";
// import { FiSettings } from "react-icons/fi";
// import { Link as ChakraLink } from "@chakra-ui/react";
// import config from "../../config";
// const BurgerMenu = ({ handleLogout }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [placement, setPlacement] = useState("left");
//   const btnRef = useRef();
//   const userData = useSelector((state) => state.auth.data);
//   return (
//     <Box display={["block", "block", "block", "none"]}>
//       <IconButton
//         colorScheme="teal"
//         ref={btnRef}
//         onClick={onOpen}
//         icon={<HamburgerIcon />}
//       />
//       <Drawer
//         isOpen={isOpen}
//         onClose={onClose}
//         finalFocusRef={btnRef}
//         placement={placement}
//       >
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerCloseButton />
//           {/* <DrawerHeader>Меню</DrawerHeader> */}

//           <DrawerBody
//             mt={20}
//             display={"flex"}
//             flexDirection={"column"}
//             gap={"20px"}
//           >
//             <Link to={"/"} onClick={onClose}>
//               <Button width={"100%"}>Головна</Button>
//             </Link>
//             <Link to={"/transpotation"} onClick={onClose}>
//               <Button width={"100%"}>Мої перевезення</Button>
//             </Link>
//             <Link to={"/pay-day"} onClick={onClose}>
//               <Button width={"100%"}>Графік оплат</Button>
//             </Link>
//             <Link to={"/request-docs"} onClick={onClose}>
//               <Button width={"100%"}>Відправлені АВР</Button>
//             </Link>
//             <Link to={"/cargos"} onClick={onClose}>
//               <Button width={"100%"}>Актуаульні завантаження</Button>
//             </Link>
//             {userData?.user?.ISADMIN === 1  ? (
//               <Link to={"/admin"} onClick={onClose}>
//                 <Button width={"100%"}>Адмін</Button>
//               </Link>
//             ) : null}
//             <Divider />
//             <Link to={"/settings"} onClick={onClose}>
//               <Button
//                 display={"flex"}
//                 gap={5}
//                 width={"100%"}
//                 colorScheme="teal"
//               >
//                 <Text> Налаштування</Text>
//                 <FiSettings />
//               </Button>
//             </Link>
//             <Divider />
//           </DrawerBody>
//           <DrawerFooter
//             width={"100%"}
//             display={"flex"}
//             flexDirection={"column"}
//             gap={10}
//           >
//             <a href={config.SUPPORT_TELEGRAM_LINK} target="__blank">
//               <Button
//                 display={"flex"}
//                 gap={5}
//                 width={"100%"}
//                 colorScheme="teal"
//               >
//                 <Text> Підтримка</Text>
//                 <SiTelegram />
//               </Button>
//             </a>
//             <a width={"100%"} href={config.SUPPORT_EMAIL_LINK}>
//               <Button display={"flex"} gap={5} colorScheme="teal">
//                 <Text> Підтримка</Text>
//                 <MdOutlineMail />
//               </Button>
//             </a>

//             <Button
//               width={"100%"}
//               marginTop={"20px"}
//               onClick={handleLogout}
//               rightIcon={<ImExit />}
//               colorScheme="red"
//               variant="outline"
//             >
//               Вийти
//             </Button>
//           </DrawerFooter>
//         </DrawerContent>
//       </Drawer>
//     </Box>
//   );
// };

// export default BurgerMenu;

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { SiTelegram } from "react-icons/si";
import { MdOutlineMail } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import config from "../../config";
import useVisitRecord from "../../hooks/useVisitRecord";  // Імпортуємо хук

const BurgerMenu = ({ handleLogout }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");
  const btnRef = useRef();
  const userData = useSelector((state) => state.auth.data);
  const location = useLocation();
  const [recordPage,setRecordPage] = useState('')
  
  // Ініціалізація хука для запису відвідувань
  const { recordVisit } = useVisitRecord();

  const [hasVisited, setHasVisited] = useState(false); // Стан для перевірки, чи відбулося відвідування

  // Динамічний масив для навігаційних пунктів
  const menuItems = [
    { to: "/", label: "Головна" },
    { to: "/transpotation", label: "Мої перевезення" },
    { to: "/pay-day", label: "Графік оплат" },
    { to: "/request-docs", label: "Відправлені АВР" },
    { to: "/cargos", label: "Актуальні завантаження" },
    // Умова для відображення Адмін меню
    ...(userData?.user?.ISADMIN === 1
      ? [{ to: "/admin", label: "Адмін" }]
      : []),
  ];
  
  useEffect(()=>{
    const page = location.pathname === "/" ? "Головна" : location.pathname.substring(1);
    setRecordPage(page)
  },[location])
  // Викликаємо recordVisit тільки один раз при відкритті меню
const handleRecordVisit = (page)=>{
  recordVisit({page: page === '/' ? 'main' : page, company: userData?.user?.KOD_UR });
  onClose()
}
  return (
    <Box display={["block", "block", "block", "none"]}>
      <IconButton
        colorScheme="teal"
        ref={btnRef}
        onClick={onOpen}
        icon={<HamburgerIcon />}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        placement={placement}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody mt={20} display={"flex"} flexDirection={"column"} gap={"20px"}>
            {/* Динамічний рендер пунктів меню */}
            {menuItems.map((item, idx) => (
              <Link key={idx} to={item.to} onClick={()=>handleRecordVisit(item.to)}>
                <Button width={"100%"}>{item.label}</Button>
              </Link>
            ))}
            <Divider />
            <Link to={"/settings"} onClick={onClose}>
              <Button display={"flex"} gap={5} width={"100%"} colorScheme="teal">
                <Text> Налаштування</Text>
                <FiSettings />
              </Button>
            </Link>
            <Divider />
          </DrawerBody>
          <DrawerFooter
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            gap={10}
          >
            <a href={config.SUPPORT_TELEGRAM_LINK} target="__blank">
              <Button display={"flex"} gap={5} width={"100%"} colorScheme="teal">
                <Text> Підтримка</Text>
                <SiTelegram />
              </Button>
            </a>
            <a width={"100%"} href={config.SUPPORT_EMAIL_LINK}>
              <Button display={"flex"} gap={5} colorScheme="teal">
                <Text> Підтримка</Text>
                <MdOutlineMail />
              </Button>
            </a>

            <Button
              width={"100%"}
              marginTop={"20px"}
              onClick={handleLogout}
              rightIcon={<ImExit />}
              colorScheme="red"
              variant="outline"
            >
              Вийти
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default BurgerMenu;

