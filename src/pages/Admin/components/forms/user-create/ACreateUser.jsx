import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Box,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../../../utils/axios";
import useCustomToast from "../../../../../hooks/useCustomToasts";
import { Form, Formik } from "formik";
import {
  soundUserRegisterError,
  soundUserRegisterSuccess,
} from "../../../../../helpers/soundEffects";
import TextField from "../../../../../components/form-items/TextField";
import PhoneNumberField from "../../../../../components/form-items/PhoneNumberField";
import SelectField from "../../../../../components/form-items/SelectField";
import { validatePerUserCreate } from "../../../../../validations/perUserValidation";
import { DeleteIcon } from "@chakra-ui/icons";
const ACreateUser = ({ isOpen, onOpen, onClose }) => {
  const userData = useSelector((state) => state?.auth?.data);
  const [codeUr, setCodeUr] = useState(null);
  const [carriers, setCarriers] = useState([]);
  const [search, setSearch] = useState("");
  const toast = useCustomToast();
  const [perData, setPerData] = useState(null);
  const [per, setPer] = useState(null);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [errorCode, setErrorCode] = useState(null);

  const handleUserCreate = async (values, { resetForm }) => {
    console.log(values);
    const updatedValues = {
      ...values, // Копіюємо всі поля з об'єкта values
      kod_ur: perData?.kod || null, // Додаємо поле kod_ur з перData або пусте значення
    };

    try {
      const { data } = await axios.post("/registration", updatedValues);

      if (data?.errorNum) {
        soundUserRegisterError();
        setErrorCode(
          "Користувач з таким E-mail уже існує або на сервері виникла помилка."
        );
        toast("Виникла якась помилка", "error");
      }
      if (data?.user?.KOD) {
        const user = data.user;
        soundUserRegisterSuccess();
        setErrorCode(
          `Користувача ${user.PRIZV} ${user.NAME} ${user.POBAT} створено.`
        );

        toast("Користувача створено", "success");

        resetForm();
        setTimeout(() => {
          onClose();
          setErrorCode(null);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePerData = (item) => {
    setPerData({
      name: item.NDOV,
      kod: item.KOD,
    });
    setPer((value) => !value);
  };

  const handlePerAdminChange = (event, setFieldValue) => {
    const selectedId = event.target.value;
    setFieldValue("per_admin", selectedId);
  };
  const handleAdminAccountChagne = (event, setFieldValue) => {
    const selectedId = event.target.value;
    setFieldValue("is_admin", selectedId);
  };

  useEffect(() => {}, [userData, perData]);

  useEffect(() => {
    if (search.length > 2) {
      const getContrAgents = async (search) => {
        try {
          const { data } = await axios.post("/ur/search", {
            search: search.toLowerCase(),
          });
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

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"green.300"}>
            Створення нового користувача
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{
                surname: "",
                name: "",
                last_name: "",
                email: "",
                pwd: "",
                phone_number: "",
                per_admin: 0,
                is_admin: 0,
              }}
              validationSchema={validatePerUserCreate}
              onSubmit={handleUserCreate}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <Stack position={"relative"}>
                    {perData === null && (
                      <>
                        <Input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          marginBottom={"20px"}
                          type="text"
                          name="search"
                          placeholder="Пошук перевізника"
                        />
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          gap={"10px"}
                          className="carriers__items"
                        >
                          {carriers.length > 0
                            ? carriers.map((item, idx) => {
                                return (
                                  <Box
                                    justifyContent={"space-between"}
                                    backgroundColor={"blue.700"}
                                    padding={"10px"}
                                    display={"flex"}
                                    gap={"4px"}
                                    alignItems={"center"}
                                    textAlign={"center"}
                                    className="carriers__item"
                                    key={idx}
                                  >
                                    <Text className="">{item.NDOV}</Text>

                                    <Button
                                      onClick={(e) => handlePerData(item)}
                                      className="normal"
                                      style={{
                                        cursor: "context-menu",
                                        padding: "0.4rem",
                                      }}
                                    >
                                      Обрати
                                    </Button>
                                  </Box>
                                );
                              })
                            : "Напишіть назву компанії"}
                        </Box>
                      </>
                    )}
                    {perData && (
                      <Box
                        position={"relative"}
                        alignItems={"center"}
                        display={"flex"}
                        flexDir={"column"}
                        backgroundColor={"green"}
                        padding={"10px"}
                      >
                        <Text>Перевізник:</Text>
                        <Text>{perData?.name}</Text>
                        <DeleteIcon
                          fontSize={24}
                          color={"red"}
                          position={"absolute"}
                          right={4}
                          top={4}
                          onClick={() => setPerData(null)}
                        />
                      </Box>
                    )}
                    <TextField name="surname" type="text" label={`Прізвище`} />
                    <TextField name="name" type="text" label={`Ім'я`} />
                    <TextField
                      name="last_name"
                      type="text"
                      label={`По-батькові`}
                    />
                    <TextField
                      name="email"
                      type="email"
                      label={`Логін(E-mail)`}
                      placeholder={"example@gmail.com"}
                    />
                    <TextField name="pwd" type="text" label={`Пароль`} />

                    <PhoneNumberField
                      name="phone_number"
                      type="text"
                      label={`Номер телефону`}
                      placeholder={"Формат 0987776655"}
                    />

                    <SelectField
                      width={["100%", "100%", "100%", "100%"]}
                      name="per_admin"
                      label={"Тип аккаунту перевізника"}
                      onChange={(event) =>
                        handlePerAdminChange(event, setFieldValue)
                      }
                    >
                      <option value={0}>Звичайний користувач</option>
                      <option value={1}>Адміністратор перевізника</option>
                    </SelectField>

                    <SelectField
                      width={["100%", "100%", "100%", "100%"]}
                      name="is_admin"
                      label={"АДМІН АККАУНТ ?"}
                      onChange={(event) =>
                        handleAdminAccountChagne(event, setFieldValue)
                      }
                    >
                      <option value={0}>Звичайний користувач</option>
                      <option value={1}>АДМІНІСТРАТОР</option>
                    </SelectField>
                    <Button marginTop={"20px"} type="submit">
                      Створити
                    </Button>
                    {errorCode && (
                      <Text
                        color={errorCode.includes("створено") ? "green" : "red"}
                      >
                        {errorCode}
                      </Text>
                    )}
                  </Stack>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ACreateUser;
