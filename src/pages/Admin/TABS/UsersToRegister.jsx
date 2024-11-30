import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Img,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import verifyPmg from "../../../assets/png/admin-user-create/verify.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../../styles/usersToRegisterCardSwiper.css";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
const UsersToRegister = () => {
  const [usersToRegister, setUSersToRegister] = useState([]);
  const [companyCheck,setCompanyCheck] = useState([])
  const [filterUserState,setFilterUserState] = useState(1 || filterUserState)
  const getUsersToRegister = async () => {
    try {
      const data = await axios.get("/offers/users-to-register");
 console.log(data);
 

      if (data.status === 200) {
        setUSersToRegister(data.data.users.rows);
        setFilterUserState(data.data.statuses[0].id)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkCompany = async (item) =>{
    try {
        const data = await axios.post('/ur/search-pre-register',{...item});
        console.log(data.data);
        if (data.status === 200) {
            setCompanyCheck(data.data)
        }
        
    } catch (error) {
        console.log(error);
        
    }
  }

  useEffect(() => {
    getUsersToRegister();
  }, []);


  console.log(companyCheck);
  const handlePrevClick = () => {
    console.log('Previous button clicked');
    setCompanyCheck([])
    // Add any other functionality you want for the Prev button
  };

  const handleNextClick = () => {
    console.log('Next button clicked');
    setCompanyCheck([])
    // Add any other functionality you want for the Next button
  };

  useEffect(() => {
    const prevButton = document.querySelector('.swiper-button-prev');
    const nextButton = document.querySelector('.swiper-button-next');

    if (prevButton) {
      prevButton.addEventListener('click', handlePrevClick);
    }
    if (nextButton) {
      nextButton.addEventListener('click', handleNextClick);
    }

    // Cleanup the event listeners on component unmount
    return () => {
      if (prevButton) {
        prevButton.removeEventListener('click', handlePrevClick);
      }
      if (nextButton) {
        nextButton.removeEventListener('click', handleNextClick);
      }
    };
  }, [companyCheck]); // Empty dependency array to run once on mount
  return (
    <Stack position={"relative"} width={"100%"}>
      <Flex gap={2} flexWrap={"wrap"}>
        <Button onClick={()=>setFilterUserState(1)} fontSize={12} color={filterUserState === 1 && 'green'}>В очікуванні</Button>
        <Button onClick={()=>setFilterUserState(2)} fontSize={12} color={filterUserState === 2 && 'green'}>Зареєстровані</Button>
        <Button onClick={()=>setFilterUserState(3)} fontSize={12} color={filterUserState === 3 && 'green'}>Відхилені</Button>
      </Flex>

      <Img
        style={{ filter: "blur(5px)" }}
        position={"absolute"}
        width={"100px"}
        bottom={20}
        left={20}
        src={verifyPmg}
        alt="verify"
      />
      <Img
        style={{ filter: "blur(5px)" }}
        position={"absolute"}
        width={"100px"}
        top={35}
        right={10}
        src={verifyPmg}
        alt="verify"
      />
      <Img
        style={{ filter: "blur(5px)" }}
        position={"absolute"}
        width={"100px"}
        top={50}
        left={200}
        src={verifyPmg}
        alt="verify"
      />
      <Img
        style={{ filter: "blur(5px)" }}
        position={"absolute"}
        width={"100px"}
        bottom={100}
        right={100}
        src={verifyPmg}
        alt="verify"
      />
      <Box
        backgroundColor={"transparent"}
        width={["100%", "80%", "70%", "60%"]}
        height={"70vh"}
        margin={"0 auto"}
      >
        <Swiper
          style={{
            height: "600px",
            maxHeight: "1200px",
            margin: "0px",
            padding: "0px",
          }}
          pagination={{
            type: "fraction",
          }}
          spaceBetween={10}
          navigation={true}

          modules={[Pagination, Navigation]}
          className="mySwiper"
          
        >
          <Stack width={"100%"}>
            {usersToRegister &&
              usersToRegister.filter(item => item.status === filterUserState).map((item, idx) => {
                return (
                  <SwiperSlide
                    style={{ position: "relative" }}
                    className="user_card_swiper"
                    key={idx}
                  >
                    <Flex
                      flexDirection={["column", "column", "row"]}
                      justifyContent={"space-around"}
                    >
                      <Box
                        maxWidth={"100%"}
                        width={["100%", "100%", "40%"]}
                        height={"100%"}
                        backgroundColor={"teal.700"}
                        padding={4}
                        borderRadius={10}
                      >
                        <Text fontSize={"2xl"}> {item.company}</Text>
                        <Text marginTop={14}>{item.surname}</Text>
                        <Text>{item.name}</Text>
                        <Text>{item.last_name}</Text>
                        <Divider backgroundColor={"red"} />

                        <Text marginTop={10}>{item.phone_number}</Text>
                        <Text>{item.email}</Text>
                        <Text>{item.pwd}</Text>
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <Button onClick={() => checkCompany(item)} marginTop={10} textAlign={"center"}>
                            Перевірити
                          </Button>
                        </Box>
                      </Box>

                      <Box
                        width={["100%", "100%", "40%"]}
                        height={"100%"}
                        padding={4}
                        borderRadius={10}
                        backgroundColor={companyCheck.length > 0 ? "green.200" : "transparent"}
                      >
             {companyCheck?.email?.length > 0  || companyCheck?.phone?.length > 0 || companyCheck?.name_kod?.length > 0  ?
             <>
                        <Box>
                            <Heading size={'xs'}>Пошук по компанії</Heading>
                            {companyCheck?.name_kod?.lenght > 0 ?  companyCheck?.name_kod.map((item,idx) =>{
                                return <Text>dsasda</Text>
                            }) : <Text color={'red'}>Пошук по назві компанії не  дав результатів</Text>}
                     
                        </Box>
                        <Box>
                            <Heading size={'xs'}>Пошук по електронній адресі</Heading>
                            {companyCheck?.phone?.length > 0 ? companyCheck?.phone.map((item,idx) =>{
                                 return <VStack key={idx} backgroundColor={'green'} borderRadius={10} alignItems={'center'} textAlign={'center'}>
                                 <Text>{item.VAL}</Text>
                                 <Text>{item.WHO}</Text>
                                 <Text>{item.COMPANY_NAME}</Text>
                             </VStack>
                            }) : <Text color={'red'}>Пошук по e-mail не  дав результатів</Text>}
                        </Box>
                        <Box>
                            <Heading size={'xs'}>Пошук по номеру телефону</Heading>
                            {companyCheck?.email?.map((item,idx) =>{
                                return <VStack key={idx} backgroundColor={'green'} borderRadius={10} alignItems={'center'} textAlign={'center'}>
                                    <Text>{item.VAL}</Text>
                                    <Text>{item.WHO}</Text>
                                    <Text>{item.COMPANY_NAME}</Text>
                                </VStack>
                            })}
                        </Box>
             </> :    
             companyCheck?.email?.length === 0  || companyCheck?.phone?.length === 0 || companyCheck?.name_kod?.length === 0  ?
             <Heading size={'lg'} color={'red'}>ЖОДНИХ РЕЗУЛЬТАТІВ!</Heading> : null
             }
                      </Box>
                    </Flex>

                    <Box
                      padding={10}
                      width={"100%"}
                      display={"flex"}
                      justifyContent={"space-between"}
                      position={"fixed"}
                      bottom={0}
                      left={0}
                    >
                      <Button colorScheme="red">Відхилити</Button>
                      <Button colorScheme="green">Зареєструвати</Button>
                    </Box>
                  </SwiperSlide>
                );
              })}
          </Stack>
        </Swiper>
      </Box>
    </Stack>
  );
};

export default UsersToRegister;
