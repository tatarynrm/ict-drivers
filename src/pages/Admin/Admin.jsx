import {
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  HStack,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import axios from "../../utils/axios.js";
import { CloseIcon } from "@chakra-ui/icons";
import AccountsInfo from "./components/AccountsInfo.jsx";
const Admin = () => {
  const [companies, setCompanies] = useState([]);
  const [statisticAccounVis, setStatisticAccountVis] = useState(false);
  const [blockAccountVis, setBlockAccountVis] = useState(false);
  const [searchCompany, setSearchCompany] = useState("");
  const [choosenCompany, setChoosenCompany] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const [accountsInfo, setAccountsInfo] = useState([]);
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const getAccountsInfo = async () => {
    try {
      const { data } = await axios.get("/usersAccounts");
      console.log(data);
      setAccountsInfo(data);
    } catch (error) {
      console.log(error);
    }
  };
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    // Add other form fields as needed
  });
  const { isOpen, onToggle } = useDisclosure();
  //   useEffect(() => {
  //     getAccountsInfo();
  //   }, []);
  console.log(formData);
  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {}, [searchUser]);
  const getAllContAgents = async () => {
    try {
      if (searchCompany.length > 2) {
        const data = await axios.post("/ur/search", {
          search: searchCompany.toLowerCase(),
        });
        if (data.status === 200) {
          setCompanies(data.data);
          console.log(data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllContAgents();
  }, [searchCompany]);

  const registerAccount = async () => {
    try {
      const data = await axios.post("/registration", {
        email: formData.login,
        password: formData.password,
        KOD_UR: choosenCompany.KOD,
      });
      if ((data.status === 200) & (data.data.errorNum != 1)) {
        alert("Створено нового користувача");
      } else {
        alert("Виникла якась помилка");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(searchUser);
  return (
    <Stack
      width={"90%"}
      margin={"0 auto"}
      marginTop={"20px"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Tabs>
        <TabList>
          <Tab onClick={getAccountsInfo}>Створити аккаунт</Tab>
          <Tab onClick={getAccountsInfo}>Іфнормація про користувачів</Tab>
        </TabList>
        <TabPanels>
          <TabPanel display={"flex"} flexDirection={"column"}>
            {/* input */}


            {/* output */}
            <HStack marginTop={"20px"}>
             
                <Box width={"100%"}>
                  <FormControl
                    display={"flex"}
                    gap={"10px"}
                    flexDirection={"column"}
                  >
                    <Input
                      name="login"
                      width={"50%"}
                      placeholder="Логін"
                      type="email"
                      value={formData.login}
                      onChange={handleInputChange}
                    />
                    <Input
                      name="password"
                      width={"50%"}
                      placeholder="Пароль"
                      type="text"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    {choosenCompany ? null : (
                      <Input
                        width={"70%"}
                        placeholder="Назва або ЄРДПОУ компанії"
                        value={searchCompany}
                        onChange={(e) => setSearchCompany(e.target.value)}
                      />
                    )}
                    {companies.length > 0 &&
                      searchCompany.length > 2 &&
                      companies.map((item, idx) => {
                        return (
                          <Text
                            key={idx}
                            onClick={() => {
                              setChoosenCompany(item);
                              setSearchCompany("");
                            }}
                            padding={"0.4rem"}
                            backgroundColor={"teal"}
                            width={"50%"}
                            borderRadius={"10px"}
                          >
                            {item.DOVINFO}
                          </Text>
                        );
                      })}
                    {choosenCompany && (
                      <Button
                        width={"100%"}
                        colorScheme="teal"
                        position={"relative"}
                      >
                        {choosenCompany.DOVINFO}
                        <CloseIcon
                          color={"red"}
                          onClick={() => setChoosenCompany(null)}
                          position={"absolute"}
                          top={3}
                          right={3}
                        />
                      </Button>
                    )}
                    {choosenCompany !== null && (
                      <Button onClick={registerAccount} type="submit">
                        Створити
                      </Button>
                    )}
                  </FormControl>
                </Box>
         
            </HStack>
          </TabPanel>
          <TabPanel>
            <Input
              placeholder="E-mail,Назва,ЄРДПОУ"
              margin={"10px 0px"}
              width={"300px"}
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
            {accountsInfo.length > 0 && (
              <Box
                textAlign={"left"}
                alignItems={"left"}
                width={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
                gap={"10px"}
                flexDirection={"row"}
                backgroundColor={"blue.900"}
                padding={"0.4rem"}
                borderRadius={"5px"}
              >
                <Text width={"100%"}>Логін</Text>
                <Text width={"100%"}>Пароль</Text>
                <Text width={"100%"}>Моб.номер</Text>
                <Text width={"100%"}>Назва компанії</Text>
                <Text width={"100%"}>ЄРДПОУ</Text>
                <Text width={"100%"}>TG ID</Text>
                <Text width={"100%"}>TG Сповіщення</Text>
                <Text width={"100%"}>EMAIL Сповіщення</Text>
                <Text width={"100%"}>Info</Text>
              </Box>
            )}
            <HStack>
              <Box width={"100%"}>
                {accountsInfo.length > 0 &&
                  accountsInfo
                    .filter((item) => {
                      return searchUser === ""
                        ? item
                        : item.NDOV.toLowerCase().includes(searchUser) ||
                            item.ZKPO.toString()
                              .toLowerCase()
                              .includes(searchUser) ||
                            item.EMAIL.toLowerCase().includes(searchUser);
                    })
                    .map((item, idx) => {
                      return (
                      <AccountsInfo key={idx} item={item}/>
                      );
                    })}
              </Box>
            </HStack>
          </TabPanel>

          {/* 3 панель */}
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default Admin;
