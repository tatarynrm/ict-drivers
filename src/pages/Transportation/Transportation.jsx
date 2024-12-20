import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Highlight,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spinner,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotEnoughDocs,
  fetchPayFullTransportations,
  fetchTransportations,
  fetchTransportationsInfo,
} from "../../redux/slices/transportations";
import TransportationItem from "../../components/transportation/TransportationItem";
import { EmailIcon, SearchIcon, ViewIcon } from "@chakra-ui/icons";
import toTimestamp, { toTimeStamp } from "../../helpers/date";
import { getBrowserType } from "../../helpers/checkBrowser";
import moment from "moment/moment";
import "moment/locale/uk";
import { BsFillGrid3X3GapFill, BsList } from "react-icons/bs";
import CargoItem from "../../components/transportation/CargoItem";
// import waitLogo from '../../assets/animation/Download_spinner.svg'
const Transportation = () => {
  const [listType,setListType] = useState('grid')
  const [lesson, setLesson] = useState(true);
  const [topButtonsFilter, setTopButtonsFilter] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const { transportation } = useSelector((state) => state.transportation);


  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

const listTypeLocal = localStorage.getItem('list_type')

  const [activeTransportation, setActiveTransportation] = useState(
    "Перевезення в процесі"
  );
  useEffect(() => {
    userData?.user?.KOD_UR &&
      dispatch(fetchTransportations(userData?.user?.KOD_UR));
  }, [userData]);
  useEffect(() => {
    userData?.user?.KOD_UR &&
      dispatch(fetchTransportationsInfo(userData?.user?.KOD_UR));
  }, [userData]);
  useEffect(() => {
    if (userData) {
      const activity = async () => {
        try {
          const data = await axios.post('/check-activity', { KOD_PERUS: userData?.user?.KOD, PAGE_NAME: "MY TRANSPORTATION" })
        } catch (error) {
          console.log(error);
        }
      }
      activity()
    }
  }, [userData])

  useEffect(()=>{
if (listTypeLocal) {


  setListType(listTypeLocal);

  
}else {
  localStorage.setItem('list_type','grid')
  setListType('grid')
  
}
  },[listTypeLocal,listType])
  return (
    <Stack
      width={["100%", "100%", "90%", "90%"]}
      margin={"0 auto"}
      marginTop={"20px"}
      display={"flex"}
      flexDirection={"column"}
    >
      {/* {getBrowserType() == "Apple Safari" && (
        <Text color={"red"} fontSize={"30px"}>
          Ви використовуєте браузер Safari.Для коректного відображення усіх
          функцій перейдіть на Google Chrome / Mozzila Firefox
        </Text>
      )} */}
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
        <Box display={'flex'} gap={'10px'} flexDir={'column'} width={["100%", "100%", "100%", "100%"]}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
              size="xs"
            />
            <Input
              onChange={(e) => setSearchFilter(e.target.value)}
              width={["100%", "100%", "50%", "100%"]}
              placeholder="Пошук за : Сума перевезення, П.І.Б водія , номер авто..."
              _placeholder={{ color: "lightgray" }}
            />
          </InputGroup>
          <Box display={'flex'} gap={'10px'}>
            <Button onClick={()=>{
              localStorage.setItem('list_type','grid')
              setListType('grid')
            }} leftIcon={<BsFillGrid3X3GapFill />}fontSize={'14px'} colorScheme={listType === 'grid' ? 'green' : 'gray'} >Сітка</Button>
            <Button onClick={()=>{
                 localStorage.setItem('list_type','list')
                 setListType('list')
            }} leftIcon={<BsList />} size={'md'} fontSize={'14px'} colorScheme={listType === 'list' ? 'green' : 'gray'}>Список</Button>
          </Box>
        </Box>
      </Box>

      <SimpleGrid padding={[4, 1]} spacing={3} columns={listType === 'grid' ? [1, 2, 3, 5] : [1]} >



        {transportation.status === 'loaded' ? transportation?.info?.filter(item => {
          return searchFilter.toLowerCase() === ""
            ? item
            : item.LINE1?.toLowerCase().includes(searchFilter) ||
            item.LINE1?.toLowerCase().includes(searchFilter) ||
            item.LINE3?.toLowerCase().includes(searchFilter) ||
            item.LINE3?.toLowerCase().includes(searchFilter) ||
            item.BORGP?.toString().toLowerCase().includes(searchFilter) ||
            item.BORGP?.toString().toLowerCase().includes(searchFilter)

        }).map((item, idx) => {
          return <CargoItem listType={listType} key={idx} idx={idx} item={item} />
        }) :
          <Stack
            display={"flex"}
            height={"80vh"}
            alignItems={"center"}
            justifyContent={"center"}
            textAlign={'center'}
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
          </Stack>}




      </SimpleGrid>
    </Stack>
  );
};

export default Transportation;
