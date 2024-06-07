import { TMovie } from "@/types/TMovie";

export interface IMediaCard {
    movie: TMovie;
    button1Text: string;
    button1Action: () => void;
    button2Text: string;
    button2Action: () => void;
  }