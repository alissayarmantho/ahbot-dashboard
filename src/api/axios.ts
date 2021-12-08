import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { getToken } from "../utils/common";

export const BASE_API_URL = "https://ahbot-server.herokuapp.com/api";
export type RequestMethod = "get" | "put" | "post" | "delete";

export interface CallAPIOptionsParams extends Record<string, unknown> {
  include?: string;
  limit?: number;
  offset?: number;
  order?: string;
  where?: {
    [key: string]: unknown;
  };
}

export type CallAPIOptions = AxiosRequestConfig & {
  params?: CallAPIOptionsParams;
  data?: unknown;
};

interface APIResponse {
  data: unknown;
  status: string;
  msg: string;
}

export const makeUnauthenticatedApiCall = (
  fullUrl: string,
  options: CallAPIOptions = {},
  method: RequestMethod = "get"
): AxiosPromise<APIResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { headers: rawHeaders, ...redactedOptions } = options;
  const headers = rawHeaders as Record<string, string>;
  const headerOptions = { headers };

  const methodHandlers = {
    get: () => axios.get(fullUrl, options),
    put: () => axios.put(fullUrl, redactedOptions.data, headerOptions),
    post: () => axios.post(fullUrl, redactedOptions.data, headerOptions),
    delete: () => axios.delete(fullUrl, options),
  };

  return methodHandlers[method]() as AxiosPromise<APIResponse>;
};

export const makeAuthenticatedApiCall = (
  fullUrl: string,
  options: CallAPIOptions = {},
  method: RequestMethod = "get"
): AxiosPromise<APIResponse> => {
  const token = getToken() ?? "";
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { headers: rawHeaders, ...redactedOptions } = options;
  const headers = {
    ...rawHeaders,
    Authorization: `Bearer ${token}`,
  } as Record<string, string>;
  const headerOptions = { headers };

  const methodHandlers = {
    get: () => axios.get(fullUrl, headerOptions),
    put: () => axios.put(fullUrl, redactedOptions.data, headerOptions),
    post: () => axios.post(fullUrl, redactedOptions.data, headerOptions),
    delete: () => axios.delete(fullUrl, headerOptions),
  };

  return methodHandlers[method]() as AxiosPromise<APIResponse>;
};

export function unauthenticatedApiHandler(
  endpoint: string,
  options?: CallAPIOptions,
  method: RequestMethod = "get"
): AxiosPromise<APIResponse> {
  const baseURL = BASE_API_URL ?? "http://localhost:8080/api";
  return makeUnauthenticatedApiCall(`${baseURL}${endpoint}`, options, method);
}

// Require Authorization token
export function apiHandler(
  endpoint: string,
  options?: CallAPIOptions,
  method: RequestMethod = "get"
): AxiosPromise<APIResponse> {
  const baseURL = BASE_API_URL ?? "http://localhost:8080/api";
  return makeAuthenticatedApiCall(`${baseURL}${endpoint}`, options, method);
}
