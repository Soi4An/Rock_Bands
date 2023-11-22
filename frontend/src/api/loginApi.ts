import { Tokens } from "../types/Tokens";
import { User, loginUser, registerUser } from "../types/User";
import { client } from "./fetchClient";

export enum SignUrls {
  Login = '/login',
  Regist = '/register',
};

export const signBy = (url: SignUrls, data: loginUser | registerUser) => {
  return client.get<Tokens>(url, data)   //firstly getting tokens
    .then(tokens => {
      if (!tokens.access) {
        console.log('Error with getting tokens in sign...');
      }

      localStorage.setItem("accessToken", tokens.access);
      localStorage.setItem("refreshToken", tokens.refresh);

      return client.get<User>('/user');  //secondly gettins Usesr = { id: ...}
    })
};
