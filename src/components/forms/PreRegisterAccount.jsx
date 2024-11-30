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
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useCustomToast from "../../hooks/useCustomToasts";
import api from "../../utils/axios";
import { Form, Formik } from "formik";
import { validatePerUserCreate } from "../../validations/perUserValidation";
import {
  soundUserRegisterError,
  soundUserRegisterSuccess,
} from "../../helpers/soundEffects";
import { DeleteIcon } from "@chakra-ui/icons";
import TextField from "../form-items/TextField";
import SelectField from "../form-items/SelectField";
import PhoneNumberField from "../form-items/PhoneNumberField";
import { validatePreUserCreate } from "../../validations/preUserValidation";
import { saveAs } from "file-saver";

const PreRegisterAccount = ({ isOpen, onOpen, onClose }) => {
  const userData = useSelector((state) => state?.auth?.data);
  const [codeUr, setCodeUr] = useState(null);
  const [carriers, setCarriers] = useState([]);
  const [search, setSearch] = useState("");
  const toast = useCustomToast();
  const [perData, setPerData] = useState(null);
  const [per, setPer] = useState(null);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [saveRegisterCheckbox, setSaveRegisterCheckbox] = useState(false);

  const [errorCode, setErrorCode] = useState(null);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    // Update localStorage on each field change
    localStorage.setItem(name, value);
  };

  const handleUserCreate = async (values, { resetForm }) => {
    const updatedValues = {
      ...values, // Копіюємо всі поля з об'єкта values
    };

    try {
      const data = await api.post("/offers/account-register", updatedValues);

      if (data.status === 200) {
        soundUserRegisterSuccess();
        toast(
          `Заявку на реєстрацію прийнято.\nОчікуйте email з підтерддженням`,
          "success"
        );

        // Створення текстового файлу
        const blob = new Blob(
          [
            `https://carriers.ict.lviv.ua/login\nПісля перевірки вашого аккаунту модератором,-ви зможете увійти в аккаунт.\nEmail: ${data?.data[0]?.email}\nPassword: ${data?.data[0]?.pwd}`,
          ],
          { type: "text/plain;charset=utf-8" }
        );

        resetForm();
        localStorage.clear();
        setTimeout(() => {
          onClose();
          if (saveRegisterCheckbox) {
            saveAs(blob, "registration_info.txt");
          }
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
          <ModalHeader color={"green.300"}>Створити аккаунт</ModalHeader>
          <Text fontSize={'12px'} color={'red.200'} padding={'0 20px'}>Після реєстрації перевірте вхідну папку СПАМ на своєму поштовому клієнті.</Text>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{
                surname: localStorage.getItem("surname") || "",
                company: localStorage.getItem("company") || "",
                name: localStorage.getItem("name") || "",
                last_name: localStorage.getItem("last_name") || "",
                email: localStorage.getItem("email") || "",
                pwd: localStorage.getItem("pwd") || "",
                phone_number: localStorage.getItem("phone_number") || "",
                per_admin: 0,
                is_admin: 0,
              }}
              validationSchema={validatePreUserCreate}
              onSubmit={handleUserCreate}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <Stack position={"relative"}>
                    <TextField
                      name="company"
                      type="text"
                      label={`Назва компанії / код ЄДРПОУ`}
                    />
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
                    <Checkbox
                      colorScheme="green"
                      onChange={(e) =>
                        setSaveRegisterCheckbox(e.target.checked)
                      }
                      defaultChecked={saveRegisterCheckbox}
                    >
                      Зберегти реєстраційні дані?
                    </Checkbox>
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

export default PreRegisterAccount;
