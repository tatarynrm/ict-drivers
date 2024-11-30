import { Box, Button, Input, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from '../../../utils/axios'
import { useSelector } from 'react-redux'
import { DeleteIcon } from '@chakra-ui/icons'
const ChangeSettingsTab = () => {
  const userData = useSelector(state => state.auth.data)
  const [search, setSearch] = useState('')
  const [carriers, setCarriers] = useState([])
  const [changeCompany, setChangeCompany] = useState(false)
  const [perData, setPerData] = useState(null)

  const handlePerData = (item) => {
    setPerData({
      name: item.NDOV,
      kod: item.KOD,
    });

  };

  useEffect(() => {
    if (search.length > 2) {
      const getContrAgents = async (search) => {
        try {
          const { data } = await axios.post("/ur/search", { search: search.toLowerCase() });
          setCarriers(data);
        } catch (error) {
          console.log(error);
        }
      };
      getContrAgents(search);
    }
    if (search.length === 0) {
      setTimeout(() => {
        setCarriers([]);
      }, 500);
    }
  }, [search]);

  const changePerAccount = async () =>{
    try {
      const values = {
        kod_ur:perData?.kod,
        kod:userData?.user?.KOD
      }
      const data = await axios.post('/update-company',values)
  
      
if (data.data.status === 200) {
  window.location.reload()
}
      
    } catch (error) {
      console.log(error)
     
      
    }
  }
  return (
    <Stack>

      {userData?.user?.NUR && <Text>Перегляд як : {userData?.user?.NUR}</Text>}
      <Button colorScheme={changeCompany ? 'red' : "green"} onClick={() => setChangeCompany(val => !val)}> {changeCompany ? "Закрити" : "Змінити компанію до перегляду"}</Button>

      {changeCompany && <Stack>

        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Пошук компанії за назвою' />
        {carriers.length > 0
          ? carriers.map((item, idx) => {
            return (
              <Box justifyContent={'space-between'} backgroundColor={'blue.700'} padding={'10px'} display={'flex'} gap={'4px'} alignItems={'center'} textAlign={'center'} className="carriers__item" key={idx}>
                <Text className="">{item.NDOV}</Text>

                <Button
                  onClick={(e) => {
                    handlePerData(item)
                    setSearch('')
                  }}
                  className="normal"

                  style={{ cursor: "context-menu", padding: "0.4rem" }}
                >
                  Обрати
                </Button>
              </Box>
            );
          })
          : "Напишіть назву компанії"}
      </Stack>}

      {perData && <>
        <Box position={'relative'} alignItems={'center'} display={'flex'} flexDir={'column'} backgroundColor={'green'} padding={'10px'} >
          <Text>Перевізник:</Text>
          <Text>{perData?.name}</Text>
          <DeleteIcon fontSize={24} color={'red'} position={'absolute'} right={4} top={4} onClick={() => setPerData(null)} />
        </Box>

        <Button onClick={changePerAccount} >Змінити перегляд як {perData?.name}</Button>
      </>
      }

    </Stack>
  )
}

export default ChangeSettingsTab