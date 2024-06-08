import { configureStore } from "@reduxjs/toolkit";
import slideReducer from "./features/sliderSlice"; 
import movieReducer from "./features/movieSlice"; 

export const store = configureStore({
  reducer: { 
    slider: slideReducer,
    movie: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
