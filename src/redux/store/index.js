import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appReducer from "../reducers/index";

const rootReducers = combineReducers({
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducers,
});