import { ICurrentUser } from "@/interfaces/user";
import axios from "axios";
import useSwr, { KeyedMutator } from "swr";
import { useState } from "react";

interface useAuthenticateTypes {
  user: ICurrentUser | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  loggedIn: boolean;
  setLoggedIn: (state: boolean) => void;
  isLoading: boolean;
  mutate: KeyedMutator<ICurrentUser>;
}

export const useAuthenticate = (): useAuthenticateTypes => {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("loggedIn") as string)
      : false
  );

  const fetcher = (url: string): Promise<ICurrentUser> =>
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

  return { user, error, loggedIn, setLoggedIn, isLoading, mutate };
};
