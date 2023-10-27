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
} from "@chakra-ui/react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useContext, useEffect } from "react";
import { AccoutContext } from "../AccountContext";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import logo from "../../assets/logo_zakhid.svg";
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
      <Box bg={useColorModeValue("gray.500", "gray.900")} px={14}>
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
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              {token ? (
                <Menu>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Меню
                    </MenuButton>
                    <MenuList>
                      <Link to={"/"}>
                        <MenuItem>Головна</MenuItem>
                      </Link>
                      <Link to={"/transpotation"}>
                        <MenuItem>Мої перевезення</MenuItem>
                      </Link>
                      <MenuItem>Оплата транспортних послуг</MenuItem>
                      <Link to={"/cargos"}>
                        <MenuItem>Актуаульні завантаження</MenuItem>
                      </Link>
                    </MenuList>
                  </Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"s"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>

                    <br />
                    <MenuItem>{userData?.user?.NUR}</MenuItem>
                    <Center>
                      <p>{userData?.user?.email}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    {/* <MenuItem>Your Servers</MenuItem> */}
                    <MenuItem>
                      <a
                        href="https://t.me/I_Dont_Have_A_Phone_Number"
                        target="__blank"
                      >
                        Технічна підтримка
                      </a>
                    </MenuItem>

                    <MenuItem onClick={handleLogout}>Вийти</MenuItem>
                  </MenuList>
                </Menu>
              ) : null}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
