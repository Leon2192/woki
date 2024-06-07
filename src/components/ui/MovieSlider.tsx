import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextSlide, prevSlide } from "@/redux/features/sliderSlice";
import Image from "next/image";
import { getPopularMovies } from "@/redux/services/movieApi";

const MovieSlider = () => {
  const [movies, setMovies] = useState([]);
  const slideIndex = useSelector((state: RootState) => state.slider.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getPopularMovies();
        setMovies(response.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
        {movies.slice(0, 3).map((movie: any, index: number) => (
          <div
            key={index}
            className="w-full flex items-center justify-center"
            style={{ flex: '0 0 100%', height: '60vh' }} 
          >
            <div className="relative w-full">
              <Image
                width={500} 
                height={800} 
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                alt={movie.title}
                layout="responsive" 
              />
              <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-50 p-4">
                <h2 className="text-white text-4xl font-bold mb-2">{movie.title}</h2>
                <h2 className="text-white text-xl font-bold mb-2 w-3/4">{movie.overview}</h2>
                <button
                  onClick={() => {
                    window.location.href = `/movie/${movie.id}`;
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">More details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-green-300"
        onClick={() => dispatch(prevSlide())} 
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-green-300"
        onClick={() => dispatch(nextSlide())} 
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default MovieSlider;
