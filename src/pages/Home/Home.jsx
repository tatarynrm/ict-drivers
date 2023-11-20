import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
  Text,
  Button,
  Stack,
  Divider,
  AspectRatio,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchTwoYearsData, fetchUser } from "../../redux/slices/user";
import moment from "moment";
import "moment/locale/uk";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ThisYearChart from "../../components/charts/ThisYearChart";
import LastYearChart from "../../components/charts/LastYearChart";
import TwoYearsAgo from "../../components/charts/TwoYearsAgo";
import { getBrowserType } from "../../helpers/checkBrowser";
const Home = () => {
  const user = useSelector((state) => state.user.user.items[0]);
  const data = useSelector((state) => state.user.user.data);
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const [userLocation, setUserLocation] = useState([]);
  const sucessfulLookup = async (position) => {
    // const { latitude, longitude } = position.coords;
    // const data = await fetch(
    //   `https://api.bigdatacloud.net/data/reverse-geocode-client?${latitude}&${longitude}&localityLanguage=uk`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const values = {
    //       country: data.countryName,
    //       city: data.city,
    //       counter: 1,
    //     };
    //     setUserLocation(data);
    //   });
    const { latitude, longitude } = position.coords;
    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?language=uk';
    const params = {
        latlng: `${latitude},${longitude}`,
        key: 'AIzaSyCL4bmZk4wwWYECFCW2wqt7X-yjU9iPG2o',
    };
    return axios.get(baseUrl, { params })
        .then(response => {
            if (response.status === 200) {
                const result = response.data;
                if (result.results.length > 0) {
                    const address =  result.results[0];
                    setUserLocation(address);
                    return address;
                } else {
                    return 'Адресу не знайдено.';
                }
            } else {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        })
        .catch(error => {
            console.error(error.message);
            return 'Помилка при виконанні запиту.';
        });
  };

  useEffect(() => {
    if (userData) {
      dispatch(fetchUser(userData?.user.KOD_UR));
    }
  }, [userData]);
  useEffect(() => {
    if (userData) {
      dispatch(fetchTwoYearsData(userData?.user.KOD_UR));
    }
  }, [userData]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(sucessfulLookup);
  }, []);
console.log(userLocation);
  return (
    <Stack
      width={["90%", "90%", "70%", "70%"]}
      margin={"0 auto"}
      marginTop={"20px"}
      display={"flex"}
      flexDirection={"column"}
    >

      <SimpleGrid
        spacing={100}
        templateColumns="repeat(auto-fill, minmax(1fr, 1fr))"
      >
        <Card textAlign={"left"} alignItems={"center"}>
          <CardHeader>
            <Heading size="md">Інформація про нашу співпрацю</Heading>
          </CardHeader>
          <Divider />
          <CardBody display={"flex"} flexDirection={"column"} flexWrap={"wrap"}>
            <Box
              height={"auto"}
              display={"flex"}
              alignItems={"center"}
              gap={"20px"}
              marginBottom={"10px"}
            >
              <Heading as="h3" size="md">
                Початок співпраці:
              </Heading>
              <Text fontWeight={"bold"} fontSize={"20px"} color={"teal.300"}>
                {user?.DATZAV_FIRST
                  ? moment(user?.DATZAV_FIRST).format("LL")
                  : ""}
              </Text>
            </Box>
            <Divider />
            <Box
              height={"auto"}
              display={"flex"}
              alignItems={"center"}
              gap={"20px"}
              marginBottom={"10px"}
            >
              <Heading as="h3" size="md">
                Виконано перевезень за весь період:
              </Heading>
              <Text fontWeight={"bold"} fontSize={"20px"} color={"teal.300"}>
                {user?.KP_ALL}
              </Text>
            </Box>
            <Divider />
            <Box
              height={"auto"}
              display={"flex"}
              alignItems={"center"}
              gap={"20px"}
              marginBottom={"10px"}
            >
              <Heading as="h3" size="md">
                Виконано перевезень за минулий рік:
              </Heading>
              <Text fontWeight={"bold"} fontSize={"20px"} color={"teal.300"}>
                {user?.KP_YEAR_PREV}
              </Text>
            </Box>
            <Divider />
            <Box
              height={"auto"}
              display={"flex"}
              alignItems={"center"}
              gap={"20px"}
              marginBottom={"10px"}
            >
              <Heading as="h3" size="md">
                Виконано перевезень за поточний рік:
              </Heading>
              <Text fontWeight={"bold"} fontSize={"20px"} color={"teal.300"}>
                {user?.KP_YEAR_CURR}
              </Text>
              {/* {user?.KP_YEAR_CURR & user?.KP_YEAR_PREV &&
              user?.KP_YEAR_CUR > user?.KP_YEAR_PREV ? (
                <Stat>
                  <StatHelpText>
                    <StatArrow type="increase" />

                  </StatHelpText>
                </Stat>
              ) : (
                <Stat>
       
                  <StatHelpText>
                    <StatArrow type="decrease" />

             
                  </StatHelpText>
                </Stat>
              )} */}
            </Box>
            <Divider />
            <Box
              height={"auto"}
              display={"flex"}
              alignItems={"center"}
              gap={"20px"}
              marginBottom={"10px"}
            >
              <Heading as="h3" size="md">
                Виконано перевезень за минулий місяць:
              </Heading>
              <Text fontWeight={"bold"} fontSize={"20px"} color={"teal.300"}>
                {user?.KP_MONTH_PREV}
              </Text>
            </Box>
            <Divider />
            <Box
              height={"auto"}
              display={"flex"}
              alignItems={"center"}
              gap={"20px"}
              marginBottom={"10px"}
            >
              <Heading as="h3" size="md">
                Виконано перевезень за поточний місяць:
              </Heading>
              <Text fontWeight={"bold"} fontSize={"20px"} color={"teal.300"}>
                {user?.KP_MONTH_CURR}
              </Text>
            </Box>
            <Divider />
            <Box
              height={"auto"}
              display={"flex"}
              alignItems={"center"}
              gap={"20px"}
              marginBottom={"10px"}
            >
              <Heading as="h3" size="md">
                Останнє перевезення:
              </Heading>
              <Text fontWeight={"bold"} fontSize={"20px"} color={"teal.300"}>
                {user?.DATZAV_LAST
                  ? moment(user?.DATZAV_LAST).format("LL")
                  : ""}
              </Text>
            </Box>
            <Divider />
          </CardBody>
        </Card>
      </SimpleGrid>
      {/* TABSSSSSSSSSSSSS */}
      <Stack
        display={"flex"}
        gap={"30px"}
        margin={"0 auto"}
        width={"100%"}
        height={"400px"}
      >
        <Tabs>
          <TabList>
            <Tab>Графік перевезень за поточний рік</Tab>
            <Tab>Графік перевезень за минулий рік</Tab>
            <Tab>Два роки тому</Tab>
          </TabList>

          <TabPanels>
            <TabPanel height={"300px"}>
              <Box>
                <ThisYearChart item={data} />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box>
                <LastYearChart item={data} />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box>
                <TwoYearsAgo item={data} />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
      {/* TABSSSSSSSSSSSSS */}
    </Stack>
  );
};

export default Home;
