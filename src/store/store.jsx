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
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const persistConfig = { key: "root", storage, version: 1 };
const auth = persistReducer(persistConfig, authReducer);
const product = persistReducer(persistConfig, productReducer);
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
