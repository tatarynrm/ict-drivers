import { Box, SimpleGrid, Spinner, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import CargoItem from "../../components/cards/CargoItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllZap } from "../../redux/slices/zap";
import moment from "moment/moment";
import "moment/locale/uk";
import toTimestamp from "../../helpers/date";
const Cargo = () => {
  const dispatch = useDispatch();
  const zap = useSelector((state) => state.zap.zap.items);
  const { status } = useSelector((state) => state.zap.zap);
  useEffect(() => {
    dispatch(fetchAllZap());
  }, []);
  console.log(zap.length);
  return (
    <>
      {zap.length <= 0 ? (
        <Stack
          display={"flex"}
          width={"100%"}
          height={"70vh"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Stack>
      ) : (
        <Stack
          width={"90%"}
          margin={"0 auto"}
          marginTop={"20px"}
          display={"flex"}
          flexDirection={"column"}
        >
          <SimpleGrid
            spacing={5}
            templateColumns={[
              "repeat(auto-fill, minmax(1fr))",
              "repeat(auto-fill, minmax(500px,1fr))",
              "repeat(auto-fill, minmax(500px,1fr))",
              "repeat(auto-fill, minmax(500px,1fr))",
            ]}
          >
            {zap
              .filter((item) => item.DATUPDATE)
              .sort(
                (a, b) => toTimestamp(b?.DATUPDATE) - toTimestamp(a?.DATUPDATE)
              )
              .map((item, idx) => {
                return <CargoItem key={idx} item={item} />;
              })}
          </SimpleGrid>
        </Stack>
      )}
    </>
  );
};

export default Cargo;
