import { User } from "../types/User";
import { client } from "./fetchClient";

export const getUser = () => {
  return client.get<User>(`/user`);
};

// export const postUser = (userId: number) => {
//   return client.delete(`/users/${userId}`);
// };

export const patchUser = (userId: number, data: User) => {
  return client.patch(`/users/${userId}`, data);
};

// export const deleteUser = (userId: number) => {
//   return client.delete(`/users/${userId}`);
// };