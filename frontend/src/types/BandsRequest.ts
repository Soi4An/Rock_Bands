import { MainGenres } from "./MainGenres";
import { SortParams } from "./SortParams";

export type BandsRequest = {
  page: number,
  query: string,
  sort: SortParams,
  genre: MainGenres,
};
