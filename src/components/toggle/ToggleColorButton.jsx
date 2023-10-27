import { Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ToggleColorButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      // pos={"absolute"}
      // top={0}
      // right={0}
      // m='1rem'
      onClick={() => toggleColorMode()}
    >
      {colorMode === "dark" ? <SunIcon color="yellow.400" /> : <MoonIcon color="blue.700" />}
    </Button>
  );
};

export default ToggleColorButton;
