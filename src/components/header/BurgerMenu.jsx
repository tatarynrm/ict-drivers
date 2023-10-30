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
import { ImExit, IoExit } from 'react-icons/im';
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
            <Divider />
          </DrawerBody>
          <DrawerFooter>
            {/* <Text>dasda</Text> */}
       
            <Button onClick={handleLogout} rightIcon={<ImExit />} colorScheme="red" variant="outline">
            Вийти
            </Button>
            {/* <Button colorScheme='blue' mr={3}>Save</Button>
            <Button colorScheme='blue' mr={3}>Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default BurgerMenu;
