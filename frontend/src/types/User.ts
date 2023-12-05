import { BandShort } from "./BandShort";
import { GenreShort } from "./GenreShort";

export interface User {
  id: number,
  name: string,
  email: string,
  is_stuff: boolean,
  password: string,

  genres: GenreShort[], // genreId string GenreShort
  bands: BandShort[], // BandShort
  tickets: string[],
}

export type registerUser = {
  name: string,
  email: string,
  password: string,
};

export type loginUser = {
  email: string,
  password: string
};
