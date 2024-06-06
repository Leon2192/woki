"use client";
import React, { useEffect, useState } from "react";
import { useGetMovieByIdQuery } from "../../../redux/services/movieApi";
import MovieDetail from "../../../components/shared/MovieDetail";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const {
    data,
    error: movieError,
    isLoading: movieLoading,
  } = useGetMovieByIdQuery({ id });

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
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <MovieDetail movie={movie} />
    </div>
  );
}
