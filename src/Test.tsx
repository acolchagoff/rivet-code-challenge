import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./store";

const Test = ({state = {}, children}: {state?: {}, children: React.ReactNode}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: state
  })
  return (
    <React.StrictMode>
      <Provider store={store}>
          {children}
      </Provider>
    </React.StrictMode>
  )
}

export default Test;