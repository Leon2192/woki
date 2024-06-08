import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TMovie } from '@/types/TMovie';

interface MovieState {
  similarMovies: TMovie[];
  popularMovies: TMovie[];
  searchResults: TMovie[];
  loading: boolean;
  error: string | null;
  movieById: { [key: number]: TMovie }; // Añadimos una nueva propiedad para almacenar películas por ID
}

const initialState: MovieState = {
  similarMovies: [],
  popularMovies: [],
  searchResults: [],
  loading: true,
  error: null,
  movieById: {}, // Inicializamos movieById como un objeto vacío
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setSimilarMovies(state, action: PayloadAction<TMovie[]>) {
      state.similarMovies = action.payload;
      state.loading = false;
      state.error = null;
    },
    setPopularMovies(state, action: PayloadAction<TMovie[]>) {
      state.popularMovies = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSearchResults(state, action: PayloadAction<TMovie[]>) {
      state.searchResults = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    setMovieById(state, action: PayloadAction<{ id: number; movie: TMovie }>) { // Agregamos un nuevo case para actualizar una película por ID
      const { id, movie } = action.payload;
      state.movieById[id] = movie;
    },
  },
});

export const { setSimilarMovies, setPopularMovies, setSearchResults, setLoading, setError, setMovieById } = movieSlice.actions;

export const selectSimilarMovies = (state: RootState) => state.movie.similarMovies;
export const selectPopularMovies = (state: RootState) => state.movie.popularMovies;
export const selectSearchResults = (state: RootState) => state.movie.searchResults;
export const selectLoading = (state: RootState) => state.movie.loading;
export const selectError = (state: RootState) => state.movie.error;
export const selectMovieById = (id: number) => (state: RootState) => state.movie.movieById[id]; // Definimos selectMovieById para seleccionar una película por ID

export default movieSlice.reducer;
