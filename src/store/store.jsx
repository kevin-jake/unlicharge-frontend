import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authReducer from "./slices/auth/authSlice";
import productReducer from "./slices/products/productSlice";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const authPersistConfig = { key: "auth", storage, version: 1 };
const productPersistConfig = {
  key: "product",
  storage: storageSession,
  version: 1,
};
const auth = persistReducer(authPersistConfig, authReducer);
const product = persistReducer(productPersistConfig, productReducer);
const store = configureStore({
  reducer: { auth, product, [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
