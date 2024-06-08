import { TMovie } from "@/types/TMovie";

export interface IMediaCard {
    movie: TMovie;
    button1Text: string;
    button1Action: () => void;
    button2Text: string;
    button2Action: () => void;
  }

  export interface IMovieState {
    similarMovies: TMovie[];
    popularMovies: TMovie[];
    searchResults: TMovie[];
    loading: boolean;
    error: string | null;
  }

  export interface IMovieOption {
    title: string;
    posterPath?: string;
    id: number;
  }
  
  export interface IAutocompleteInputProps {
    id: string;
    label: string;
    fetchOptions: () => Promise<IMovieOption[]>;
    disableClearable?: boolean;
    type?: string;
    onChange: (value: string) => void;
  }