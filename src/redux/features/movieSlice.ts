import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TMovie } from '@/types/TMovie';
import { ITrailer } from '@/interfaces';

interface MovieState {
  similarMovies: TMovie[];
  popularMovies: TMovie[];
  searchResults: TMovie[];
  genreResults: TMovie[];
  loading: boolean;
  error: string | null;
  movieById: { [key: number]: TMovie };
  trailers?: { [key: number]: string | null }; 
}

const initialState: MovieState = {
  similarMovies: [],
  popularMovies: [],
  searchResults: [],
  genreResults: [],
  loading: true,
  error: null,
  movieById: {},
  trailers: {}, 
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
    setGenreResults(state, action: PayloadAction<TMovie[]>) {
      state.genreResults = action.payload;
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
    setMovieById(state, action: PayloadAction<{ id: number; movie: TMovie }>) {
      const { id, movie } = action.payload;
      state.movieById[id] = movie;
    },
    setTrailers(state, action: PayloadAction<{ [key: number]: string | null }>) {
      state.trailers = action.payload;
    },
  },
});

export const {
  setSimilarMovies,
  setPopularMovies,
  setSearchResults,
  setGenreResults,
  setLoading,
  setError,
  setMovieById,
  setTrailers,
} = movieSlice.actions;

export const selectSimilarMovies = (state: RootState) => state.movie.similarMovies;
export const selectPopularMovies = (state: RootState) => state.movie.popularMovies;
export const selectSearchResults = (state: RootState) => state.movie.searchResults;
export const selectGenreResults = (state: RootState) => state.movie.genreResults;
export const selectLoading = (state: RootState) => state.movie.loading;
export const selectError = (state: RootState) => state.movie.error;
export const selectMovieById = (state: RootState, movieId: number) => state.movie.movieById[movieId];
export const selectTrailers = (state: RootState) => state.movie.trailers || {};

export default movieSlice.reducer;
