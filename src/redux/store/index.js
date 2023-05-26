import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appReducer from "../reducers/index";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import showReducer from "../reducers/show";

const persistConfig = {
  key: "root",
  storage: storage,
  transforms: [encryptTransform({ secretKey: process.env.REACT_APP_TOKEN })],
};

const rootReducers = combineReducers({
  app: appReducer,
  show: showReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
