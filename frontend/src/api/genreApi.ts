import { GenersRequest } from "../types/GenersRequest";
import { GenreFull } from "../types/GenreFull";
import { GenreShort } from "../types/GenreShort";
import { SortParams } from "../types/SortParams";
import { client } from "./fetchClient";



export const getGenres = ({ page, sort, query }: GenersRequest) => {
  return client
    .get<GenreShort[]>(`/genres?page=${page}&sort=${sort}&query=${query}`);
};

export const getFullGenre = (genreId: string) => {
  return client.get<GenreFull>(`/genres/${genreId}`);
};

// export const postGenre = (data: Omit<GenreFull, 'id'>) => {
//   return client.post<GenreFull>('/genres', data);
// };
