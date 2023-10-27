import { extendTheme } from "@chakra-ui/react";

const breakpoints = {

    sm: "30em", // ~480px. em is a relative unit and is dependant on the font size.
    md: "48em", // ~768px
    lg: "62em", // ~992px
    xl: "80em", // ~1280px
  };
const theme = {
    config:{
        initialColorMode:"dark",
        useSystemColorMode:true,
    },
    breakpoints,
    styles:{
        
    },
    colors: {
      transparent: "transparent",
      black: "blue",
      white: "blue",
      gray: {
        50: "#f7fafc",
        // ...
        900: "#171923",
      },
      // ...
    },
    fonts: {
        heading: `'Open Sans', sans-serif`,
        body: `'Noto Sans', sans-serif`,
      },
};

export default extendTheme(theme)