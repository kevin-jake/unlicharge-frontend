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
import buildReducer from "./slices/buildpage/buildpageSlice";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const authPersistConfig = { key: "auth", storage, version: 1 };
const buildPersistConfig = {
  key: "build",
  storage: storageSession,
  version: 1,
};
const auth = persistReducer(authPersistConfig, authReducer);
const build = persistReducer(buildPersistConfig, buildReducer);
const store = configureStore({
  reducer: { auth, build, [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
