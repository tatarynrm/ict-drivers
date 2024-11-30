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
import TabsComponent from "./TabsComponent.jsx";
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
<TabsComponent/>
    </Stack>
  );
};

export default Admin;
