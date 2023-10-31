import { FormControl, FormLabel, Stack, Switch, Text } from "@chakra-ui/react";
import React from "react";

const Settings = () => {
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
          <Switch name="email_not" id="email-alerts" size='lg' colorScheme='teal'  />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
           Підписатись на Telegram сповіщення
          </FormLabel>
          <Switch id="email-alerts" size='lg' colorScheme='teal'  />
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default Settings;
