import axios, { AxiosRequestHeaders } from 'axios'

type MethodType = 'GET' | 'POST' | 'PUT' | 'path' | 'DELETE'

interface RequestConfig {
  url?: string;
  baseURL?: string;
  initialIsLoading?: boolean;
  withCredentials?: boolean;
  method?: MethodType;
  data?: { [key: string]: any };
  headers?: { [key: string]: string; };
  signal?: AbortSignal,
  token?: string,
}

interface AxiosResponseType<T> {
  data: T
  status: number
  headers: AxiosRequestHeaders
}

export const axiosInstance = axios.create({
  baseURL: process.env.ISSUER_BASE_URL
});


export interface ErrorType {
  code: string
  localized_message?: {
    text: string,
    key: string,
    args: string[]
  },
  message: string,
}

const request = async <T>(c: RequestConfig) => {
  const headers = {
    ...(c.token && { Authorization: `Bearer ${c.token}` }),
    'Content-Type': 'application/json',
    ...c.headers,
  };
  const config = {...c}
  delete config.token
  return await axiosInstance({
    ...config,
    headers,
  })
    .then((res) => ([
      res.data,
      null,
    ]))
    .catch((err) => {
      return ([
        null,
        err?.response?.data
      ])
    }) as [T, any];
};

export default request;