import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "./features/sliderSlice"; 
import movieReducer from "./features/movieSlice"; 
import authReducer from "./features/authSlice"; 
import themeReducer from './features/themeSlice'

export const store = configureStore({
  reducer: { 
    slider: sliderReducer,
    movie: movieReducer,
    auth: authReducer,
    theme: themeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
