import { GenreShort } from "./GenreShort";

export interface User {
  id: number;
  name: string;
  email: string;
  is_stuff: boolean,
  password: string,

  genres: string[], // genreId
  bands: string[];
  tickets: string[];
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
