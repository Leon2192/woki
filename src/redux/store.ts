import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import { movieApi } from "./services/movieApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import counterReducer from "./features/counterSlice"; 
import slideReducer from "./features/sliderSlice"; 

export const store = configureStore({
  reducer: {
    counter: counterReducer, 
    slider: slideReducer, 
    [userApi.reducerPath]: userApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, movieApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
