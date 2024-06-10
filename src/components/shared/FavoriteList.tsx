import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TMovie } from "@/types/TMovie";
import MovieCard from "../ui/MovieCard";
import { RootState } from "@/redux/store";
import { addFavorite, removeFavorite } from "@/redux/features/favoritesSlice";

const FavoritesList = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<TMovie[]>([]);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const parsedFavorites: TMovie[] = JSON.parse(favorites);
      setFavoriteMovies(parsedFavorites);
    }
  }, []);

  const toggleFavorite = (movie: TMovie) => {
    const isFavorite = favorites.some((fav: TMovie) => fav.id === movie.id);
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
      // Actualizar favoriteMovies después de eliminar un favorito
      setFavoriteMovies(favoriteMovies.filter((fav) => fav.id !== movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-5xl font-bold mb-4 p-4">Your Favorite Movies</h2>
      {favoriteMovies.length === 0 ? (
        <h1 className="text-center text-4xl">No tienes favoritos agregados aún.</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteMovies.map((movie: TMovie) => (
            <div key={movie.id}>
              <MovieCard
                movie={movie}
                button1Text="Share"
                button1Action={() => {}}
                button2Text="Learn More"
                button2Action={() => {}}
                addToFavorites={() => toggleFavorite(movie)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
