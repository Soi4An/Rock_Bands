import { BandFull } from "../types/BandFull";
import { BandShort } from "../types/BandShort";
import { BandsRequest } from "../types/BandsRequest";
import { client } from "./fetchClient";

export const getBands = ({ page, sort, query, genre }: BandsRequest) => {
  return client
    .get<BandShort[]>(`/genres?page=${page}&sort=${sort}&query=${query}&genre=${genre}`);
};

export const getFullBand = (bandId: string) => {
  return client.get<BandFull>(`/bands/${bandId}`);
};
