import { Card, CardHeader, CardBody, CardFooter, Stack, Box, Heading, Text, StackDivider, Divider, Tooltip, Menu, MenuButton, MenuList, Portal, MenuItem, Button, useToast } from '@chakra-ui/react'
import moment from "moment/moment";
import "moment/locale/uk";
import { ChevronDownIcon, EmailIcon, InfoIcon, PhoneIcon } from '@chakra-ui/icons';
const CargoItem = ({item}) => {
    const toast = useToast();
  return (
    <Card>
    <CardHeader>
      <Heading size='md'>{item.ZAV} <br />-<br/> {item.ROZV}</Heading>
    </CardHeader>
    <CardBody>
      <Stack 
      gap={'10px'}
      flexDir={["column","column","row","row"]}
      display={["flex","flex","flex","flex"]} divider={<StackDivider  />} spacing='1'>
        <Box>
          <Heading size='xs' textTransform='uppercase'>
         Дата
          </Heading>
          <Text pt='2' fontSize='sm'>
          {moment(item.DATUPDATE).format('L')}
          </Text>
        </Box>
        <Box>
          <Heading size='xs' textTransform='uppercase'>
            Потреба в авто
          </Heading>
          <Text pt='2' fontSize='sm'>
            <span style={{color:"green"}}>Необхідно {item.KILAMACT}</span> - <span style={{color:"red"}}>Закрито {item.KILAMZAKR}</span>
          </Text>
        </Box>
        <Box>
          <Heading size='xs' textTransform='uppercase'>
            Відповідальний менеджер
          </Heading>
          <Box height={"100%"}>
            <Text>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {item.PIP}
                </MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem>
                      <a href={`tel:${item.PERMENTEL}`}>Зателефонувати</a>
                    </MenuItem>
                    <MenuItem>
                      {" "}
                      <a href={`mailto:${item.PERMENEMAIL}`}>Написати E-mail</a>
                    </MenuItem>
                    {/* <MenuItem onClick={() => {navigator.clipboard.writeText(item.PERMENTEL)}}> */}
                    <MenuItem
                      onClick={() => {
                        navigator.clipboard.writeText(item.PERMENTEL);
                        toast({
                          title: "Ви скопіювали номер телефону.",
                          description: `${item.PERMENPIPFULL} ${item.PERMENTEL}`,
                          status: "success",
                          duration: 4000,
                          isClosable: true,
                        });
                      }}
                    >
                      Скопіювати
                      <PhoneIcon />
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigator.clipboard.writeText(item.PERMENEMAIL);
                        toast({
                          title: "Ви скопіювали e-mail.",
                          description: `${item.PERMENPIPFULL} ${item.PERMENEMAIL}`,
                          status: "success",
                          duration: 4000,
                          isClosable: true,
                        });
                      }}
                    >
                      Скопіювати <EmailIcon />
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Text>
          </Box>
        </Box>
      </Stack>
    </CardBody>
  </Card>
  )
}

export default CargoItem