"use client";
import React, { useEffect, useState } from "react";
import { useGetMovieByIdQuery } from "../../../redux/services/movieApi";
import MovieDetail from "../../../components/shared/MovieDetail";
import { useParams } from "next/navigation";
import SimilarMovies from "@/components/shared/SimilarMovies";
import { TMovie } from "@/types/TMovie";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export default function ProductPage() {
  const [movie, setMovie] = useState<TMovie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<
    FetchBaseQueryError | SerializedError | null
  >(null);

  const { id } = useParams();
  const movieId = Array.isArray(id)
    ? parseInt(id[0], 10)
    : typeof id === "string"
    ? parseInt(id, 10)
    : id;

  const {
    data,
    error: movieError,
    isLoading: movieLoading,
  } = useGetMovieByIdQuery({ id: movieId });

  useEffect(() => {
    if (data) {
      setMovie(data);
      setIsLoading(false);
    }
    if (movieError) {
      setError(movieError);
      setIsLoading(false);
    }
  }, [data, movieError]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error al obtener el detalle de pelicula</p>;

  return (
    <div>
      <MovieDetail movie={movie} />
      <SimilarMovies movieId={movieId} />
    </div>
  );
}
