import { Dispatch } from "redux";
import { TMovie } from "@/types";
import { addFavorite, removeFavorite } from "@/redux/features/favoritesSlice";

export const toggleFavorite = (
  movie: TMovie,
  favorites: TMovie[],
  dispatch: Dispatch
) => {
  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  if (isFavorite) {
    dispatch(removeFavorite(movie.id));
    return false;
  } else {
    dispatch(addFavorite(movie));
    return true;
  }
};
