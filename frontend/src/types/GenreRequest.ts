import { SortParaps } from "./SortParams";

export type GenreRequest = {
  page: number;
  sort: SortParaps;
  query: string;
};
