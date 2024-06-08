import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPopularMovies, selectLoading, selectError, setPopularMovies, setLoading, setError } from "@/redux/features/movieSlice";
import { getPopularMovies } from "@/redux/services/movieApi";
import MovieCard from "../ui/MovieCard";
import { TMovie } from "@/types/TMovie";
import Link from 'next/link'; // Importa el componente Link

const AllMovies = () => {
  const popularMovies = useSelector(selectPopularMovies);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(setLoading(true));
      try {
        const popularMoviesResponse = await getPopularMovies();
        dispatch(setPopularMovies(popularMoviesResponse.results));
      } catch (error) {
        dispatch(setError("Error fetching data"));
      }
    };

    fetchMovies();
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-3xl font-bold p-2">MOVIES</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {popularMovies.map((movie: TMovie) => (
          <div key={movie.id} style={{ margin: "10px", flex: "1 1 300px" }}>
            <Link href={`/movie/${movie.id}`} passHref>
              <div style={{ cursor: "pointer" }}>
                <MovieCard
                  movie={movie}
                  button1Text="Share"
                  button1Action={() => {}}
                  button2Text="Learn More"
                  button2Action={() => {}}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
