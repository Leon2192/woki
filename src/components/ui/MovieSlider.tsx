"use client";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextSlide, prevSlide } from "@/redux/features/sliderSlice";
import { getPopularMovies, getMovieVideos } from "@/redux/services/movieApi";
import { RootState } from "@/redux/store";
import Link from "next/link";
import IconButton from "./IconButton";
import {
  selectPopularMovies,
  setPopularMovies,
  setTrailers,
  selectTrailers,
} from "@/redux/features/movieSlice";
import Image from "next/image";

const MovieSlider = () => {
  const movies = useSelector(selectPopularMovies);
  const trailers = useSelector(selectTrailers);
  const slideIndex = useSelector((state: RootState) => state.slider.value);
  const dispatch = useDispatch();
  const iframesRef = useRef<(HTMLIFrameElement | null)[]>([]);

  useEffect(() => {
    const fetchMoviesAndTrailers = async () => {
      try {
        const response = await getPopularMovies();
        dispatch(setPopularMovies(response.results));

        const trailersData = await Promise.all(
          response.results.map(async (movie: any) => {
            const videoResponse = await getMovieVideos(movie.id);
            const trailer = videoResponse.results.find(
              (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
            );
            return { [movie.id]: trailer ? trailer.key : null };
          })
        );

        const trailersObject = trailersData.reduce(
          (acc, curr) => ({ ...acc, ...curr }),
          {}
        );
        dispatch(setTrailers(trailersObject));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMoviesAndTrailers();
  }, [dispatch]);

  useEffect(() => {
    iframesRef.current.forEach((iframe, index) => {
      if (iframe && iframe.contentWindow) {
        if (index === slideIndex) {
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            "*"
          );
        } else {
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
        }
      }
    });
  }, [slideIndex]);

  return (
    <>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {movies.slice(0, 5).map((movie, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-center"
              style={{ flex: "0 0 100%", height: "80vh" }}
            >
              <div className="relative w-full h-full">
                {trailers[movie.id] ? (
                  <iframe
                    ref={(el) => {
                      iframesRef.current[index] = el;
                    }}
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${
                      trailers[movie.id]
                    }?autoplay=1&mute=0&controls=0&modestbranding=1&loop=1&playlist=${
                      trailers[movie.id]
                    }&enablejsapi=1`}
                    title={movie.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="relative w-full h-full bg-gray-900 text-white">
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <p>Trailer not available</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-50 p-4">
                  <h2 className="text-white text-3xl sm:text-4xl font-bold mb-2">
                    {movie.title}
                  </h2>
                  <h2 className="text-white text-base sm:text-xl font-bold mb-2 w-full">
                    {movie.overview}
                  </h2>
                  <div className="flex justify-around">
                    <Link href={`/movie/${movie.id}`} passHref>
                      <IconButton
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                            />
                          </svg>
                        }
                        text="More info"
                      />
                    </Link>
                    <IconButton
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                          />
                        </svg>
                      }
                      text="View trailer"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-orange-500 rounded-full p-2 hover:bg-rose-600"
          onClick={() => dispatch(prevSlide())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-orange-500 rounded-full p-2 hover:bg-rose-600"
          onClick={() => dispatch(nextSlide())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default MovieSlider;
