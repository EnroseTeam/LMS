import LoadingAltScreen from "@/utils/LoadingAltScreen";
import LoadingScreen from "@/utils/LoadingScreen";
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from "react";

interface LoadingProviderProps {
  children: ReactNode;
}

interface LoadingContextTypes {
  showLoading: boolean;
  setShowLoading: Dispatch<SetStateAction<boolean>>;
  showLoadingAlt: boolean;
  setShowLoadingAlt: Dispatch<SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingContextTypes>({} as LoadingContextTypes);

export const LoadingProvider: FC<LoadingProviderProps> = ({ children }) => {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [showLoadingAlt, setShowLoadingAlt] = useState<boolean>(false);

  const value = { showLoading, setShowLoading, showLoadingAlt, setShowLoadingAlt };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <LoadingScreen state={showLoading} />
      <LoadingAltScreen state={showLoadingAlt} />
    </LoadingContext.Provider>
  );
};
