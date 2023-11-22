import { GenreFull } from "../types/GenreFull";
import { GenreShort } from "../types/GenreShort";
import { SortParaps } from "../types/SortParams";
import { client } from "./fetchClient";

// type GenersResponse = {
//   geners: GenreShort[],
//   sum: number,
// };

export const getGenres = (
  page: number, sort: SortParaps, query: string,
) => {
  return client
    .get<GenreShort[]>(`/genres?page=${page}&sort=${sort}&query=${query}`);
};

export const getFullGenre = (genreId: string) => {
  return client.get<GenreFull>(`/genres/${genreId}`);
};

// export const postGenre = (data: Omit<GenreFull, 'id'>) => {
//   return client.post<GenreFull>('/genres', data);
// };
