import { Box, Button, Code, Flex, IconButton, List, ListItem, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetOffersQuery } from "../../../redux/apiSlices/apiOffers";
import moment from "moment";
import "moment/locale/uk";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
const Offers = () => {
  const [page, setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(null)
  const limit = 10; // Кількість елементів на сторінці

  // Виклик API для отримання пропозицій з пагінацією
  const { data, error, isLoading } = useGetOffersQuery({ page, limit });



  // Обробники кнопок пагінації
  const handleNextPage = () => {
    if (data && data.offers.length === limit) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

useEffect(()=>{
    setTotalPages(Math.ceil(data?.totalCount / limit))
},[data])

  if (isLoading) return null;
  if (error) return <Text color='red.200'>Не вдалось завантажити пропозицій або їх ще немає</Text>;

  return (
    <Stack>
      <Box height={'60vh'}>
        <Flex alignItems={'center'} textAlign={'center'} marginBottom={'10px'} gap={2}>
        <IconButton icon={<ArrowLeftIcon/>} onClick={handlePreviousPage} isDisabled={page === 1}/>
      
        <Text color={'gray'}> Сторінка  {page} з  {totalPages} </Text>
        <IconButton icon={<ArrowRightIcon/>} onClick={handleNextPage} isDisabled={data.offers.length < limit}/>
      
        </Flex>
        <List display={"flex"} flexDir={"column"} gap={6} styleType="'-'">

         {data.offers.map((offer) => (
            <ListItem borderBottom={'1px solid whitesmoke'} display={'flex'} flexDirection={['column','column','row']} justifyContent={'space-between'} textAlign={'left'} gap={7} key={offer.id}>
                      <Text width={['100%','100%','30%']}  textAlign={'left'}>{offer.email}</Text>
              <Text width={['100%','100%','30%']} textAlign={'start'} whiteSpace={'pre-wrap'}>
                {offer.text}
              </Text>
        
        <Text width={['100%','100%','30%']} textAlign={'start'}>{moment(offer.created_at).format('lll:ss')}</Text>
            </ListItem>
          ))}
        </List>
      </Box>


   
    </Stack>
  );
};

export default Offers;
