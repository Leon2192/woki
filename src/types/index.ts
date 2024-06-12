export type TMovie = {
  id: number;
  title: string;
  release_date: string;
  genres: { id: number; name: string }[];
  overview: string;
  vote_average: number;
  poster_path: string; 
};