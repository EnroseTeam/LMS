import { IUser } from "@/interfaces/user";
import { useRouter } from "next/router";
import { FC, useState, createContext, useEffect } from "react";
import axios from "axios";

interface UserContextProps {
  user: IUser | null;
  setUser: (state: IUser | null) => void;
  setLoggedIn: (state: boolean) => void;
}

interface UserProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== null) {
      setLoggedIn(JSON.parse(localStorage.getItem("loggedIn") as string));
    } else setLoggedIn(false);
  }, [loggedIn]);

  useEffect(() => {
    const getCurrentUser = async (): Promise<void> => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/current", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        setUser(null);
      }
    };

    if (loggedIn) getCurrentUser();
    else setUser(null);
  }, [router.pathname, loggedIn]);

  const value = { user, setUser, setLoggedIn };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
