// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice"; 
import { userApi } from "./services/userApi"; 
import { movieApi } from "./services/movieApi"; 
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    counterReducer,
    [userApi.reducerPath]: userApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, movieApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
