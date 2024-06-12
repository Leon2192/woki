import { TMovie } from "@/types";

export interface IMediaCard {
  movie: TMovie;
  button1Text: string;
  button1Action: () => void;
  button2Text: string;
  button2Action: (id: number) => void;
  addToFavorites?: (movie: TMovie) => void;
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


export interface IUser {
  uid: string;
  displayName: string | null;
  email: string | null;
}

export interface IButton {
  icon: React.ReactNode;
  className?: string;
  color?:string;
  onClick?: () => void; 
}


export interface ITrailer {
  [key: number]: string | null;
}