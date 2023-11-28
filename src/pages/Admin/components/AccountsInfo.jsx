import { Box, Button, Collapse, Divider, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import moment from 'moment';
import 'moment/locale/uk' 
const AccountsInfo = ({item}) => {
    const { isOpen, onToggle } = useDisclosure();
  return (
    <React.Fragment>
    <Box
      textAlign={"left"}
      alignItems={"left"}
      width={"100%"}
      display={"flex"}
      justifyContent={"space-between"}
      gap={"10px"}
      flexDirection={"row"}
      marginTop={"20px"}
      position={'relative'}
   
    >
      <Text width={"100%"}>{item.EMAIL}</Text>
      <Text width={"100%"}>
        {item.PWD ? item.PWD : "Немає"}
      </Text>
      <Text width={"100%"}>
        {item.PHONE_NUMBER ? item.PHONE_NUMBER : "Немає"}
      </Text>
      <Text width={"100%"}>{item.NDOV}</Text>
      <Text width={"100%"}>{item.ZKPO}</Text>
      <Text width={"100%"}>
        {item.TG_ID ? item.TG_ID : "Немає"}
      </Text>
      <Text width={"100%"}>
        {item.TG_NOT === 1 ? "+" : "-"}
      </Text>
      <Text width={"100%"}>
        {item.EMAILNOT === 1 ? "+" : "-"}
      </Text>
      <Button  onClick={onToggle} >{isOpen ? "-" : "+"}</Button>
    </Box>

    <Divider />
    <Collapse mt={4} in={isOpen}>
   <Box>
    <Text>Дата реєстрації: {moment(item.DATREESTR).format('LLL')}</Text>
    <Text>Дата останнього входу: {moment(item.DATELASTENTRY).format('LLL')}</Text>
    <Text>К-сть входів на сайт {item.COUNT}</Text>
   </Box>
        </Collapse>

  </React.Fragment>
  )
}

export default AccountsInfo