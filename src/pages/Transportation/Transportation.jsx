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
import { fetchTransportations } from "../../redux/slices/transportations";
import TransportationItem from "../../components/transportation/TransportationItem";
import { SearchIcon } from "@chakra-ui/icons";
import toTimestamp, { toTimeStamp } from "../../helpers/date";
// import waitLogo from '../../assets/animation/Download_spinner.svg'
const Transportation = () => {
  const [lesson, setLesson] = useState(true);
  const [topButtonsFilter, setTopButtonsFilter] = useState(null);
  // const [fetchedData,setFetchedData] = useState('')
  // const [inProgress,setInProgress] = useState(null)
  // const [inProblem,setInProblem] = useState(null)
  // const [inPay,setInPay] = useState(null)
  const [searchFilter, setSearchFilter] = useState("");
  const { transportation } = useSelector((state) => state.transportation);
  const userData = useSelector((state) => state.auth.data);
  const setProgress = (option) => {
    switch (option) {
      case 1:
        setTopButtonsFilter(1);
        break;
      case 2:
        setTopButtonsFilter(2);
        break;
      case 3:
        setTopButtonsFilter(3);
        break;

      default:
        break;
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransportations(userData?.user.KOD_UR));
  }, [userData]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLesson(false);
  //   }, 7000);
  // }, []);
console.log(transportation);
  return (
    <Stack
      width={["100%", "100%", "90%", "90%"]}
      margin={"0 auto"}
      marginTop={"20px"}
      display={"flex"}
      flexDirection={"column"}
    >
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
            onClick={() => setProgress(1)}
            colorScheme="teal"
            variant="outline"
          >
            Перевезення в процесі
          </Button>
          <Button
            fontSize={"12px"}
            onClick={() => setProgress(2)}
            colorScheme="teal"
            variant="outline"
          >
            Оплачені перевезення
          </Button>
          <Button
            fontSize={"12px"}
            onClick={() => setProgress(3)}
            colorScheme="teal"
            variant="outline"
          >
            Некомплект документів
          </Button>
          <Button
            fontSize={"12px"}
            onClick={() => setTopButtonsFilter(null)}
            colorScheme="red"
            variant="outline"
          >
            Скинути фільтр
          </Button>
        </Box>
      </Box>
      {/* {lesson && (
        <Box>
          <Highlight
            query="курсор"
            styles={{ px: "1", py: "1", bg: "orange.100", borderRadius: "4px" }}
          >
            Наведіть курсор на будь-яку іконку, та отримайте додаткову
            інформацію.
          </Highlight>
        </Box>
      )} */}
      {/* {transportation?.items && <Text color={"green.400"} fontWeight={"bold"}>К-сть перевезень у процесі: {transportation?.items.length}</Text> } */}
      <SimpleGrid spacing={5} templateColumns="repeat(auto-fill, 1fr)">
        {transportation?.items ? (
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
          // <Spinner
          //   thickness="4px"
          //   speed="0.65s"
          //   emptyColor="gray.200"
          //   color="blue.500"
          //   size="xl"
          //   alignItems={"center"}
          //   textAlign={"center"}
          //   justifyContent={"center"}
          // />
          'Download'
        )}
      </SimpleGrid>
    </Stack>
  );
};

export default Transportation;
