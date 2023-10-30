import { Avatar, Button, Center, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const UserProfile = ({handleLogout}) => {
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
          size={"sm"}
          src={"https://avatars.dicebear.com/api/male/username.svg"}
        />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <br />
        <Center>
          <Avatar
            size={"s"}
            src={"https://avatars.dicebear.com/api/male/username.svg"}
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
          <a href="https://t.me/I_Dont_Have_A_Phone_Number" target="__blank">
            Технічна підтримка Telegram
          </a>
        </MenuItem>
        <MenuItem>
          <a href="mailto:support@ict.lviv.ua">
            Технічна підтримка E-mail
          </a>
        </MenuItem>

        <MenuItem onClick={handleLogout}>Вийти</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserProfile;
