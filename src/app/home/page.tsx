'use client'
import AllMovies from "@/components/shared/AllMovies";
import MovieSlider from "@/components/ui/MovieSlider";

const HomePage = () => {
  return (
    <div>
      <MovieSlider />
      <AllMovies />
    </div>
  );
};

export default HomePage;
