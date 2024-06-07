// src/redux/services/movieApi.ts

import { TMovie } from "@/types/TMovie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    getMovies: builder.query<{ results: TMovie[] }, void>({
      query: () => `movie/popular?api_key=a4887e558ee094c0d1b4810d5ae13237`,
    }),
    searchMovies: builder.query<{ results: TMovie[] }, string>({
      query: (query) =>
        `search/movie?api_key=a4887e558ee094c0d1b4810d5ae13237&query=${query}`,
    }),
    getMovieById: builder.query<TMovie, { id: number  }>({
      query: ({ id }) => `movie/${id}?api_key=a4887e558ee094c0d1b4810d5ae13237`,
    }),
    getSimilarMovies: builder.query<{ results: TMovie[] }, { id: number }>({
      query: ({ id }) => `movie/${id}/similar?api_key=a4887e558ee094c0d1b4810d5ae13237`,
    }),
  }),
});

export const { useGetMoviesQuery, useSearchMoviesQuery, useGetMovieByIdQuery, useGetSimilarMoviesQuery } =
  movieApi;
