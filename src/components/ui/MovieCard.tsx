import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { TMovie } from '@/types/TMovie';
import { IMediaCard } from '@/interfaces';
import Button from './Button';

const MovieCard: React.FC<IMediaCard> = ({
  movie,
  button1Text,
  button1Action,
  button2Text,
  button2Action,
}) => {
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/images/sin-imagen.jpg"; 

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&:hover .overlay': {
          opacity: 1,
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{ flex: '1 1 auto', objectFit: 'cover', height: 'auto' }} 
        image={posterPath} 
        title={movie.title}
      />
      <CardContent
        className="overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          opacity: 0,
          transition: 'opacity 0.3s',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 2,
        }}
      >
        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'left', width: '100%' }}>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ color: 'white', textAlign: 'left', width: '100%' }}>
          {movie.overview}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ color: 'white', textAlign: 'left', width: '100%' }}>
          Release Date: {movie.release_date}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ color: 'white', textAlign: 'left', width: '100%' }}>
          Rating: {movie.vote_average}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ color: 'white', textAlign: 'left', width: '100%' }}>
          Genres: {movie.genres ? movie.genres.map((genre: { name: any; }) => genre.name).join(", ") : "No genres available"}
        </Typography>
        <div className='flex justify-between w-1/2 mt-3'>
          <Button icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>          
          }  />
          <Button icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          }  />
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
