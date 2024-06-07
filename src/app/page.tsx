"use client";
import AllMovies from "../../src/components/shared/AllMovies";
import MovieSlider from "@/components/ui/MovieSlider";

export default function Home() {

  return (
    <div>
      <MovieSlider />
      <AllMovies />
    </div>
  );
}
