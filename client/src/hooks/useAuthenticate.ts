import { IUser } from "@/interfaces/user";
import axios, { isAxiosError } from "axios";
import useSwr, { KeyedMutator } from "swr";
import { useState } from "react";
import { useRouter } from "next/router";

interface useAuthenticateTypes {
  user: IUser | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  loggedIn: boolean;
  setLoggedIn: (state: boolean) => void;
  isLoading: boolean;
  mutate: KeyedMutator<IUser>;
}

export const useAuthenticate = (): useAuthenticateTypes => {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState<boolean>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("loggedIn") as string)
      : false
  );

  const fetcher = (url: string): Promise<IUser> =>
    axios.get(url, { withCredentials: true }).then((res) => res.data);

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSwr(loggedIn && "http://localhost:5000/api/users/current", fetcher, {
    errorRetryCount: 0,
    revalidateOnFocus: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
  });

  if (
    error &&
    isAxiosError(error) &&
    !isLoading &&
    error.response?.status === 401
  ) {
    localStorage.setItem("loggedIn", JSON.stringify(false));
    router.reload();
  }

  return { user, error, loggedIn, setLoggedIn, isLoading, mutate };
};
