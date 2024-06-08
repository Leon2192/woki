import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSimilarMovies, selectLoading, selectError, setSimilarMovies, setLoading, setError } from "@/redux/features/movieSlice";
import { TMovie } from "@/types/TMovie";
import { getSimilarMovies } from "@/redux/services/movieApi";
import MovieCard from "@/components/ui/MovieCard";
import Link from "next/link"; 

const SimilarMovies = ({ movieId }: { movieId: number }) => {
  const similarMovies = useSelector(selectSimilarMovies);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getSimilarMovies(movieId);
        const limitedMovies = response.results.slice(0, 5);
        dispatch(setSimilarMovies(limitedMovies));
      } catch (error) {
        dispatch(setError("Error fetching similar movies"));
      }
    };

    fetchSimilarMovies();
  }, [dispatch, movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="font-bold text-3xl p-2">SIMILAR MOVIES</h2>
      <div className="flex flex-wrap">
        {similarMovies.map((movie: TMovie) => (
          <div
            key={movie.id}
            className="w-full sm:w-1/2 md:w-1/5 lg:w-1/5 xl:w-1/6"
            style={{ margin: "10px", cursor: "pointer" }}
          >
            <Link href={`/movie/${movie.id}`} passHref> {/* Utiliza el componente Link para el enrutamiento */}
              <div>
                <MovieCard
                  movie={movie}
                  button1Text="Button 1 Text"
                  button1Action={() => {}}
                  button2Text="Button 2 Text"
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

export default SimilarMovies;
