import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "@/components/ui/MovieCard";
import { TMovie } from "@/types/TMovie";

const SimilarMovies = ({ movieId }: { movieId: number }) => {
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<{ results: TMovie[] }>(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=a4887e558ee094c0d1b4810d5ae13237`
        );
        setMovies(response.data.results);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Error fetching similar movies");
        setIsLoading(false);
      }
    };

    fetchSimilarMovies();

    return () => {
     
    };
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="font-bold text-3xl p-2">SIMILAR MOVIES</h2>
      <div className="flex flex-wrap">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" // Establecer el ancho de las tarjetas para que haya 5 por fila
            style={{ margin: "10px", cursor: "pointer" }}
            onClick={() => {
              window.location.href = `/movie/${movie.id}`;
            }}
          >
            <MovieCard
              movie={movie}
              button1Text="Button 1 Text"
              button1Action={() => {}}
              button2Text="Button 2 Text"
              button2Action={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
