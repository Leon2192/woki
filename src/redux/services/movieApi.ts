// movieService.ts
import axios from "axios";

const baseURL = "https://api.themoviedb.org/3/";

export const getPopularMovies = async () => {
  try {
    const response = await axios.get("movie/popular", {
      params: {
        api_key: "a4887e558ee094c0d1b4810d5ae13237",
      },
      baseURL,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching popular movies");
  }
};

export const getMovieSearch = async (query: string) => {
  try {
    const response = await axios.get("search/movie", {
      params: {
        api_key: "a4887e558ee094c0d1b4810d5ae13237",
        query,
      },
      baseURL,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error searching movies");
  }
};

export const getMovieById = async (id: number) => {
  try {
    const response = await axios.get(`movie/${id}`, {
      params: {
        api_key: "a4887e558ee094c0d1b4810d5ae13237",
      },
      baseURL,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching movie by ID");
  }
};

export const getSimilarMovies = async (id: number) => {
  try {
    const response = await axios.get(`movie/${id}/similar`, {
      params: {
        api_key: "a4887e558ee094c0d1b4810d5ae13237",
      },
      baseURL,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching similar movies");
  }
};
