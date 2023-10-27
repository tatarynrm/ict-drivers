import {
  VStack,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  ButtonGroup,
  Input,
  Heading,
  InputGroup,
  InputRightElement,
  Tooltip,
  Box,
  Stack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AccoutContext } from "../../components/AccountContext";
import ToggleColorButton from "../../components/toggle/ToggleColorButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../../redux/slices/auth";
import axios from "../../utils/axios";
import { InfoIcon, PhoneIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const token = window.localStorage.getItem("token");
  const location = useLocation();
  const [showPass, setShowPass] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("Логін обов'язкове поле")
          .min(4, "Занадто короткий логін")
          .max(20, "Занадто довгий логін"),
        password: Yup.string()
          .required("Пароль обов'язкове поле")
          .min(4, "Занадто короткий логін")
          .max(20, "Занадто довгий логін"),
      })}
      onSubmit={async (values, actions) => {
        const vals = { ...values };
        // actions.resetForm();
        const data = await dispatch(fetchAuth(vals));
        if (data?.payload?.accessToken) {
          window.localStorage.setItem("token", data.payload.accessToken);
          navigate("/");
        }
      }}
    >
      {(formik) => (
        <VStack
          as="form"
          w={{ base: "90%", md: "500px" }}
          m="auto"
          justify={"center"}
          h={"90vh"}
          spacing={"1rem"}
          onSubmit={formik.handleSubmit}
        >
          <Heading>Авторизація</Heading>
          <FormControl isInvalid={formik.errors.email && formik.touched.email}>
            <FormLabel>Логін</FormLabel>
            <Input
              type="text"
              name="email"
              placeholder="Введіть ваш логін"
              autoComplete="off"
              size={"lg"}
              {...formik.getFieldProps("email")}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={formik.errors.password && formik.touched.password}
            position={"relative"}
          >
            <FormLabel>Паролль</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Введіть ваш пароль"
                autoComplete="off"
                size={"lg"}
                {...formik.getFieldProps("password")}
              />
              <InputRightElement cursor={"pointer"} width="4.5rem">
                {show ? (
                  <ViewOffIcon onClick={handleClick} />
                ) : (
                  <ViewIcon onClick={handleClick} />
                )}
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>

          <ButtonGroup pt={"1rem"}>
            <Button colorScheme="teal" type="submit">
              Увійти
            </Button>

            {/* <ToggleColorButton /> */}
          </ButtonGroup>
          <Stack
            marginTop={"40px"}
            display={"flex"}
            flexDirection={"column"}
            textAlign={"center"}
            alignItems={"center"}
          >
            <Button
              rightIcon={<PhoneIcon />}
              colorScheme="blue"
              variant="outline"
            >
              <a
                href="https://t.me/I_Dont_Have_A_Phone_Number"
                target="__blank"
              >
                Технічна підтримка
              </a>
            </Button>
            <Tooltip
              hasArrow
              label={`Якщо ви співпрацюєте з компанією ICT-Захід,- натисніть на 'Технічна підтримка' для реєстрації на даному сайті.`}
              placement="bottom"
            >
              <InfoIcon cursor={"pointer"} />
            </Tooltip>
          </Stack>
        </VStack>
      )}
    </Formik>
  );
};
