import { IUser } from "@/interfaces/user";
import { axiosInstance } from "@/utils/axiosInstance";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: IUser | undefined;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  isUserLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("isAdminLoggedIn") as string)
      : false
  );
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem("isAdminLoggedIn", "" + isLoggedIn);

    const fetchCurrent = async (): Promise<void> => {
      try {
        setIsUserLoading(true);
        const res = await axiosInstance.get<IUser>("/api/auth/current");

        setUser(res.data);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          setIsLoggedIn(false);
          setUser(undefined);
          router.push("/auth/login");
        }
      } finally {
        setIsUserLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchCurrent();
    } else {
      setIsUserLoading(false);
    }
  }, [isLoggedIn]);

  const value = { user, setUser, isLoggedIn, setIsLoggedIn, isUserLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
