import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/redux/services/movieApi";
import MovieCard from "../ui/MovieCard";
import { TMovie } from "@/types/TMovie";

const AllMovies = () => {
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies.results);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Error fetching data");
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold p-2">MOVIES</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {movies.map((movie) => (
          <div key={movie.id} style={{ margin: "10px", flex: "1 1 300px" }}>
            <div
              onClick={() => {
                window.location.href = `/movie/${movie.id}`;
              }}
              style={{ cursor: "pointer" }}
            >
              <MovieCard
                movie={movie}
                button1Text="Share"
                button1Action={() => {}}
                button2Text="Learn More"
                button2Action={() => {}}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
