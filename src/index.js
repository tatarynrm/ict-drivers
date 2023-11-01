import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import store from "./redux/store";
import { Provider } from "react-redux";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CookiesProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </CookiesProvider>
  </BrowserRouter>
);
