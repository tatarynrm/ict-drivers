import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
const HeaderNav = () => {
  const [active, setActive] = useState("Головна");
  const location = useLocation();
  const userData = useSelector((state) => state.auth.data);

  useEffect(() => {}, [location]);
  useEffect(() => {}, [userData?.user?.email]);
  return (
    <Box
      display={["none", "none", "none", "flex"]}
      gap={"10px"}
      justifyContent={"space-between"}
    >
      <NavLink to={"/"}>
        <Button
          variant="outline"
          colorScheme={location.pathname === "/" ? "teal" : ""}
        >
          Головна
        </Button>
      </NavLink>
      <NavLink to={"/transpotation"}>
        <Button
          variant="outline"
          colorScheme={location.pathname === "/transpotation" ? "teal" : ""}
        >
          Мої перевезення
        </Button>
      </NavLink>
      <NavLink to={"/pay-day"}>
        <Button
          variant="outline"
          colorScheme={location.pathname === "/pay-day" ? "teal" : ""}
        >
          Графік оплат
        </Button>
      </NavLink>
      <NavLink to={"/request-docs"}>
        <Button
          variant="outline"
          colorScheme={location.pathname === "/request-docs" ? "teal" : ""}
        >
          Відправлені документи
        </Button>
        </NavLink>
      <NavLink to={"/cargos"}>
        <Button
          colorScheme={location.pathname === "/cargos" ? "teal" : "ghost"}
          variant="outline"
        >
          Актуальні завантаження
        </Button>
      </NavLink>
      {/* <NavLink to={"/cargos"}>
        <Button
          colorScheme={location.pathname === "/cargos" ? "teal" : "ghost"}
          variant="outline"
        >
          Кореспонденція
        </Button>
      </NavLink> */}
      {userData?.user?.EMAIL === "admin@ict.lviv.ua" ? (
        <NavLink to={"/admin"}>
          <Button
            colorScheme={location.pathname === "/cargos" ? "teal" : "ghost"}
            variant="outline"
          >
            Адмін
          </Button>
        </NavLink>
      ) : null}
    </Box>
  );
};

export default HeaderNav;
