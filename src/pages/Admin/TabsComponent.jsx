import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import UsersTab from "./TABS/UsersTab";
import ChangeSettingsTab from "./TABS/ChangeSettingsTab";
import Offers from "./TABS/Offers";
import UsersToRegister from "./TABS/UsersToRegister";
import { Link } from "react-router-dom";
import CompanyVisitsChart from "./TABS/CompnayVisitsChart";
import CompanyVisitsChartAll from "./TABS/CompnayVisitsChartAll";
import OffersFromClients from "./TABS/OffersFromClients";

const TabsComponent = () => {
  return (
    <Tabs>
      <TabList display={"flex"} flexWrap={"wrap"}>
        <Tab>Користувачі</Tab>

        <Tab>Змінити налаштування</Tab>
        <Tab>Пропозиції</Tab>
        <Tab>Користувачі до реєстрації</Tab>
        <Tab>Статистика відвідування</Tab>
        <Tab>Статистика відвідування усіх компаній</Tab>
        <Tab>Відгуки щодо нашого сервісу</Tab>
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
          <UsersToRegister />
        </TabPanel>
        <TabPanel>
          <CompanyVisitsChart />
        </TabPanel>
        <TabPanel>
          <CompanyVisitsChartAll />
        </TabPanel>
        <TabPanel>
          <OffersFromClients />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsComponent;
