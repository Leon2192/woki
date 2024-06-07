import React from "react";
import { useGetMoviesQuery } from "@/redux/services/movieApi";
import Link from "next/link";
import MovieCard from "../ui/MovieCard";

const AllMovies = () => {
  const { data, error, isLoading } = useGetMoviesQuery();

  return (
    <div>
      <h2 className="text-3xl font-bold p-2">MOVIES</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}> 
        {isLoading && <p>Loading...</p>}
        {error && <p>Error fetching data</p>}
        {data && data.results.map((movie) => ( 
          <div key={movie.id} style={{ margin: "10px", flex: "1 1 300px" }}> 
            <div
              onClick={() => {
                window.location.href = `/movie/${movie.id}`;
              }}
              style={{ cursor: "pointer" }}
            >
              <MovieCard 
                movie={movie}
                button1Text="Share"
                button1Action={() => {}}
                button2Text="Learn More"
                button2Action={() => {}}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
