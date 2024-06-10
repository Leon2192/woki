import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "./features/sliderSlice"; 
import movieReducer from "./features/movieSlice"; 
import authReducer from "./features/authSlice"; 
import themeReducer from './features/themeSlice'
import favoritesReducer from './features/favoritesSlice'

export const store = configureStore({
  reducer: { 
    slider: sliderReducer,
    movie: movieReducer,
    auth: authReducer,
    theme: themeReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
