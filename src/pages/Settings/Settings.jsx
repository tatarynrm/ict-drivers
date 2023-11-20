import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Link,
  Stack,
  Switch,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BsTelegram } from "react-icons/bs";
const Settings = () => {
  const userData = useSelector((state) => state.auth.data);
  useEffect(() => {}, [userData]);
  console.log(userData?.user?.TG_ID);
  return (
    <Stack
      width={["100%", "100%", "90%", "90%"]}
      margin={"0 auto"}
      marginTop={"20px"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Stack>
        {userData?.user?.TG_ID ? null : (
                        <Tooltip label={'Для отримання споівщень про оплату рахунку,некомплектності документів і т.д'} hasArrow placement="top">
        
                
          <Box
            padding={"0.4rem"}
            borderRadius={"10px"}
            width={"200px"}
            height={"100px"}
            backgroundColor={"#2AABEF"}
          >
            <Link href="https://t.me/ict_drivers_bot" target="_blank">
              <Text>Приєднати Telegram Bot</Text>
              <IconButton
                colorScheme="teal"
                aria-label="Call Segun"
                size="lg"
                icon={<BsTelegram />}
              />
            </Link>
          </Box>
          </Tooltip>
        )}

        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            Підписатись на E-mail сповіщення
          </FormLabel>
          <Switch
            name="email_not"
            id="email-alerts"
            size="lg"
            colorScheme="teal"
          />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            Підписатись на Telegram сповіщення
          </FormLabel>
          <Switch id="email-alerts" size="lg" colorScheme="teal" />
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default Settings;
