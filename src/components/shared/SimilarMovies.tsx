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
import { TMovie } from "@/types/TMovie";
import { getSimilarMovies } from "@/redux/services/movieApi";
import MovieCard from "@/components/ui/MovieCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import {
  addFavorite,
  removeFavorite,
  loadFavorites,
} from "@/redux/features/favoritesSlice";
import Loader from "../ui/Loader/Loader";

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
      }
    };

    fetchSimilarMovies();
  }, [dispatch, movieId]);

  const toggleFavorite = (movie: TMovie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="font-bold text-3xl p-2">SIMILAR MOVIES</h2>
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
              <div>
                <MovieCard
                  movie={movie}
                  button1Text="Button 1 Text"
                  button1Action={() => router.push(`/movie/${movie.id}`)}
                  button2Text="Button 2 Text"
                  button2Action={() => {}}
                  addToFavorites={() => toggleFavorite(movie)}
                />
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
