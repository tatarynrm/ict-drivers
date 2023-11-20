import {
  Box,
  Button,
  Highlight,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotEnoughDocs,
  fetchPayFullTransportations,
  fetchTransportations,
} from "../../redux/slices/transportations";
import TransportationItem from "../../components/transportation/TransportationItem";
import { SearchIcon } from "@chakra-ui/icons";
import toTimestamp, { toTimeStamp } from "../../helpers/date";
import { getBrowserType } from "../../helpers/checkBrowser";
// import waitLogo from '../../assets/animation/Download_spinner.svg'
const Transportation = () => {
  const [lesson, setLesson] = useState(true);
  const [topButtonsFilter, setTopButtonsFilter] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const { transportation } = useSelector((state) => state.transportation);
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const [activeTransportation, setActiveTransportation] = useState(
    "Перевезення в процесі"
  );
  useEffect(() => {
    userData?.user?.KOD_UR &&
      dispatch(fetchTransportations(userData?.user?.KOD_UR));
  }, [userData]);
  return (
    <Stack
      width={["100%", "100%", "90%", "90%"]}
      margin={"0 auto"}
      marginTop={"20px"}
      display={"flex"}
      flexDirection={"column"}
    >
      {getBrowserType() == "Apple Safari" && (
        <Text color={"red"} fontSize={"30px"}>
          Ви використовуєте браузер Safari.Для коректного відображення усіх
          функцій перейдіть на Google Chrome / Mozzila Firefox
        </Text>
      )}
      <Box
        display={"flex"}
        flexDirection={["column", "column", "column", "row"]}
        justifyContent={[
          "space-between",
          "space-between",
          "space-between",
          "space-between",
        ]}
        width={"100%"}
      >
        <Box width={["100%", "100%", "100%", "100%"]}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
              size="xs"
            />
            <Input
              onChange={(e) => setSearchFilter(e.target.value)}
              width={["100%", "100%", "50%", "100%"]}
              placeholder="Пошук за : № Рахунку, № Заявки, П.І.Б водія , номер авто..."
              _placeholder={{ color: "lightgray" }}
            />
          </InputGroup>
        </Box>
        <Box
          flexDirection={["column", "column", "row", "row"]}
          width={"100%"}
          display={"flex"}
          gap={"10px"}
        >
          <Button
            fontSize={"12px"}
            onClick={() => {
              setActiveTransportation("Перевезення в процесі");
              dispatch(fetchTransportations(userData?.user?.KOD_UR));
            }}
            colorScheme={
              activeTransportation === "Перевезення в процесі"
                ? "green"
                : "teal"
            }
            variant="outline"
          >
            Перевезення в процесі
          </Button>
          <Button
            onClick={() => {
              setActiveTransportation("Оплачені перевезення");
              dispatch(fetchPayFullTransportations(userData?.user?.KOD_UR));
            }}
            fontSize={"12px"}
            colorScheme={
              activeTransportation === "Оплачені перевезення" ? "green" : "teal"
            }
            variant="outline"
          >
            Оплачені перевезення
          </Button>
          <Button
            onClick={() => {
              setActiveTransportation("Некомплект документів");
              dispatch(fetchNotEnoughDocs(userData?.user?.KOD_UR));
            }}
            fontSize={"12px"}
            colorScheme={
              activeTransportation === "Некомплект документів"
                ? "green"
                : "teal"
            }
            variant="outline"
          >
            Некомплект документів
          </Button>
          <Button
            fontSize={"12px"}
            onClick={() => {
              setActiveTransportation("Перевезення в процесі");
              dispatch(fetchTransportations(userData?.user?.KOD_UR));
            }}
            colorScheme="red"
            variant="outline"
          >
            Скинути фільтр
          </Button>
        </Box>
      </Box>
      <SimpleGrid spacing={5} templateColumns="repeat(auto-fill, 1fr)">
        {transportation.status === "loaded" ? (
          transportation?.items
            .filter((item) => {
              return searchFilter.toLowerCase() === ""
                ? item
                : item.ZAVPUNKT.toLowerCase().includes(searchFilter) ||
                    item.ROZVPUNKT?.toLowerCase().includes(searchFilter) ||
                    item.ZAVPUNKT?.toUpperCase().includes(searchFilter) ||
                    item.ROZVPUNKT?.toUpperCase().includes(searchFilter) ||
                    item.ZAVPUNKT?.includes(searchFilter) ||
                    item.ROZVPUNKT?.includes(searchFilter) ||
                    item.VOD?.toLowerCase().includes(searchFilter) ||
                    item.VOD?.toUpperCase().includes(searchFilter) ||
                    item.NUM?.toString().includes(searchFilter);
            })
            .sort((a, b) => toTimestamp(b.DAT) - toTimestamp(a.DAT))
            .filter((item) =>
              topButtonsFilter === 1 ? item.DATDOCP === null : item
            )
            .filter((item) =>
              topButtonsFilter === 2 ? item.DATPNPREESTR !== null : item
            )
            .filter((item) =>
              topButtonsFilter === 3 ? item.PERNEKOMPLEKT !== null : item
            )
            .map((item, idx) => {
              return <TransportationItem key={idx} item={item} />;
            })
        ) : (
          <Stack
            display={"flex"}
            height={"80vh"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              alignItems={"center"}
              textAlign={"center"}
              justifyContent={"center"}
            />
          </Stack>
        )}
      </SimpleGrid>
    </Stack>
  );
};

export default Transportation;
