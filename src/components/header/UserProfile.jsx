import {
  Avatar,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { SiTelegram } from "react-icons/si";
import { MdOutlineMail } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import config from "../../config";

const UserProfile = ({ handleLogout }) => {
  const userData = useSelector((state) => state.auth.data);
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar
          size={"md"}
          name={`${userData?.user?.PRIZV} ${userData?.user?.NAME}`}
         
          // src={"https://avatars.dicebear.com/api/male/username.svg"}
        />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <br />
        <Center>
          <Avatar
            size={"md"}
         name={`${userData?.user?.PRIZV} ${userData?.user?.NAME}`}
          />
        </Center>

      
        <MenuItem color={'green.200'}  cursor={"pointer"}>Користувач: {`${userData?.user?.PRIZV} ${userData?.user?.NAME}`}</MenuItem>
        <MenuItem color={'red.200'}   cursor={"pointer"}>Компанія: {userData?.user?.NUR}</MenuItem>
        <Center>
          <p>{userData?.user?.email}</p>
        </Center>
        <br />
        <MenuDivider />

        <MenuItem isDisabled cursor={"pointer"}>
          Технічна підтримка
        </MenuItem>

        <a href={config.SUPPORT_TELEGRAM_LINK} target="__blank">
          <MenuItem display={"flex"} gap={3}>
            <SiTelegram />
            <Text>Telegram</Text>
          </MenuItem>
        </a>

        <a href={config.SUPPORT_EMAIL_LINK}>
          <MenuItem display={"flex"} gap={3}>
            <MdOutlineMail />
            <Text>E-mail</Text>
          </MenuItem>
        </a>
        <MenuDivider />
        <Link to={"/settings"}>
          <MenuItem display={"flex"} gap={3}>
            <FiSettings />
            <Text>Налаштування</Text>
          </MenuItem>
        </Link>

        <Button
          marginTop={20}
          marginLeft={10}
          onClick={handleLogout}
          rightIcon={<ImExit />}
          colorScheme="red"
          variant="outline"
        >
          Вийти
        </Button>
      </MenuList>
    </Menu>
  );
};

export default UserProfile;
