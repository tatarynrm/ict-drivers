import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { transportationReducer } from "./slices/transportations";
import { zapReducer } from "./slices/zap";
import { userReducer } from "./slices/user";
const store = configureStore({
  reducer: {
    auth: authReducer,
    transportation: transportationReducer,
    zap:zapReducer,
    user:userReducer
  },
});

export default store;
