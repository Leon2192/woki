import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSearchResults,
  selectLoading,
  selectError,
  setSearchResults,
  setLoading,
  setError,
} from "@/redux/features/movieSlice";
import { getMovieSearch } from "@/redux/services/movieApi";
import { TMovie } from "@/types/TMovie";
import Input from "../ui/Input";

const SearchMovies = () => {
  const [query, setQuery] = useState<string>("");
  const searchResults = useSelector(selectSearchResults);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const handleSearch = async (query: string) => {
    if (query.trim() === "") {
      return;
    }
    try {
      dispatch(setLoading(true));
      const response = await getMovieSearch(query);
      console.log("Search response:", response); 
      dispatch(setSearchResults(response.results));
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error searching movies:", error);
      dispatch(setError("Error fetching data"));
      dispatch(setLoading(false));
    }
  };
  

  const fetchOptions = async () => {
    if (query.trim() === "") {
      return [];
    }
    try {
      const response = await getMovieSearch(query);
      const options = response.results.map((movie: TMovie) => ({
        title: movie.title,
        posterPath: movie.poster_path, 
        id: movie.id,
      }));
      console.log(options);
      return options;
    } catch (error) {
      console.error("Error fetching data", error);
      return [];
    }
  };
  
  

  return (
    <div onClick={(e) => e.stopPropagation()}> 
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
      >
        <Input
          id="search-movies-autocomplete"
          label="Let's find your movie!"
          fetchOptions={fetchOptions}
          disableClearable
          type="search"
          onChange={(value) => setQuery(value)}
        />
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
    </div>
  );
};

export default SearchMovies;
