import { SortParams  } from "./SortParams";

export type GenreRequest = {
  page: number;
  sort: SortParams ;
  query: string;
};
