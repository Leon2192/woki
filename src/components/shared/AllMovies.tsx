import React from "react";
import { useGetMoviesQuery } from "@/redux/services/movieApi";
import Link from "next/link";

const AllMovies = () => {
  const { data, error, isLoading } = useGetMoviesQuery();

  return (
    <div>
      <h2>All Movies</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching data</p>}
      {data && (
        <ul>
          {data.results.map((movie) => (
            <li key={movie.id}>
              <Link href={`/movie/${movie.id}`}>
                <h3 className="text-red-800">{movie.title}</h3>
              </Link>
              <p>Release Date: {movie.release_date}</p>
              <p>Rating: {movie.vote_average}</p>
              <p>Overview: {movie.overview}</p>
              <p>
                Genres:{" "}
                {movie.genres ? (
                  movie.genres.map((genre) => (
                    <span key={genre.id}>{genre.name}, </span>
                  ))
                ) : (
                  <span>No genres available</span>
                )}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllMovies;
