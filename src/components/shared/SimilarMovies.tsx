import React from "react";
import { useGetSimilarMoviesQuery } from "@/redux/services/movieApi";
import Link from "next/link";
import MovieCard from "@/components/ui/MovieCard"; 

const SimilarMovies = ({ movieId }: { movieId: number }) => {
  const { data, error, isLoading } = useGetSimilarMoviesQuery({ id: movieId });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching similar movies</p>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      <h2 className="font-bold text-3xl p-2 ">SIMILAR MOVIES</h2>
      {data && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {data.results.map((movie) => (
            <div
              key={movie.id}
              style={{ margin: '10px', flex: '1 1 300px', cursor: 'pointer' }}
              onClick={() => { window.location.href = `/movie/${movie.id}`; }} 
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

export default SimilarMovies;
