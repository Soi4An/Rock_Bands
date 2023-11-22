import { Tokens } from "../types/Tokens";

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://rock_bands/api';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {        // adding Authorization header
    options.headers = {
      'Authorization': accessToken,
    };
  }

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(500)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => response.json())  // return desired answer
    .catch(err => {                     // checking status 401
      if (err.status === 401) {
        client.get<Tokens>('/refresh')  // invoking to get new tokens
          .then(tokens => {
            localStorage.setItem("accessToken", tokens.access);
            localStorage.setItem("refreshToken", tokens.refresh);
          })
          .catch(err => {throw new Error(err)});
      }

      return new Error(err);
    })
    .then(() => fetch(BASE_URL + url, options))     // second requst
    .then(response => response.json())
    .catch(err => {throw new Error(err)});
}

export const client = {
  get: <T>(url: string, data?: any) => request<T>(url, 'GET', data),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
