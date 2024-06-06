// src/components/SearchMovies.tsx
import React, { useState } from "react";
import { useSearchMoviesQuery } from "../../redux/services/movieApi";

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchMoviesQuery(query, {
    skip: !query, // Evita la llamada si no hay consulta
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.search.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching data</p>}
      {data && (
        <ul>
          {data.results.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date}</p>
              <p>Rating: {movie.vote_average}</p>
              <p>Overview: {movie.overview}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchMovies;
