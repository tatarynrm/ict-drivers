import {
  Box,
  FormControl,
  IconButton,
  Input,
  Link,
  Stack,
  Switch,
  Text,
  Tooltip,
  FormLabel,
  FormHelperText,
  Button,
} from "@chakra-ui/react";

import InputMask from "react-input-mask";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsTelegram } from "react-icons/bs";
import axios from "../../utils/axios";
const Settings = () => {
  const userData = useSelector((state) => state.auth.data);
  const [tgConnectVis, setTgConnectVis] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+380"); // State to hold the phone number
  const cleanedPhoneNumber = phoneNumber?.replace(/\D/g, "");
  const [emailNot, setEmailNot] = useState(false);
  const [tgNot, setTgNot] = useState(false);
  const [changeNumberAgain, setChangeNumberAgain] = useState(false);
  const handleEmailSwitch = () => {
    setEmailNot((prevValue) => !prevValue);
    updateEmailNotStatus();
  };
  const handleTgSwitch = () => {
    setTgNot((prevValue) => !prevValue);
    updateTgNotStatus();
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const updateTgNotStatus = async () => {
    try {
      if (tgNot === true) {
        const data = await axios.post("/subscribe/tg-not", {
          value: 0,
          user_id: userData?.user?.KOD,
        });
      } else {
        const data = await axios.post("/subscribe/tg-not", {
          value: 1,
          user_id: userData?.user?.KOD,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateEmailNotStatus = async () => {
    try {
      if (emailNot === true) {
        const data = await axios.post("/subscribe/email-not", {
          value: 0,
          user_id: userData?.user?.KOD,
        });
      } else {
        const data = await axios.post("/subscribe/email-not", {
          value: 1,
          user_id: userData?.user?.KOD,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateNumber = async () => {
    try {
      const data = await axios.post("/update-number", {
        phone_number: `+${cleanedPhoneNumber}`,
        email: userData?.user?.EMAIL,
      });
      if (data.data.message === "Success") {
        setTgConnectVis(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const subscibeEmail = async () => {
    try {
      const data = await axios.post("/email-not", {
        user_id: userData?.user?.KOD,
        email_not: emailNot,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const subscibeTg = async () => {
    try {
      const data = await axios.post("/tg-not");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setTgNot(userData?.user?.TG_NOT === 1 ? true : false);
  }, [userData]);
  useEffect(() => {
    setEmailNot(userData?.user?.EMAILNOT === 1 ? true : false);
  }, [userData]);
  useEffect(() => {}, [userData]);
  useEffect(() => {}, [tgNot, emailNot]);
  useEffect(() => {}, [userData?.user?.TG_ID]);

  return (
    <Stack
      width={["100%", "100%", "90%", "90%"]}
      margin={"0 auto"}
      marginTop={"20px"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Stack>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            Підписатись на E-mail сповіщення
          </FormLabel>
          <Switch
            name="email_not"
            id="email-alerts"
            size="lg"
            colorScheme="teal"
            onChange={handleEmailSwitch}
            isChecked={emailNot}
          />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            Підписатись на Telegram сповіщення
          </FormLabel>
          <Switch
            name="tg_not"
            id="tg-alerts"
            size="lg"
            colorScheme="teal"
            onChange={handleTgSwitch}
            isChecked={tgNot}
          />
        </FormControl>

        {userData?.user?.PHONE_NUMBER !== null ? null : (
          <Box
            border={"1px solid lightgrey"}
            padding={"0.4rem"}
            borderRadius={"10px"}
            width={"300px"}
          >
            <FormControl>
              <FormLabel color={"red.400"}>
                Приєднайте ваш контактний номер телефону
              </FormLabel>
              <InputMask
                mask="+380 (99) 999-99-99"
                maskChar="_"
                onChange={handlePhoneNumberChange}
                value={phoneNumber}
              >
                {(inputProps) => (
                  <Input
                    type="tel"
                    placeholder="+380 (XX) XXX-XX-XX"
                    {...inputProps}
                    // You can add other Chakra UI input props here
                  />
                )}
              </InputMask>
              <FormHelperText>
                Ця дія необхідна для телеграм верифікації
              </FormHelperText>
            </FormControl>
            <Button onClick={updateNumber} marginTop={"10px"} type="submit">
              Поділитись контактом
            </Button>
          </Box>
        )}
        {userData?.user?.PHONE_NUMBER && (
          <Button
            width={"150px"}
            onClick={() => setChangeNumberAgain((val) => !val)}
          >
            {changeNumberAgain ? "Приховати" : "Змінити тел"}
          </Button>
        )}
        {changeNumberAgain
          ? userData?.user?.PHONE_NUMBER && (
              <Box
                border={"1px solid lightgrey"}
                padding={"0.4rem"}
                borderRadius={"10px"}
                width={"300px"}
              >
                <FormControl>
                  <FormLabel color={"red.400"}>
                    Приєднайте ваш контактний номер телефону
                  </FormLabel>
                  <InputMask
                    mask="+380 (99) 999-99-99"
                    maskChar="_"
                    onChange={handlePhoneNumberChange}
                    value={phoneNumber}
                  >
                    {(inputProps) => (
                      <Input
                        type="tel"
                        placeholder="+380 (XX) XXX-XX-XX"
                        {...inputProps}
                        // You can add other Chakra UI input props here
                      />
                    )}
                  </InputMask>
                  <FormHelperText>
                    Ця дія необхідна для телеграм верифікації
                  </FormHelperText>
                </FormControl>
                <Button onClick={updateNumber} marginTop={"10px"} type="submit">
                  Поділитись контактом
                </Button>
              </Box>
            )
          : null}
        {userData?.user?.TG_ID != undefined ||
        userData?.user?.TG_ID != null ? null : (
          <Tooltip
            label={
              "Для отримання споівщень про оплату рахунку,некомплектності документів і т.д"
            }
            hasArrow
            placement="top"
          >
            <Box
              padding={"0.4rem"}
              borderRadius={"10px"}
              width={"200px"}
              height={"100px"}
              backgroundColor={userData?.user?.TG_ID ? "green.500" : "blue.300"}
            >
              <Link href="https://t.me/ict_drivers_bot" target="_blank">
                <Text>
                  {userData?.user?.TG_ID
                    ? "Телеграм під'єднано"
                    : "Приєднати телеграм бот"}
                </Text>
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
      </Stack>
    </Stack>
  );
};

export default Settings;
