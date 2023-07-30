import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice.js";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { appReducer } from "./rootReducer.js";
// import authReducer from "./auth/authSlice.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    reducer: appReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // devTools: false,
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
