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
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import { ImExit, IoExit } from "react-icons/im";
import { SiTelegram, SiTga } from "react-icons/si";
import { MdOutlineMail } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { Link as ChakraLink } from "@chakra-ui/react";
import config from "../../config";
const BurgerMenu = ({ handleLogout }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");
  const btnRef = useRef();
  const userData = useSelector((state) => state.auth.data);
  return (
    <Box display={["block", "block", "none", "none"]}>
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
          {/* <DrawerHeader>Меню</DrawerHeader> */}

          <DrawerBody
            mt={20}
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
          >
            <Link to={"/"} onClick={onClose}>
              <Button width={"100%"}>Головна</Button>
            </Link>
            <Link to={"/transpotation"} onClick={onClose}>
              <Button width={"100%"}>Мої перевезення</Button>
            </Link>
            <Link to={"/cargos"} onClick={onClose}>
              <Button width={"100%"}>Актуаульні завантаження</Button>
            </Link>
            {userData?.user?.EMAIL === "admin@ict.lviv.ua" ? (
              <Link to={"/admin"} onClick={onClose}>
                <Button width={"100%"}>Адмін</Button>
              </Link>
            ) : null}

            <Divider />
            <Link to={"/settings"} onClick={onClose}>
              <Button
                display={"flex"}
                gap={5}
                width={"100%"}
                colorScheme="teal"
              >
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
              <Button
                display={"flex"}
                gap={5}
                width={"100%"}
                colorScheme="teal"
              >
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
