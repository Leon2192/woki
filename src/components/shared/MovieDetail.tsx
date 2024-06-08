import React from "react";
import Image from "next/image";
import { TMovie } from "@/types/TMovie"; 
import Link from 'next/link';

interface Props {
  movie: TMovie | null;
}

const MovieDetail: React.FC<Props> = ({ movie }) => {
  if (!movie) return null;

  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "/images/sin-imagen.jpg";

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}>
      <Link href="/">
        <div style={{ position: 'absolute', top: '30px', left: '10px', zIndex: 999, borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '5px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </div>
      </Link>
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
