import { IUser } from "@/interfaces/user";
import { FC, useState, createContext } from "react";

interface UserContextProps {
  user: IUser | null;
  setUser: (state: IUser | null) => void;
}

interface UserProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
