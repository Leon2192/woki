import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { TMovie } from '@/types';
import { IMediaCard } from '@/interfaces';
import Button from '../Buttons/Button';

const MovieCard: React.FC<IMediaCard> = ({
  movie,
  button1Text,
  button1Action,
  button2Text,
  button2Action,
  addToFavorites, 
}) => {
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/images/sin-imagen.jpg"; 

  const favorites = localStorage.getItem('favorites');
  const favoritesArray: TMovie[] = favorites ? JSON.parse(favorites) : [];
  const isFavorite = favoritesArray.some(fav => fav.id === movie.id);

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
          Release Date: {movie.release_date}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ color: 'white', textAlign: 'left', width: '100%' }}>
          Rating: {movie.vote_average}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ color: 'white', textAlign: 'left', width: '100%' }}>
          Genres: {movie.genres ? movie.genres.map((genre: { name: any; }) => genre.name).join(", ") : "No genres available"}
        </Typography>
        <div className='flex justify-around w-full mt-3'>
          <Button color='bg-gray-500' onClick={button1Action} icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>          
          }  />
          <Button onClick={() => button2Action(movie.id)}  color='bg-orange-600' icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          }  />
          
          <Button
           onClick={() => addToFavorites && addToFavorites(movie)}
           color='bg-yellow-500'
           icon={
            isFavorite ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
              </svg>

            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
              </svg>
            )
          }
        />
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
