// src/services/movieApi.ts
'use client'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Movie = {
  id: number;
  title: string;
  release_date: string;
  genres: { id: number; name: string }[];
  overview: string;
  vote_average: number;
  poster_path: string; 
};

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    getMovies: builder.query<{ results: Movie[] }, void>({
      query: () => `movie/popular?api_key=a4887e558ee094c0d1b4810d5ae13237`,
    }),
    searchMovies: builder.query<{ results: Movie[] }, string>({
      query: (query) =>
        `search/movie?api_key=a4887e558ee094c0d1b4810d5ae13237&query=${query}`,
    }),
    getMovieById: builder.query<Movie, { id: number }>({
      query: ({ id }) => `movie/${id}?api_key=a4887e558ee094c0d1b4810d5ae13237`,
    }),
  }),
});

export const { useGetMoviesQuery, useSearchMoviesQuery, useGetMovieByIdQuery } =
  movieApi;
