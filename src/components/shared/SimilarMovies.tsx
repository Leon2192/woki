import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSimilarMovies,
  selectLoading,
  selectError,
  setSimilarMovies,
  setLoading,
  setError,
} from "@/redux/features/movieSlice";
import { TMovie } from "@/types";
import { getSimilarMovies } from "@/redux/services/movieApi";
import MovieCard from "@/components/ui/MovieCard";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { loadFavorites } from "@/redux/features/favoritesSlice";
import Loader from "../ui/Loader/Loader";
import { toggleFavorite } from "@/utilities/favoritesUtil";

const SimilarMovies = ({ movieId }: { movieId: number }) => {
  const similarMovies = useSelector(selectSimilarMovies);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const router = useRouter();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getSimilarMovies(movieId);
        const limitedMovies = response.results.slice(0, 4);
        dispatch(setSimilarMovies(limitedMovies));
      } catch (error) {
        dispatch(setError("Error fetching similar movies"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchSimilarMovies();
  }, [dispatch, movieId]);

  const handleToggleFavorite = (movie: TMovie) => {
    toggleFavorite(movie, favorites, dispatch);
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="font-bold text-3xl p-2">SIMILAR MOVIES</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap">
          {similarMovies.map((movie: TMovie) => (
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
                button1Text="Button 1 Text"
                button1Action={() => router.push(`/movie/${movie.id}`)}
                button2Text="Button 2 Text"
                button2Action={() => {}}
                addToFavorites={() => handleToggleFavorite(movie)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimilarMovies;
