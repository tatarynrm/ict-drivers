import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { transportationReducer } from "./slices/transportations";
import { zapReducer } from "./slices/zap";
import { userReducer } from "./slices/user";
import { offersApi } from "./apiSlices/apiOffers";

const store = configureStore({
  reducer: {
    auth: authReducer,
    transportation: transportationReducer,
    zap: zapReducer,
    user: userReducer,
    [offersApi.reducerPath]: offersApi.reducer,
  },
   // Додаємо middleware offersApi
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(offersApi.middleware),
});

export default store;
