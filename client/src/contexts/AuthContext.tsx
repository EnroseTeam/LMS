import { IUser } from "@/interfaces/user";
import { fetcher } from "@/utils/fetcher";
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import useSwr, { KeyedMutator } from "swr";

interface AuthProviderProps {
  children: ReactNode;
}

interface AUthContextType {
  user: IUser | undefined;
  userLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userError: any;
  userMutate: KeyedMutator<IUser>;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AUthContextType>({} as AUthContextType);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const localValue = localStorage.getItem("loggedIn");

    if (localValue) {
      setLoggedIn(JSON.parse(localValue));
    }
  }, [loggedIn]);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSwr(loggedIn && "/api/auth/current", fetcher<IUser>);

  const value = { user, userLoading, userError, userMutate, loggedIn, setLoggedIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
