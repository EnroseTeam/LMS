import { IUser } from "@/interfaces/user";
import axios from "axios";
import useSwr from "swr";
import { useState } from "react";

interface useAuthenticateTypes {
  user: IUser | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  loggedIn: boolean;
  setLoggedIn: (state: boolean) => void;
  isLoading: boolean;
}

export const useAuthenticate = (): useAuthenticateTypes => {
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
  } = useSwr(loggedIn && "http://localhost:5000/api/users/current", fetcher, {
    errorRetryCount: 0,
    revalidateOnFocus: true,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
  });

  return { user, error, loggedIn, setLoggedIn, isLoading };
};
