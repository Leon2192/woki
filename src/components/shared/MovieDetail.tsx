import React from "react";
import Image from "next/image";
import { TMovie } from "@/types/TMovie"; 

interface Props {
  movie: TMovie | null;
}

const MovieDetail: React.FC<Props> = ({ movie }) => {
  if (!movie) return null;

  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "/images/sin-imagen.jpg";

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
      <Image
        src={posterPath}
        alt={movie.title}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', background: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '10px' }}>
        <h1>{movie.title}</h1>
        <p>Release Date: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
        <p>Overview: {movie.overview}</p>
        <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
