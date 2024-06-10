import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_DOMAIN;

const fetchDataWithCache = async (url: string, cacheKey: string) => {
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  } else {
    try {
      const response = await axios.get(url, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_TOKEN,
        },
        baseURL,
      });
      localStorage.setItem(cacheKey, JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
    }
  }
};

export const getPopularMovies = async () => {
  const cacheKey = "popularMovies";
  return await fetchDataWithCache("movie/popular", cacheKey);
};

export const getMovieSearch = async (query: string) => {
  const cacheKey = `searchMovies_${query}`;
  return await fetchDataWithCache(`search/movie?query=${encodeURIComponent(query)}`, cacheKey);
};

export const getMovieById = async (id: number) => {
  const cacheKey = `movieById_${id}`;
  return await fetchDataWithCache(`movie/${id}`, cacheKey);
};

export const getSimilarMovies = async (id: number) => {
  const cacheKey = `similarMovies_${id}`;
  return await fetchDataWithCache(`movie/${id}/similar`, cacheKey);
};

export const getMoviesByGenre = async (genreId: number) => {
  const cacheKey = `moviesByGenre_${genreId}`;
  return await fetchDataWithCache("discover/movie", cacheKey);
};

export const getMovieGenres = async () => {
  const cacheKey = "movieGenres";
  return await fetchDataWithCache("genre/movie/list", cacheKey);
};

export const getMovieVideos = async (id: number) => {
  const cacheKey = `movieVideos_${id}`;
  return await fetchDataWithCache(`movie/${id}/videos`, cacheKey);
};
