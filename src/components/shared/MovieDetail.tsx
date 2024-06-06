import React from "react";

const MovieDetail = ({ movie }) => {
  if (!movie) return null; // Manejar el caso en que no hay detalles de la película

  return (
    <div>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      <p>Overview: {movie.overview}</p>
      <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
    </div>
  );
};

export default MovieDetail;
