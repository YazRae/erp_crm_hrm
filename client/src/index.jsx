import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { App } from "./components/app";
import "./style/index.less";

import store from "./redux/store.js";
import { Provider } from "react-redux";
import { AppContextProvider } from "./context/app/index.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppContextProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AppContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
