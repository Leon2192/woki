import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TMovie } from "@/types/TMovie";
import MovieCard from "../ui/MovieCard";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { toggleFavorite } from "@/utilities/favoritesUtil";

const FavoritesList = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<TMovie[]>([]);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const parsedFavorites: TMovie[] = JSON.parse(storedFavorites);
      setFavoriteMovies(parsedFavorites);
    }
  }, []);

  const handleToggleFavorite = (movie: TMovie) => {
    const isFavorite = toggleFavorite(movie, favorites, dispatch);
    if (!isFavorite) {
      setFavoriteMovies(favoriteMovies.filter((fav) => fav.id !== movie.id));
    } else {
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-5xl font-bold mb-4 p-4">Your Favorite Movies</h2>
      {favoriteMovies.length === 0 ? (
        <h1 className="text-center text-4xl">
          No tienes favoritos agregados aún.
        </h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteMovies.map((movie: TMovie) => (
            <div key={movie.id}>
              <MovieCard
                movie={movie}
                button1Text="Share"
                button1Action={() => router.push(`/movie/${movie.id}`)}
                button2Text="Learn More"
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

export default FavoritesList;
