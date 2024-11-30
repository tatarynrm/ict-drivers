import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import UsersTab from "./TABS/UsersTab";
import ChangeSettingsTab from "./TABS/ChangeSettingsTab";
import Offers from "./TABS/Offers";
import UsersToRegister from "./TABS/UsersToRegister";
import { Link } from "react-router-dom";

const TabsComponent = () => {
  return (
    <Tabs>
      <TabList display={"flex"} flexWrap={"wrap"}>
 
        <Tab>Користувачі</Tab>
    
        <Tab>Змінити налаштування</Tab>
        <Tab>Пропозиції</Tab>
        <Tab>Користувачі до реєстрації</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <UsersTab />
        </TabPanel>

        <TabPanel>
          <ChangeSettingsTab />
        </TabPanel>

        <TabPanel>
          <Offers />
        </TabPanel>
        <TabPanel>
        <UsersToRegister/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsComponent;
