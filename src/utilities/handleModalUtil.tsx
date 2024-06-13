// movieUtils.ts
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getMovieVideos } from "@/redux/services/movieApi";
import { enqueueSnackbar } from "notistack";
import { RootState } from "@/redux/store";
import { toggleFavorite } from "@/utilities/favoritesUtil";
import { TMovie } from "@/types";

const useMovieUtils = () => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOpenModal = async (movieId: number) => {
    try {
      const videoResponse = await getMovieVideos(movieId);
      const trailer = videoResponse.results.find(
        (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
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
    setTrailerUrl("");
  };

  const handleToggleFavorite = (movie: TMovie) => {
    toggleFavorite(movie, favorites, dispatch);
  };

  const handleGoToMovieDetail = (movieId: number) => {
    router.push(`/movie/${movieId}`);
  };

  return {
    isModalOpen,
    trailerUrl,
    handleOpenModal,
    handleCloseModal,
    handleToggleFavorite,
    handleGoToMovieDetail,
  };
};

export default useMovieUtils;
