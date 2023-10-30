import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Img,
  Input,
  IconButton,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { AccoutContext } from "../AccountContext";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import logo from "../../assets/logo_zakhid.svg";
import BurgerMenu from "./BurgerMenu";
import UserProfile from "./UserProfile";
import HeaderNav from "./HeaderNav";
const NavLink = (props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Nav() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userData = useSelector((state) => state.auth.data);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const btnRef = useRef();
  const [placement, setPlacement] = useState("left");
  const logoutFromAccount = () => {
    // dispatch(logout());
    window.localStorage.clear();
    navigate("/login");
  };
  const handleLogout = async () => {
    await axios.post("/logout");
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.500", "gray.900")}
        px={[3, 5, 10, 10]}
        pl={[0, 0, 10, 10]}
      >
        <Flex
          display={["flex", "flex", "flex", "flex", "flex"]}
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Link to={"/"}>
            <Box style={{ width: "60px" }}>
              <Img style={{ width: "100%" }} src={logo} />
            </Box>
          </Link>
          {token && <HeaderNav />}
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7} alignItems={"center"}>
              {token ? (
                <Menu>
                  <Box display={["none", "none", "block", "block"]}>
                    <UserProfile handleLogout={handleLogout} />
                  </Box>
                </Menu>
              ) : null}
            </Stack>
          </Flex>
          {token && <BurgerMenu handleLogout={handleLogout} />}
        </Flex>
      </Box>
    </>
  );
}
