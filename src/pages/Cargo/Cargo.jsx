import { Box, Button, SimpleGrid, Spinner, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CargoItem from "../../components/cards/CargoItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllZap } from "../../redux/slices/zap";
import moment from "moment/moment";
import "moment/locale/uk";
import toTimestamp from "../../helpers/date";
import { uniqKrainaZorKrainaR } from "../../helpers/uniqArrayOfZap";
import Flag from 'react-world-flags'
import axios from '../../utils/axios'
const Cargo = () => {
  const dispatch = useDispatch();
  const zap = useSelector((state) => state.zap.zap.items);
  const { status } = useSelector((state) => state.zap.zap);
  const [krainaFilter,setKrainaFilter] = useState(null)
  const [activeFilter,setActiveFilter] = useState(false)
  const userData = useSelector(state => state.auth.data)
  useEffect(() => {
    dispatch(fetchAllZap());
  }, []);
const uniqKraina =   uniqKrainaZorKrainaR(zap);


useEffect(()=>{

},[krainaFilter])
useEffect(()=>{
  if (userData) {
  const activity = async ()=>{
    try {
      const data = await axios.post('/check-activity',{KOD_PERUS:userData?.user?.KOD,PAGE_NAME:"CARGO"})
    } catch (error) {
      console.log(error);
    }
  }
  activity()
  }
    },[userData])
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
<Box>
  <Button colorScheme={activeFilter ? "red":"teal"} onClick={()=>setActiveFilter(val => !val)}>{activeFilter ? "Закрити фільтр":"Відкрити фільтр"}</Button>
</Box>
{activeFilter && <Box display={'flex'} gap={'10px'} flexWrap={'wrap'}>
      
      {uniqKraina && uniqKraina.sort((a,b) => a.countryZav - b.countryRozv).map((item,idx) =>{
        return <Button key={idx} color={"teal"} onClick={()=>{
          setKrainaFilter({
            krainaZav:item.countryZav ,
            krainaRozv: item.countryRozv
          })
        }}>
         
         <Flag width={"20px"} height={'20px'} code={item.countryZav.toLowerCase()}  />  {item.countryZav} - {item.countryRozv} <Flag width={"20px"} height={'20px'} code={item.countryRozv.toLowerCase()}  />  </Button>
      })}
      <Button onClick={()=> {
            return  setKrainaFilter(null)
      }}>Скинути фільтр</Button>
    </Box>}
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
              .filter(item => krainaFilter !== null  ? item.ZAVKRAINA === krainaFilter.krainaZav & item.ROZVKRAINA === krainaFilter.krainaRozv : item)
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
