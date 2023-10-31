import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
const HeaderNav = () => {
  const [active, setActive] = useState("Головна");
  const location = useLocation();
  useEffect(() => {}, [location]);
  return (
    <Box
      display={["none", "none", "flex", "flex"]}
      gap={"20px"}
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
      <NavLink to={"/cargos"}>
        <Button
          colorScheme={location.pathname === "/cargos" ? "teal" : "ghost"}
          variant="outline"
        >
          Актуаульні завантаження
        </Button>
      </NavLink>
    </Box>
  );
};

export default HeaderNav;
