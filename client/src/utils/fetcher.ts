import { axiosInstance } from "./axiosInstance";

export const fetcher = <T>(url: string): Promise<T> =>
  axiosInstance.get(url).then((res) => res.data);
