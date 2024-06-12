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
import { getPopularMovies, getMovieVideos } from "@/redux/services/movieApi";
import MovieCard from "../ui/MovieCard";
import { TMovie } from "@/types";
import { useRouter } from "next/navigation";
import { loadFavorites } from "@/redux/features/favoritesSlice";
import { RootState } from "@/redux/store";
import Loader from "../ui/Loader/Loader";
import { toggleFavorite } from "../../utilities/favoritesUtil";
import ModalTrailer from "../ui/ModalTrailer/ModalTrailer";
import { enqueueSnackbar } from "notistack";

const AllMovies: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerId, setTrailerId] = useState(""); // Cambiar a trailerId

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
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMovies();
    dispatch(loadFavorites());
  }, [dispatch]);

  const handleOpenModal = async (movieId: number) => {
    try {
      const videoResponse = await getMovieVideos(movieId);
      const trailer = videoResponse.results.find(
        (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setTrailerId(trailer.key); 
        setIsModalOpen(true);
      } else {
        enqueueSnackbar("Trailer not available", { variant: "error" });
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      enqueueSnackbar("Error fetching trailer", { variant: "error" });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTrailerId(""); 
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = popularMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-2">
      <h2 className="text-3xl font-bold p-2">POPULAR MOVIES</h2>
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
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
                button2Action={() => handleOpenModal(movie.id)}
                addToFavorites={() =>
                  toggleFavorite(movie, favorites, dispatch)
                }
              />
            </div>
          ))}
        </div>
      )}
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
      <ModalTrailer
        videoId={trailerId} 
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default AllMovies;
