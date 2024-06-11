import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPopularMovies,
  selectLoading,
  selectError,
  setPopularMovies,
  setLoading,
  setError,
} from "@/redux/features/movieSlice";
import { getPopularMovies } from "@/redux/services/movieApi";
import MovieCard from "../ui/MovieCard";
import { TMovie } from "@/types/TMovie";
import { useRouter } from "next/navigation";
import {
  addFavorite,
  removeFavorite,
  loadFavorites,
} from "@/redux/features/favoritesSlice";
import { RootState } from "@/redux/store";
import Loader from "../ui/Loader/Loader";

const AllMovies: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(4);

  const popularMovies = useSelector((state: RootState) =>
    selectPopularMovies(state)
  );
  const loading = useSelector((state: RootState) => selectLoading(state));
  const error = useSelector((state: RootState) => selectError(state));
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(setLoading(true));
      try {
        const popularMoviesResponse = await getPopularMovies();
        dispatch(setPopularMovies(popularMoviesResponse.results));
      } catch (error) {
        dispatch(setError("Error fetching data"));
      }
    };

    fetchMovies();
    dispatch(loadFavorites());
  }, [dispatch]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = popularMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleFavorite = (movie: TMovie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-3xl font-bold p-2">POPULAR MOVIES</h2>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {loading && <Loader />}
        {error && <p>{error}</p>}
        {currentMovies.map((movie: TMovie) => (
          <div
            key={movie.id}
            style={{
              margin: "10px",
              flex: "1 1 300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <MovieCard
              movie={movie}
              button1Text="Share"
              button1Action={() => router.push(`/movie/${movie.id}`)}
              button2Text="Learn More"
              button2Action={() => {}}
              addToFavorites={() => toggleFavorite(movie)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-around">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="rounded-full px-2 py-2 bg-rose-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        )}
        {currentPage < Math.ceil(popularMovies.length / moviesPerPage) && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="rounded-full px-2 py-2 bg-rose-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AllMovies;
