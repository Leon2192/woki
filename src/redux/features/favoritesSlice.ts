import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TMovie } from '@/types/TMovie';
import { enqueueSnackbar } from 'notistack';

interface FavoritesState {
  favorites: TMovie[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<TMovie>) => {
      const movie = action.payload;
      const isFavorite = state.favorites.some(fav => fav.id === movie.id);
      if (!isFavorite) {
        state.favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
        enqueueSnackbar('Agregada correctamente a favoritos', { variant: 'success' });
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      const updatedFavorites = state.favorites.filter(fav => fav.id !== movieId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      enqueueSnackbar('Quitada correctamente de favoritos', { variant: 'success' });
      return { favorites: updatedFavorites };
    },
    loadFavorites: (state) => {
      const favorites = localStorage.getItem('favorites');
      return { favorites: favorites ? JSON.parse(favorites) : [] };
    },
  },
});

export const { addFavorite, removeFavorite, loadFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
