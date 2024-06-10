"use client";
import React, { useEffect, useState } from "react";
import { getMovieById } from "@/redux/services/movieApi";
import MovieDetail from "../../../components/shared/MovieDetail";
import { useParams } from "next/navigation";
import SimilarMovies from "@/components/shared/SimilarMovies";
import { TMovie } from "@/types/TMovie";

export default function ProductPage() {
  const [movie, setMovie] = useState<TMovie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { id } = useParams();
  const movieId = Array.isArray(id)
    ? parseInt(id[0], 10)
    : typeof id === "string"
    ? parseInt(id, 10)
    : id;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieById(movieId);
        setMovie(movieData);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return <p>Error al obtener el detalle de la película: {error.message}</p>;

  return (
    <div>
      <MovieDetail movie={movie} />
      <SimilarMovies movieId={movieId} />
    </div>
  );
}
