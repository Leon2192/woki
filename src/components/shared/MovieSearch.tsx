import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../ui/MovieCard";
import { TMovie } from "@/types/TMovie";

const SearchMovies = () => {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<{ results: TMovie[] }>( // Utilizamos TMovie como tipo de datos de la respuesta
          `https://api.themoviedb.org/3/search/movie?api_key=a4887e558ee094c0d1b4810d5ae13237&query=${query}`
        );
        setMovies(response.data.results);
        setIsLoading(false);
        setError(null); // Restablecemos el error si la solicitud es exitosa
      } catch (error) {
        console.error(error);
        setError("Error fetching data");
        setIsLoading(false);
      }
    };

    if (query) {
      searchMovies();
    } else {
      setMovies([]);
      setError(null);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(e.currentTarget.search.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              style={{ margin: "10px", flex: "1 1 300px", cursor: "pointer" }}
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
      )}
    </div>
  );
};

export default SearchMovies;
