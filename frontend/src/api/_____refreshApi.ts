import { Tokens } from "../types/Tokens";
import { client } from "./fetchClient";

export const refresh = () => {
  return client.get<Tokens>('/refresh');
};
