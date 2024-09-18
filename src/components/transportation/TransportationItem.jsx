import {
  ArrowDownIcon,
  ArrowForwardIcon,
  AttachmentIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  CopyIcon,
  EmailIcon,
  InfoIcon,
  PhoneIcon,
  QuestionOutlineIcon,
  StarIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Divider,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Stack,
  TagLabel,
  Text,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import moment from "moment/moment";
import "moment/locale/uk";

const TransportationItem = ({ item }) => {
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();
  return (
    <>
      <Button
        hover={"none"}
        backgroundColor={item.DATDOCP === null ? "pink.900" : ""}
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "left",
          // backgroundColor:isOpen ? "#1b7c9b":""
          backgroundColor: isOpen ? "teal" : "",
        }}
        width={["100%", "100%", "100%", "100%"]}
        flexDirection={["column", "column", "row", "row", "row"]}
        height={["100%", "100%", "40px", "40px", "40px"]}
        textAlign={"left"}
        onClick={onToggle}
        margin={["0 auto"]}
      >
        {(item.PERNEKOMPLEKT !== null) & item.DATPNPREESTR
          ? null
          : item.DATPNPREESTR && (
              <CheckCircleIcon
                style={{
                  position: "absolute",
                  top: "-5px",
                  left: "0",
                  color: "green",
                }}
              />
            )}

        {item?.DATPNPREESTR === null
          ? null
          : item.PERNEKOMPLEKT && (
              <Tooltip hasArrow label={item.PERNEKOMPLEKT} placement="top">
                <WarningTwoIcon
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    left: "0px",
                    color: "red",
                  }}
                />
              </Tooltip>
            )}

        {item?.DATPNPREESTR !== null
          ? null
          : item.PERNEKOMPLEKT && (
              <Tooltip hasArrow label={item.PERNEKOMPLEKT} placement="top">
                <WarningTwoIcon
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    left: "0px",
                    color: "red",
                  }}
                />
              </Tooltip>
            )}
        <Box
          fontSize={["12px", "16px", "16px", "16px"]}
          width={["100%"]}
          display={"flex"}
          gap={"30px"}
          justifyContent={["space-between", "space-between", "start", "start"]}
        >
          <Text>{moment(item.ZAVDAT).format("L")}</Text>
          <Text>№ {item.NUM}</Text>
        </Box>
        <Text fontSize={["12px", "14px", "16px", "16px"]}>
          {item.ZAVPUNKT} - {item.ROZVPUNKT}
        </Text>
      </Button>
      <Collapse
        in={isOpen}
        className={isOpen ? "open" : " close"}
        unmountOnExit
      >
        <Stack
          padding={"1rem"}
          backgroundColor={"blue.900"}
          fontSize={"13px"}
          gap={"10px"}
          justifyContent={"space-between"}
          alignItems={"center"}
          textAlign={"center"}
          height={["auto", "auto", "150px", "150px"]}
          flexDirection={["column", "column", "row", "row"]}
          position={"relative"}
        >
          <Tooltip hasArrow label="Скопіювати дані" placement="top">
            <CopyIcon
              onClick={() => {
                navigator.clipboard.writeText(
                  `---   Заявка № ${
                    item.NUM
                  }   ---\nДата завантаження: ${moment(item.ZAVDAT).format(
                    "LL"
                  )}\nЗавантаження: ${item.ZAVKRAINA} ${item.ZAVOBL} ${
                    item.ZAVPUNKT
                  }\nВивантаження:${item.ROZVKRAINA} ${item.ROZVOBL} ${
                    item.ROZVPUNKT
                  }\nТип транспорту: ${item.TZTYPE}\nВантаж(об'єм / тонаж): ${
                    item.VANTOBJEM
                  } / ${item.VANTTON}\nФрахт: ${item.PERSUMA} ${
                    item.PERVALUTA
                  }\nВодій / ТЗ: ${item.VOD}   ${item.AM} - ${
                    item.PR
                  }\n\n\nВідповідальний менеджер: ${
                    item.PERMENPIPFULL
                  }\nE-mail: ${item.PERMENEMAIL}\nМоб.тел: ${
                    item.PERMENTEL
                  }\n\nhttps://ict.lviv.ua`
                );
                toast({
                  title: "Ви скопіювали інформацію по даному перевезенні.",
                  description: ``,
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
              }}
              fontSize={"2xl"}
              position={"absolute"}
              top={"0"}
              left={"0"}
              cursor={"pointer"}
            />
          </Tooltip>
          <Box height={"100%"}>
            <Tooltip hasArrow label="Дата завантаження" placement="top">
              <CalendarIcon cursor={"pointer"} />
            </Tooltip>

            <Text>{moment(item.ZAVDAT).format("LL")}</Text>
          </Box>

          <Box height={"100%"}>
            <Tooltip hasArrow label="Номер заявки" placement="top">
              <AttachmentIcon cursor={"pointer"} />
            </Tooltip>
            <Text>{item.NUM}</Text>
          </Box>

          <Box height={"100%"}>
            <Tooltip hasArrow label="Пункт завантаження" placement="top">
              <ArrowForwardIcon cursor={"pointer"} />
            </Tooltip>
            <Text>{item.ZAVKRAINA}</Text>
            <Text>{item.ZAVPUNKT}</Text>
            <Text>{item.ZAVOBL}</Text>
          </Box>

          <Box height={"100%"}>
            <Tooltip hasArrow label="Пункт розвантаження" placement="top">
              <ArrowDownIcon cursor={"pointer"} />
            </Tooltip>
            <Text>{item.ROZVKRAINA}</Text>
            <Text>{item.ROZVPUNKT}</Text>
            <Text>{item.ROZVOBL}</Text>
          </Box>

          <Box height={"100%"}>
            <Tooltip hasArrow label="Тип транспорту" placement="top">
              <QuestionOutlineIcon cursor={"pointer"} />
            </Tooltip>
            <Text>{item.TZTYPE}</Text>
          </Box>

          <Box height={"100%"}>
            <Tooltip hasArrow label="Вантаж" placement="top">
              <StarIcon cursor={"pointer"} />
            </Tooltip>
            <Text>{item.VANTAZH}</Text>
            <Text>{item.VANTOBJEM} куб.м.</Text>
            <Text>{item.VANTTON} тон.</Text>
          </Box>

          <Box height={"100%"}>
            <Tooltip hasArrow label="Сума перевезення" placement="top">
              <CheckCircleIcon cursor={"pointer"} />
            </Tooltip>
            <Text>{item.PERSUMA}</Text>
            <Text>{item.PERVALUTA}</Text>
          </Box>

          <Box height={"100%"}>
            <Tooltip hasArrow label="Тягач/Причіп" placement="top">
              <QuestionOutlineIcon cursor={"pointer"} />
            </Tooltip>
            <Text>{item.AM}</Text>
            <Text>{item.PR}</Text>
          </Box>

          <Box height={"100%"}>
            <Tooltip hasArrow label="Водій" placement="top">
              <InfoIcon cursor={"pointer"} />
            </Tooltip>
            <Text>{item.VOD}</Text>
          </Box>
          {item.DATPNPREESTR === null
            ? null
            : item.PERNEKOMPLEKT && (
                <Box style={{ wordWrap: "break-word" }} height={"100%"}>
                  <Tooltip
                    hasArrow
                    label="Некомплект документів"
                    placement="top"
                  >
                    <InfoIcon cursor={"pointer"} />
                  </Tooltip>
                  <Text style={{ color: "red" }}>{item.PERNEKOMPLEKT}</Text>
                </Box>
              )}
          {item?.DATPNPREESTR !== null
            ? null
            : item.PERNEKOMPLEKT && (
                <Box style={{ wordWrap: "break-word" }} height={"100%"}>
                  <Tooltip
                    hasArrow
                    label="Некомплект документів"
                    placement="top"
                  >
                    <InfoIcon cursor={"pointer"} />
                  </Tooltip>
                  <Text style={{ color: "red" }}>{item.PERNEKOMPLEKT}</Text>
                </Box>
              )}
          {/* {item.PERNEKOMPLEKT && (
            <Box height={"100%"}>
              <Tooltip hasArrow label="Податкова накладна" placement="top">
                <InfoIcon cursor={"pointer"} />
              </Tooltip>
              <Text style={{ color: "red" }}>{item.PERNEKOMPLEKT}</Text>
            </Box>
          )} */}

          <Box height={"100%"}>
            <Tooltip hasArrow label="Відповідальний менеджер" placement="top">
              <InfoIcon cursor={"pointer"} />
            </Tooltip>
            <Text>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {item.PERMEN}
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

          <Box height={"100%"}>
            <Tooltip
              hasArrow
              label={
                item.DATPNPREESTR
                  ? "Документи отримано"
                  : "Документи ще не надійшли"
              }
              fontSize={"16px"}
              placement="top"
            >
              <EmailIcon
                color={item.DATDOCP === null ? "red" : ""}
                cursor={"pointer"}
              />
            </Tooltip>
            <Text>
              {item.DATDOCP !== null ? (
                moment(item.DATDOCP).format("ll")
              ) : (
                <span style={{ color: "red" }}>Документи не отримано</span>
              )}
            </Text>
          </Box>
        </Stack>
        {item.DATPNPREESTR && (
          <Text padding={"0.3rem"} backgroundColor={"green"}>
            Рахунок № {item.NUMRAHP} оплачено{" "}
            {moment(item.DATPNPREESTR).format("ll")}
          </Text>
        )}
      </Collapse>
    </>
  );
};

export default TransportationItem;
