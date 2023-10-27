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
const Home = () => {
  const user = useSelector((state) => state.user.user.items[0]);
  const data = useSelector((state) => state.user.user.data);
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
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
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <Card textAlign={"center"} alignItems={"center"}>
          <CardHeader>
            <Heading size="md">Початок співпраці</Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <Text
              fontWeight={"bold"}
              fontSize={"20px"}
              style={{ color: "green" }}
            >
              {moment(user?.DATZAV_FIRST).format("LL")}
            </Text>
          </CardBody>
          <CardFooter>
            <Button>Переглянути</Button>
          </CardFooter>
        </Card>
        <Card textAlign={"center"} alignItems={"center"}>
          <CardHeader>
            <Heading size="md">Виконано перевезень за весь період</Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <Text
              fontWeight={"bold"}
              fontSize={"20px"}
              style={{ color: "green" }}
            >
              {user?.KP_ALL}
            </Text>
          </CardBody>
          <CardFooter>
            <Button>Переглянути</Button>
          </CardFooter>
        </Card>
        <Card textAlign={"center"} alignItems={"center"}>
          <CardHeader>
            <Heading size="md">Виконано перевезень за минулий рік</Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <Text
              fontWeight={"bold"}
              fontSize={"20px"}
              style={{ color: "green" }}
            >
              {user?.KP_YEAR_PREV}
            </Text>
          </CardBody>
          <CardFooter>
            <Button>Переглянути</Button>
          </CardFooter>
        </Card>
        <Card textAlign={"center"} alignItems={"center"}>
          <CardHeader>
            <Heading size="md">Виконано перевезень за поточний рік</Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <Text
              fontWeight={"bold"}
              fontSize={"20px"}
              style={{ color: "green" }}
            >
              {user?.KP_YEAR_CURR}
            </Text>
          </CardBody>
          <CardFooter>
            <Button>Переглянути</Button>
          </CardFooter>
        </Card>
        <Card textAlign={"center"} alignItems={"center"}>
          <CardHeader>
            <Heading size="md">Виконано перевезень за минулий місяць</Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <Text
              fontWeight={"bold"}
              fontSize={"20px"}
              style={{ color: "green" }}
            >
              {user?.KP_MONTH_PREV}
            </Text>
          </CardBody>
          <CardFooter>
            <Button>Перейти доперевезень</Button>
          </CardFooter>
        </Card>
        <Card textAlign={"center"} alignItems={"center"}>
          <CardHeader>
            <Heading size="md">Виконано перевезень за поточний місяць</Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <Text
              fontWeight={"bold"}
              fontSize={"20px"}
              style={{ color: "green" }}
            >
              {user?.KP_MONTH_CURR}
            </Text>
          </CardBody>
          <CardFooter>
            <Button>Перейти до перевезень</Button>
          </CardFooter>
        </Card>
        <Card textAlign={"center"} alignItems={"center"}>
          <CardHeader>
            <Heading size="md">Останнє перевезення</Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <Text
              fontWeight={"bold"}
              fontSize={"20px"}
              style={{ color: "green" }}
            >
              {moment(user?.DATZAV_LAST).format("LL")}
            </Text>
          </CardBody>
          <CardFooter>
            <Button>Перейти до перевезення</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>


      <Stack
        display={"flex"}
        gap={"30px"}
        margin={"0 auto"}
        width={"100%"}
        height={"400px"}
      >
       <Box>
       <ThisYearChart item={data} />
       </Box>
      <Box>
      <LastYearChart item={data} />
      </Box>
      </Stack>
    </Stack>
  );
};

export default Home;
