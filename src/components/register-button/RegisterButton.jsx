import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { FaUserEdit } from "react-icons/fa";
import PreRegisterAccount from "../forms/PreRegisterAccount";

const RegisterButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        rightIcon={<FaUserEdit />}
        colorScheme="green"
        variant="outline"
        marginTop={10}
        onClick={onOpen}
      >
        Зареєструватись
      </Button>

      <PreRegisterAccount onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default RegisterButton;
