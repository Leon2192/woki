import React, { useState } from "react";
import { useSearchMoviesQuery } from "../../redux/services/movieApi";
import MovieCard from "../ui/MovieCard";

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchMoviesQuery(query, {
    skip: !query, 
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data.results.map((movie) => (
          <div
            key={movie.id}
            style={{ margin: '10px', flex: '1 1 300px', cursor: 'pointer' }}
            onClick={() => { window.location.href = `/movie/${movie.id}`; }} // Navegación a la ruta dinámica
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
