// import { Box, Button } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, NavLink } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import useVisitRecord from "../../hooks/useVisitRecord";
// const HeaderNav = () => {
//   const [active, setActive] = useState("Головна");
//   const location = useLocation();
//   const userData = useSelector((state) => state.auth.data);
//   const {recordVisit} = useVisitRecord()

//   useEffect(() => {}, [location]);
//   useEffect(() => {}, [userData?.user?.email]);


//   return (
//     <Box
//       display={["none", "none", "none", "flex"]}
//       gap={"10px"}
//       justifyContent={"space-between"}
//     >
//       <NavLink to={"/"} onClick={() => recordVisit()}>
//         <Button
//           variant="outline"
//           fontSize={"12px"}
//           colorScheme={location.pathname === "/" ? "teal" : ""}
//         >
//           Головна
//         </Button>
//       </NavLink>
//       <NavLink to={"/transpotation"}>
//         <Button
//           fontSize={"12px"}
//           variant="outline"
//           colorScheme={location.pathname === "/transpotation" ? "teal" : ""}
//         >
//           Мої перевезення
//         </Button>
//       </NavLink>
//       <NavLink to={"/pay-day"}>
//         <Button
//           fontSize={"12px"}
//           variant="outline"
//           colorScheme={location.pathname === "/pay-day" ? "teal" : ""}
//         >
//           Графік оплат
//         </Button>
//       </NavLink>
//       <NavLink to={"/request-docs"}>
//         <Button
//           fontSize={"12px"}
//           variant="outline"
//           colorScheme={location.pathname === "/request-docs" ? "teal" : ""}
//         >
//           Відправлені АВР
//         </Button>
//       </NavLink>
//       <NavLink to={"/cargos"}>
//         <Button
//           fontSize={"12px"}
//           colorScheme={location.pathname === "/cargos" ? "teal" : "ghost"}
//           variant="outline"
//         >
//           Актуальні завантаження
//         </Button>
//       </NavLink>
//       {/* <NavLink to={"/cargos"}>
//         <Button
//           colorScheme={location.pathname === "/cargos" ? "teal" : "ghost"}
//           variant="outline"
//         >
//           Кореспонденція
//         </Button>
//       </NavLink> */}
//       {userData?.user?.ISADMIN === 1 ? (
//         <NavLink to={"/admin"}>
//           <Button
//             fontSize={"12px"}
//             colorScheme={location.pathname === "/admin" ? "teal" : "ghost"}
//             variant="outline"
//           >
//             Адмін
//           </Button>
//         </NavLink>
//       ) : null}
//     </Box>
//   );
// };

// export default HeaderNav;


import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import useVisitRecord from "../../hooks/useVisitRecord";

const HeaderNav = () => {
  const [active, setActive] = useState("Головна");
  const location = useLocation();
  const userData = useSelector((state) => state.auth.data);
  const { recordVisit } = useVisitRecord();
  
  // Флаг для уникального виклику recordVisit
  const [hasVisited, setHasVisited] = useState(false);

  const navItems = [
    { to: "/", label: "Головна", isAdminRequired: false },
    { to: "/transpotation", label: "Мої перевезення", isAdminRequired: false },
    { to: "/pay-day", label: "Графік оплат", isAdminRequired: false },
    { to: "/request-docs", label: "Відправлені АВР", isAdminRequired: false },
    { to: "/cargos", label: "Актуальні завантаження", isAdminRequired: false },
    { to: "/admin", label: "Адмін", isAdminRequired: true },
  ];
console.log(location.pathname);

  useEffect(() => {
    // Викликаємо recordVisit тільки один раз для нового шляху
    if (!hasVisited && location.pathname) {
      recordVisit({ page: location.pathname == '/' ? 'Головна' : location.pathname, company: userData?.user?.KOD_UR });
      setHasVisited(true); // Позначаємо, що вже відвідали цю сторінку
    }
  }, [location, userData, recordVisit, hasVisited]); // Додаємо hasVisited в залежності

  return (
    <Box
      display={["none", "none", "none", "flex"]}
      gap={"10px"}
      justifyContent={"space-between"}
    >
      {navItems
        .filter((item) => !item.isAdminRequired || userData?.user?.ISADMIN === 1) // Фільтруємо елементи для адміністраторів
        .map((item) => (
          <NavLink key={item.to} to={item.to} onClick={() => setHasVisited(false)}>
            <Button
              fontSize={"12px"}
              variant="outline"
              colorScheme={location.pathname === item.to ? "teal" : "ghost"}
            >
              {item.label}
            </Button>
          </NavLink>
        ))}
    </Box>
  );
};

export default HeaderNav;
