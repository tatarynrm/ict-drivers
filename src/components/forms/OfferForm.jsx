import { Box, Button, IconButton, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import TextField from "../form-items/TextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { soundUserRegisterSuccess } from "../../helpers/soundEffects";
import api from "../../utils/axios";
import useCustomToast from "../../hooks/useCustomToasts";
import { VscSend } from "react-icons/vsc";

const OfferForm = ({ onClose }) => {
  const { user } = useSelector((state) => state.auth.data);
  const toast = useCustomToast();
  const [errorCode, setErrorCode] = useState(null);

  // Схема валідації за допомогою Yup
  const validationSchema = Yup.object().shape({
    text: Yup.string().required("Необхідно заповнити текстове поле"),
  });
  const handleOfferCreate = async (values, { resetForm }) => {
    const updatedValues = {
      ...values, // Копіюємо всі поля з об'єкта values
      // Додаємо поле kod_ur з перData або пусте значення
      email: user?.EMAIL,
    };
    console.log(updatedValues);
    try {
      const { data } = await api.post("/offers/new", updatedValues);

      if (data.length > 0) {
        const user = data.user;
        soundUserRegisterSuccess();
        toast(`Ми отримали вашу пропозицію.Дякуємо`, "success");
        resetForm();
        setTimeout(() => {
          onClose();
          setErrorCode(null);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={{
        text: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleOfferCreate}
    >
      {({ errors, touched }) => (
        <Form>
          <TextField
            name="text"
            type="textarea"
            // label="Ваші пропозиції"
            isTextArea={true}
            error={errors.text && touched.text ? errors.text : undefined}
          />
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button
              variant={"outline"}
              colorScheme="green"
              rightIcon={<VscSend />}
              marginTop="20px"
              type="submit"
            
            >Надіслати</Button>
          </Box>

          {errorCode && (
            <Text color={errorCode.includes("створено") ? "green" : "red"}>
              {errorCode}
            </Text>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default OfferForm;
