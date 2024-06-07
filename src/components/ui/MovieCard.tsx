import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TMovie } from '@/types/TMovie';
import { IMediaCard } from '@/interfaces/IMediaCard';

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
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        sx={{ flex: '1 1 auto', objectFit: 'cover', height: 400 }} 
        image={posterPath} 
        title={movie.title}
      />
      <CardContent sx={{ flex: '1 1 auto', maxHeight: '120px', overflow: 'hidden' }}>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Release Date: {movie.release_date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {movie.vote_average}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Genres: {movie.genres ? movie.genres.map((genre) => genre.name).join(", ") : "No genres available"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={button1Action}>{button1Text}</Button>
        <Button size="small" onClick={button2Action}>{button2Text}</Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
